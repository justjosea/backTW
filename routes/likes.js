const express = require('express');
const app = express();
const middleware = require("../middlewares/likes");
const controller = require("../controllers/likes") 

app.get(
    '/', 
    function (req, res, next) { middleware.validate(req, res, next); },
    controller.getTweets
)

app.post(
    '/', 
    function (req, res, next) { middleware.validateCreate(req, res, next); },
    controller.liked
)

app.delete(
    '/',
    function (req, res, next) { middleware.validate(req, res, next); },
    controller.unliked
)

module.exports = app;

