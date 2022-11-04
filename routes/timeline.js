const express = require('express');
const app = express();
const Tweet = require('../models/tweetM')
const Usuario = require("../models/usuarioM")

module.exports = app;

app.get('/', async(req, res) => {
    
    let seguidos = await Usuario.findById(req.body.id,{following:1, _id: 0})
    seguidos = seguidos.following
    seguidos.map(e => Tweet.find({autor: e},null, {sort: '-updatedAt', sort: '-createdAt'}, function (err, docs) {
        let tweets = docs.map(tweet => tweet.text)
        res.status(200).json(tweets)
    }) )
 }

)