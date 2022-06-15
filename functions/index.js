"use strict";

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const express = require("express");
const app = express();
const line = require("@line/bot-sdk");
require("dotenv").config();

const {
  replyCaseYes,
  replyCaseYesStamp,
  replyCaseNoStamp,
  replyCaseNoSelectbox,
  replyCaseSomehow,
  replyCaseSomohowSelectbox,
  replyCaseBusy,
  replyCaseBusyStamp,
  replyCaseSkip,
  replyCaseSkipStamp,
  replyAdviceHealth,
  replyAdviceMeal,
  replyAdviceExercise,
  replyAdviceProblems,
  replyAdviceWorry,
  replyUnexpected
} = require("./variables")

const config = {
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
};

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.post("/webhook", line.middleware(config), (req, res) => {
  console.log(req.body.events);
  Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result));
});

const client = new line.Client(config);

/**
 * @param {*} event
 * @return {*}
 */
async function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }
  const documentArray = [];
  const getRandomElement = (array) => {
    const min = 0;
    const max = array.length-1;
    const randomIndex = Math.floor(Math.random() * (max - min + 1) + min);
    return array[randomIndex];
  };

  const textMessage = [];

  const replyMessage = (messageFromUser) => {
    const filteredArray = (arr, query) => {
      return arr.filter(function (news) {
              return news.category === query
            })
     }
    switch (messageFromUser) {
      case "はい":
            return textMessage.push(replyCaseYesStamp, replyCaseYes);
          case "いいえ":
            return textMessage.push(replyCaseNoStamp, replyCaseNoSelectbox);
          case "なんとなく・・・":
            return textMessage.push(
                replyCaseSomehow,
                replyCaseSomohowSelectbox);
          case "時間がなかった・・・":
            return textMessage.push(
                replyCaseBusyStamp,
                replyCaseBusy);
          case "今回は大丈夫！":
            return textMessage.push(replyCaseSkipStamp, replyCaseSkip);
          case "体調のこと":
            const helthNewsUrl = getRandomElement(filteredArray(documentArray,"health")).sourceUrl;
            const textMessageHealthUrl = {
              type: "text",
              text: helthNewsUrl
            }
            return textMessage.push(replyAdviceHealth, textMessageHealthUrl);
          case "食事のこと":
            const mealNewsUrl = getRandomElement(filteredArray(documentArray,"meal")).sourceUrl;
            const textMessageMealUrl = {
              type: "text",
              text: mealNewsUrl
            }
            return textMessage.push(replyAdviceMeal, textMessageMealUrl );
          case "運動のこと":
            const exerciseNewsUrl = getRandomElement(filteredArray(documentArray,"exercise")).sourceUrl;
            const textMessageExerciseUrl = {
              type: "text",
              text: exerciseNewsUrl
            }
            return textMessage.push(
                replyAdviceExercise,
                textMessageExerciseUrl);
          case "困りごと":
            const problemNewsUrl = getRandomElement(filteredArray(documentArray,"problem")).sourceUrl;
            const textMessageProblemsUrl = {
              type: "text",
              text: problemNewsUrl
            }
            return textMessage.push(
                replyAdviceProblems,
                textMessageProblemsUrl);
          case "心配事":
            const worryNewsUrl = getRandomElement(filteredArray(documentArray,"worry")).sourceUrl;
            const textMessageWorryUrl = {
              type: "text",
              text: worryNewsUrl
            }
            return textMessage.push(
                replyAdviceWorry,
                textMessageWorryUrl);
          default:
            return textMessage.push(replyUnexpected);
    }
  };

  try {
    const db = admin.firestore();
    await db.collection("news")
            .get().then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                documentArray.push({
                  category: doc.data().category,
                  sourceUrl: doc.data().sourceUrl,
                  createdAt: doc.data().createdAt,
                });
              });
            })

    replyMessage(event.message.text)
    return client.replyMessage(event.replyToken,textMessage)

  } catch (e) {
    console.error(e);
  }
}


exports.app = functions.https.onRequest(app);

// タイマーで実行されるプッシュメッセージの送信のfunction
// scheduleの()内にcronコマンドで書いて、日時指定する。例 "30 11 * * 3"毎週水曜11:30
// テスト 毎分 "* * * * *"
/* exports.scheduledFunc = functions
    .region("asia-northeast1")
    .pubsub.schedule("30 11 * * 3")
    .onRun(async () => {
      const client = new line.Client({
        channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
        channelSecret: process.env.CHANNEL_SECRET,
      });

      // 「はい」か「いいえ」を選択するflex message
      const textMessage = {
        "type": "flex",
        "altText": "this is a flex message",
        "contents": {
          "type": "bubble",
          "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "今週はご家族と連絡とった？",
                "weight": "bold",
                "size": "md",
              },
            ],
          },
          "footer": {
            "type": "box",
            "layout": "vertical",
            "spacing": "sm",
            "contents": [
              {
                "type": "button",
                "style": "link",
                "height": "sm",
                "action": {
                  "type": "message",
                  "label": "はい",
                  "text": "はい",
                },
              },
              {
                "type": "button",
                "style": "link",
                "height": "sm",
                "action": {
                  "type": "message",
                  "label": "いいえ",
                  "text": "いいえ",
                },
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [],
                "margin": "sm",
              },
            ],
            "flex": 0,
            "borderWidth": "medium",
          },
          "styles": {
            "body": {
              "backgroundColor": "#FDDDDE",
            },
          },
        },
      };

      client.broadcast(textMessage)
          .then(() => {
            functions.logger.log("sent the message!");
          })
          .catch((err) => {
            functions.logger.error(err);
          });
    });
*/
