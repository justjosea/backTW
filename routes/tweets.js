const express = require('express');
const app = express();
const Tweet = require("../models/tweetM")
const controller = require("../controllers/tweets")

app.get('/', controller.getTweets)

app.post('/', controller.createTweet)

app.put('/', controller.updateTweet)

app.delete('/', controller.deleteTweet)

module.exports = app;