const mongoose = require("mongoose");

const like = new mongoose.Schema({
    tweet: {type: mongoose.Schema.ObjectId, required: true, ref: 'Tweet', required: true},
    user: {type: mongoose.Schema.ObjectId, required: true, ref: 'Usuario'},
  });
     
  module.exports = mongoose.model("Like", like);