
// コメント

function reply(data) {
  let agesnum
  let numbersnum
  let colorsnum


  // POST情報から必要データを抽出;
  let replyToken = data.events[0].replyToken;
  let lineUserId = data.events[0].source.userId;
  let typedata = data.events[0].type;
  let ages = ["young", "middle", "high", "aged"]
  let numbers = ["solo", "duet", "trio", "quintet"]
  let colors = ["red", "blue", "yellow", "green"]

  let sheet_detail = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME_DETAIL);
  var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME_LOG);
  sheet.appendRow([data.events[0]]);
  var sheet_data = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME_MAYBE);
  let useridname = data.events[0].source.userId;
  var sheet_userdata = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME_USER_ID);
  sheet_userdata.appendRow([data.events[0].source.userId]);
  let timestampda = data.events[0].timestamp;

  if (typedata == "message") {
    sheet_data.appendRow([timestampda, useridname]);
  } else if (typedata == "postback") {
    let postbackdata = data.events[0].postback.data;
    if (ages.includes(postbackdata)) {
      agesnum = sheet_data.appendRow([timestampda, useridname, "ages", ages.indexOf(postbackdata) + 1]);

    } else if (numbers.includes(postbackdata)) {
      numbersnum = sheet_data.appendRow([timestampda, useridname, "numbers", numbers.indexOf(postbackdata) + 1])
    }
    else {
      colorsnum = sheet_data.appendRow([timestampda, useridname, "colors", colors.indexOf(postbackdata) + 1])
    }
  }

  let land
  let detail
  let imageurl
  let detaillink
  let placekanko

  let nextMode = "default"
  if (typedata == "message") {
    nextMode = "age"
  } else if (typedata == "postback") {
    let postbackdata = data.events[0].postback.data;
    if (ages.includes(postbackdata)) {
      nextMode = "number"
    } else if (numbers.includes(postbackdata)) {
      nextMode = "color"
    } else if (colors.includes(postbackdata)) {

      //最終行を取得
      lastdata = sheet_data.getLastRow();
      lastdataUser = sheet_data.getRange(lastdata, 2).getValue();

      agesnum = sheet_data.getRange(lastdata - 2, 4).getValue();
      numbersnum = sheet_data.getRange(lastdata - 1, 4).getValue();
      colorsnum = sheet_data.getRange(lastdata, 4).getValue();

      placekanko = myFunction(agesnum, numbersnum, colorsnum) //cos類似度
      land = placekanko[0]
      detail = placekanko[1]
      imageurl = placekanko[2]
      detaillink = placekanko[3]

      nextMode = "ans"
    }
  }

  // if (nextMode == "ans") {
  //   myFunction() //cos類似度

  //   for (let i = 2; i < place.length; i++) {
  //     if (spot[max1_i][1] == sheet_detail.getRange(`A${i}`).getValues()) {
  //       place = sheet_detail.getRange(`B${i}`).getValue()
  //       detail = sheet_detail.getRange(`C${i}`).getValue()
  //       imageurl = sheet_detail.getRange(`D${i}`).getValue()
  //       detaillink = sheet_detail.getRange(`E${i}`).getValue()
  //     }
  //   }
  // }

  // メッセージAPI送信
  sendMessage(replyToken, nextMode, land, detail, imageurl, detaillink);
  //,land,detail,imageurl,detaillink

}

//let waoo =  [land,detail,imageurl,detaillink]
// LINE messaging apiにJSON形式でデータをPOST
function sendMessage(replyToken, nextMode, land, detail, imageurl, detaillink) {


  //function kankochijson()

  let ageQuestion = [
    {
      "type": "flex",
      "altText": "this is a flex message",
      "contents": {
        "type": "bubble",
        "hero": {
          "type": "image",
          "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
          "size": "full",
          "aspectRatio": "20:13",
          "aspectMode": "cover",
          "action": {
            "type": "uri",
            "uri": "http://linecorp.com/"
          }
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "年代を教えて下さい",
              "weight": "bold",
              "size": "xl",
              "margin": "none",
              "align": "center"
            },
            {
              "type": "box",
              "layout": "baseline",
              "margin": "md",
              "contents": []
            }
          ],
          "borderColor": "#696969",
          "cornerRadius": "30px"
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
                "type": "postback",
                "label": "20代",
                "data": "young",
                "displayText": "20代"
              }
            },
            {
              "type": "button",
              "style": "link",
              "height": "sm",
              "action": {
                "type": "postback",
                "label": "30~40代",
                "data": "middle",
                "displayText": "30~40代"
              }
            },
            {
              "type": "box",
              "layout": "vertical",
              "contents": [],
              "margin": "sm"
            },
            {
              "type": "button",
              "action": {
                "type": "postback",
                "label": "50~60代",
                "data": "high",
                "displayText": "50~60代"
              }
            },
            {
              "type": "button",
              "action": {
                "type": "postback",
                "label": "60代以上",
                "data": "aged",
                "displayText": "60代以上"
              }
            }
          ],
          "flex": 0
        }
      }

    }
  ]

  let numberQuestion = [
    {

      "type": "flex",
      "altText": "this is a flex message",
      "contents": {


        "type": "bubble",
        "hero": {
          "type": "image",
          "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
          "size": "full",
          "aspectRatio": "20:13",
          "aspectMode": "cover",
          "action": {
            "type": "uri",
            "uri": "http://linecorp.com/"
          }
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "何人で観光しますか？",
              "weight": "bold",
              "size": "xl",
              "margin": "none",
              "align": "center"
            },
            {
              "type": "box",
              "layout": "baseline",
              "margin": "md",
              "contents": []
            }
          ],
          "borderColor": "#696969",
          "cornerRadius": "30px"
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
                "type": "postback",
                "label": "1人",
                "data": "solo",
                "displayText": "1人"
              }
            },
            {
              "type": "button",
              "style": "link",
              "height": "sm",
              "action": {
                "type": "postback",
                "label": "2人",
                "data": "duet",
                "displayText": "2人"
              }
            },
            {
              "type": "box",
              "layout": "vertical",
              "contents": [],
              "margin": "sm"
            },
            {
              "type": "button",
              "action": {
                "type": "postback",
                "label": "3~5人",
                "data": "trio",
                "displayText": "3~5人"
              }
            },
            {
              "type": "button",
              "action": {
                "type": "postback",
                "label": "5人以上",
                "data": "quintet",
                "displayText": "5人以上"
              }
            }
          ],
          "flex": 0

        }
      }
    }


  ]

  let colorQuestion = [
    {
      "type": "flex",
      "altText": "this is a flex message",
      "contents": {

        "type": "bubble",
        "hero": {
          "type": "image",
          "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
          "size": "full",
          "aspectRatio": "20:13",
          "aspectMode": "cover",
          "action": {
            "type": "uri",
            "uri": "http://linecorp.com/"
          }
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "今日は何色の気分？",
              "weight": "bold",
              "size": "xl"
            }
          ]
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
                "type": "postback",
                "label": "赤",
                "data": "red",
                "displayText": "赤"
              }
            },
            {
              "type": "button",
              "style": "link",
              "height": "sm",
              "action": {
                "type": "postback",
                "label": "青",
                "data": "blue",
                "displayText": "青"
              }
            },
            {
              "type": "box",
              "layout": "vertical",
              "contents": [],
              "margin": "sm"
            },
            {
              "type": "button",
              "action": {
                "type": "postback",
                "label": "黄",
                "data": "yellow",
                "displayText": "黄"
              }
            },
            {
              "type": "button",
              "action": {
                "type": "postback",
                "label": "緑",
                "data": "green",
                "displayText": "緑"
              }
            }
          ],
          "flex": 0
        }
      }

    }
  ]

  let ans = [
    {
      "type": "flex",
      "altText": place,
      "contents": {

        "type": "bubble",
        "hero": {
          "type": "image",
          "url": imageurl,
          "size": "full",
          "aspectRatio": "20:13",
          "aspectMode": "cover",
          "action": {
            "type": "uri",
            "uri": "http://linecorp.com/"
          }
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": place,
              "weight": "bold",
              "size": "xl"
            },
            {
              "type": "box",
              "layout": "vertical",
              "margin": "lg",
              "spacing": "sm",
              "contents": []
            },
            {
              "type": "text",
              "text": detail
            }
          ]
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
                "type": "uri",
                "label": "詳細",
                "uri": dataillink
              }
            },
            {
              "type": "box",
              "layout": "vertical",
              "contents": [],
              "margin": "sm"
            }
          ],
          "flex": 0,
          "action": {
            "type": "uri",
            "label": "action",
            "uri": "http://linecorp.com/"
          }
        }

      }



    }
  ]




  // replyするメッセージの定義
  let postData = {}

  //Postdata を送ってます．
  if (nextMode == "age") {
    postData = {
      "replyToken": replyToken,
      "messages": ageQuestion
    };
  } else if (nextMode == "number") {
    postData = {
      "replyToken": replyToken,
      "messages": numberQuestion
    };
  } else if (nextMode == "color") {
    postData = {
      "replyToken": replyToken,
      "messages": colorQuestion
    };
  } else if (nextMode == "ans") {
    postData = {
      "replyToken": replyToken,
      "messages": ans
    };
  }

 

  // リクエストヘッダ
  var headers = {
    "Content-Type": "application/json; charset=UTF-8",
    "Authorization": "Bearer " + ACCESS_TOKEN
  };
  // POSTオプション作成
  var options = {
    "method": "POST",
    "headers": headers,
    "payload": JSON.stringify(postData)
  };
  return UrlFetchApp.fetch(REPLY, options);
}




