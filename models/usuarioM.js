const mongoose = require("mongoose");


const usuario = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    followers: [{type: mongoose.Schema.ObjectId, ref: 'Usuario' }],
    following: [{type: mongoose.Schema.ObjectId, ref: 'Usuario' }],
  });
     
  module.exports = mongoose.model("Usuario", usuario);