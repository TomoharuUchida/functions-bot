
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
/*
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
*/
"use strict";

const functions = require("firebase-functions");
const express = require("express");
const app = express();
const line = require("@line/bot-sdk");
require("dotenv").config();

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

  return client.replyMessage(event.replyToken, {
    type: "text",
    text: event.message.text, // 実際に返信の言葉を入れる箇所
  });
}

exports.app = functions.https.onRequest(app);

// タイマーで実行されるプッシュメッセージの送信のfunction
// scheduleの()内にcronコマンドで書いて、日時指定する。例 "30 11 * * 3"毎週水曜11:30
// テスト 毎分 "* * * * *"
exports.scheduledFunc = functions
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
