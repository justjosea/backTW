const mongoose = require("mongoose");

const tweet = new mongoose.Schema({
    tweet: {type: mongoose.Schema.ObjectId, required: true, ref: 'Tweet', required: true},
    user: {type: mongoose.Schema.ObjectId, required: true, ref: 'Usuario'},
  });
     
  module.exports = mongoose.model("Tweet", tweet);