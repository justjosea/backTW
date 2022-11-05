const mongoose = require("mongoose");

const tweet = new mongoose.Schema({
    text: {type: String, required: true},
    autor: {type: mongoose.Schema.ObjectId, required: true, ref: 'Usuario'},
  },
  { 
    timestamps: true 
  }
  );
     
  module.exports = mongoose.model("Tweet", tweet);