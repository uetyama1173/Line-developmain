function reply(data) {
    var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME_LOG);
    sheet.appendRow([data.events[0]]);
  
    // POST情報から必要データを抽出;
    let replyToken = data.events[0].replyToken;
    let lineUserId = data.events[0].source.userId;
    let typedata = data.events[0].type;
  
    
    let nextMode = "default"
    if (typedata == "message") {
      //var postMsg = data.events[0].text;
      // var action = data.events[0].message.action;
      nextMode = "age"
    } else if(typedata == "postback"){
      let postbackdata = data.events[0].postback.data;
      const ages = ["young", "middle", "high", "aged"]
      if (ages.includes(postbackdata)) {
        nextMode = "number"
      } else {
        nextMode = "color"
      }
    } 
  
  
    //UserIDを抽出する関数を呼び出してるよ
    lineUserIddayo(lineUserId)
    // メッセージAPI送信
    sendMessage(replyToken, nextMode,);
  }
  
  // LINE messaging apiにJSON形式でデータをPOST
  function sendMessage(replyToken, nextMode) {
  
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
  
    // replyするメッセージの定義
    let postData = {}
    
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
    } else {
      postData = {
        "replyToken": replyToken,
        "messages": colorQuestion
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
  
  //UserIDを取得する関数だよ
  function lineUserIddayo(userId) {
    var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME_USER_ID);
    sheet.appendRow([userId]);
  }