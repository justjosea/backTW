const express = require('express');
const app = express();
const middleware = require("../middlewares/timeline")
const controller = require("../controllers/timeline")
module.exports = app;

app.get(
    '/',
    function (req, res, next) { middleware.validateGet(req, res, next); },
    controller.getTweets
)