const express = require('express');
const app = express();
const Tweet = require("../models/tweetM")


app.get('/', async (req,res) => {
    let tweets = []
    if (Object.keys(req.body).length === 0) {    
       tweets.push(await Tweet.find())  
    } else {
       tweets.push(await Tweet.find({"autor": req.body.id}))
    }
    tweets = tweets.flat()  
    res.status(200).json(tweets)  
})

app.post('/', async (req,res) => {
    const tweet = new Tweet(req.body);
    await tweet.save()
    res.status(200).json("Tweet creado")
})

app.put('/', async (req, res)=>{

    const tweet = await Tweet.findByIdAndUpdate(req.body.id, {text : req.body.text})
    await tweet.save()
    res.status(200).json("Tweet actualizado")
})

app.delete('/', async (req, res)=> {

   Tweet.findByIdAndDelete(req.body.id, function (err, docs) {
    if (err){
        res.status(400).json(err)
    }
    else{
        res.status(200).json("Tweet eliminado " + docs)
    }
});
})

module.exports = app;