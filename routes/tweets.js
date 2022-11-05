const express = require('express');
const app = express();
const middleware = require("../middlewares/tweets")
const controller = require("../controllers/tweets")

app.get(
    '/', 
    function (req, res, next) { middleware.validateGet(req, res, next); },
    controller.getTweets
)

app.post(
    '/', 
    function (req, res, next) { middleware.validateCreate(req, res, next); },
    controller.createTweet
)

app.put(
    '/',
    function (req, res, next) { middleware.validateUpdate(req, res, next); },
    controller.updateTweet
)

app.delete(
    '/',
    function (req, res, next) { middleware.validateDelete(req, res, next); },
    controller.deleteTweet
)

module.exports = app;