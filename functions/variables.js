// 返信用のメッセージ

// 連絡取ってるか「はい」への応答
exports.replyCaseYes = {
  "type": "text",
  "text": "その調子で頑張って！声を聞かせたり、元気な姿を見せるのは、あなたが思う以上に嬉しいものよ $",
  "emojis": [
    {
      "index": 45,
      "productId": "5ac1bfd5040ab15980c9b435",
      "emojiId": "044",
    },
  ],
};
exports.replyCaseYesStamp =
{
  "type": "sticker",
  "packageId": "8515",
  "stickerId": "16581242",
};

// 連絡取ってるか「いいえ」への応答
exports.replyCaseNoStamp =
{
  "type": "sticker",
  "packageId": "1070",
  "stickerId": "17866",
};

// 選択肢のflex message
exports.replyCaseNoSelectbox = {
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
          "text": "理由は何かしら？",
          "weight": "bold",
          "size": "md",
        },
      ],
    },
    "footer": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "button",
          "action": {
            "type": "message",
            "label": "なんとなく・・・",
            "text": "なんとなく・・・",
          },
        },
        {
          "type": "button",
          "action": {
            "type": "message",
            "label": "時間がなかった・・・",
            "text": "時間がなかった・・・",
          },
        },
        {
          "type": "button",
          "action": {
            "type": "message",
            "label": "今回は大丈夫！",
            "text": "今回は大丈夫！",
          },
        },
      ],
    },
    "styles": {
      "body": {
        "backgroundColor": "#FDDDDE",
      },
    },
  },
};

// 連絡取ってるか「なんとなく・・・」への応答
exports.replyCaseSomehow = {
  "type": "text",
  "text": "「便りの無いのは良い便り」とは言っても、ちょっとしたコミュニケーションで気づくこともあるのよ $",
  "emojis": [
    {
      "index": 47,
      "productId": "5ac1bfd5040ab15980c9b435",
      "emojiId": "043",
    },
  ],
};
// 理由を聞くflex message
exports.replyCaseSomohowSelectbox = {
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
          "text": "よかったらご家族に聞いてみたら？",
          "weight": "bold",
          "size": "md",
        },
      ],
    },
    "footer": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "button",
          "action": {
            "type": "message",
            "label": "体調のこと",
            "text": "体調のこと",
          },
        },
        {
          "type": "button",
          "action": {
            "type": "message",
            "label": "食事のこと",
            "text": "食事のこと",
          },
        },
        {
          "type": "button",
          "action": {
            "type": "message",
            "label": "運動のこと",
            "text": "運動のこと",
          },
        },
        {
          "type": "button",
          "action": {
            "type": "message",
            "label": "困りごと",
            "text": "困りごと",
          },
        },
        {
          "type": "button",
          "action": {
            "type": "message",
            "label": "心配事",
            "text": "心配事",
          },
        },
      ],
    },
    "styles": {
      "body": {
        "backgroundColor": "#FDDDDE",
      },
    },
  },
};

// 連絡取ってるか「時間がなかった・・・」への応答
exports.replyCaseBusy = {
  "type": "text",
  "text": "だいたいみんなそうよね $\n最近うれしかったこととか、おいしかったご飯の写真とか送るだけでもいいと思うよ $",
  "emojis": [
    {
      "index": 12,
      "productId": "5ac1bfd5040ab15980c9b435",
      "emojiId": "053",
    },
    {
      "index": 53,
      "productId": "5ac1bfd5040ab15980c9b435",
      "emojiId": "074",
    },
  ],
};

exports.replyCaseBusyStamp =
{
  "type": "sticker",
  "packageId": "6325",
  "stickerId": "10979917",
};
// 連絡取ってるか「今回は大丈夫！」への応答
exports.replyCaseSkip = {
  "type": "text",
  "text": "目標は月2回よ $",
  "emojis": [
    {
      "index": 8,
      "productId": "5ac21e6c040ab15980c9b444",
      "emojiId": "011",
    },
  ],
};

exports.replyCaseSkipStamp =
{
  "type": "sticker",
  "packageId": "6325",
  "stickerId": "10979926",
};

// 「体調のこと」への応答
exports.replyAdviceHealth = {
  "type": "text",
  "text":
    "「最近、腰の調子はどう？」みたいに、さりげなーく聞くのがポイント\n突然改まって聞くと逆に不安にさせるの\n話題を送るから連絡するのよ",
};

// 「食事のこと」への応答
exports.replyAdviceMeal = {
  "type": "text",
  "text": "食べる時間が不規則だったり、偏ったりしてるかも\n気にしてみてね\n話題を送るから連絡するのよ",
};

// 「運動のこと」への応答
exports.replyAdviceExercise = {
  "type": "text",
  "text": "理想は「30分以上の運動を週2日以上」なの\n軽い散歩からススメてみて\n話題を送るから連絡するのよ",
};


// 「困りごと」への応答
exports.replyAdviceProblems = {
  "type": "text",
  "text":
    "重い物を運ぶとか、ちょっとしたことが難しくなるのよね\n帰省した時に手伝うとか、通販で贈るとかいいかも\n話題を送るから連絡するのよ",
};

// 「心配事」への応答
exports.replyAdviceWorry = {
  "type": "text",
  "text": "詐欺とか事故多いわよね\nニュースを見た時とかに連絡をとると、ご家族もきっと安心するわよ\n話題を送るから連絡するのよ",
};

// 想定外への応答
exports.replyUnexpected = {
  "type": "text",
  "text": "ごめん、それはよくわからないわ $",
  "emojis": [
    {
      "index": 16,
      "productId": "5ac1bfd5040ab15980c9b435",
      "emojiId": "010",
    },
  ],
};
