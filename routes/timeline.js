const express = require('express');
const app = express();
const Tweet = require('../models/tweetM')
const Usuario = require("../models/usuarioM")
const controller = require("../controllers/timeline")
module.exports = app;

app.get('/', controller.getTweets)