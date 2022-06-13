
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
  channelSecret: process.env.CHANNEL_ACCESS_TOKEN,
  channelAccessToken: process.env.CHANNEL_SECRET
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
