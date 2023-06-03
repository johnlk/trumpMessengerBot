// This is a work in progress.
// Please report any bugs to nicomwaks@gmail.com.

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
const port = process.env.PORT || 8080;
const token = "EAAcF2t4BOS4BAA2umCekrT7DqDTglFuRrDwEqWjCpXRxZALJKydN2X5267EqvP3ZBKZCGXQ90fU0GpDxBig9yAIXkdUPJHLDSR6ZCwCRuZBg94i4b3WjrtFn8pFUHHHUmWzu3ZCiWatZA9Mlr1ZBDWN8vnAEl40sYFHhdPb0bAxRaAGBGQeAvDYu";

let trumpData;

const fs = require('fs');

fs.readFile('./output/all.txt', 'utf8', function(err, contents) {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  trumpData = contents.split('\n');
});

app.set('port', port);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.get('/webhook/', function (req, res) {
  if (req.query['hub.verify_token'] === 'greatscott') {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong token');
  }
});

app.post('/webhook/', function (req, res) {
  const messagingEvents = req.body.entry[0].messaging;
  for (let i = 0; i < messagingEvents.length; i++) {
    const event = messagingEvents[i];
    const sender = event.sender.id;
    if (event.message && event.message.text) {
      const text = event.message.text;
      let strRes = getRandomResponse();
      while (strRes.length < 5) {
        strRes = getRandomResponse();
      }
      sendTextMessage(sender, strRes);
    }
    if (event.postback) {
      const text = JSON.stringify(event.postback);
      let strRes = getRandomResponse();
      while (strRes.length < 5) {
        strRes = getRandomResponse();
      }
      sendTextMessage(sender, strRes);
      continue;
    }
  }
  res.sendStatus(200);
});

function sendTextMessage(sender, text) {
  const messageData = { text };
  
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: token },
    method: 'POST',
    json: {
      recipient: { id: sender },
      message: messageData,
    },
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending messages:', error);
    } else if (response.body.error) {
      console.log('Error:', response.body.error);
    }
  });
}

function getRandomResponse() {
  if (!trumpData || trumpData.length === 0) {
    return '';
  }
  return trumpData[Math.floor(Math.random() * trumpData.length)];
}

app.listen(port, function() {
  console.log('Running on port', port);
});
