const Tweet = require("../models/tweetM")
const {
  getErrorResponseFormat,
  getSucessResponseFormat,
} = require("../functions/errorFunctions");

exports.getTweets = async (req, res) =>{
    if (Object.keys(req.body).length === 0) {    
      Tweet.find(function (error, docs) {
        if (error) {
          console.log(error);
          res
            .status(500)
            .send(
              getErrorResponseFormat(
                "Ha ocurrido un error, por favor intenta mas tarde"
              )
            );
        }
        else {
          res
            .status(200)
            .send(getSucessResponseFormat(docs));
        }
      })  
    } else {
       Tweet.find({"autor": req.body.id}, function (error, docs) {
        if (error) {
          console.log(error);
          res
            .status(500)
            .send(
              getErrorResponseFormat(
                "Ha ocurrido un error, por favor intenta mas tarde"
              )
            );
        }
        else {
          res
            .status(200)
            .send(getSucessResponseFormat(docs));
        }
      })
    }
}

exports.createTweet = async (req, res) => {
    const { body } = req;
  
    const tweet = new Tweet(body);
    await tweet.save()
      .then(() => {
        res
          .status(200)
          .send(getSucessResponseFormat("Tweet creado exitosamente"));
      })
      .catch((error) => {
        console.log(error);
        res
          .status(500)
          .send(
            getErrorResponseFormat(
              "Ha ocurrido un error, por favor intenta mas tarde"
            )
          );
      });
  };

exports.updateTweet = async (req, res) => {
  const { body } = req;
  const tweet = await Tweet.findByIdAndUpdate(body.id, {text : req.body.text})
  await tweet.save()
    .then(() => {
      res
        .status(200)
        .send(getSucessResponseFormat("Tweet actualizado exitosamente"));
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .send(
          getErrorResponseFormat(
            "Ha ocurrido un error, por favor intenta mas tarde"
          )
        );
    });
}

exports.deleteTweet = async (req, res) => {
    const { id } = req.body;
  
    Tweet.findByIdAndDelete(id, function (error, docs) {
      if (error) {
        console.log(error);
        res
          .status(500)
          .send(
            getErrorResponseFormat(
              "Ha ocurrido un error, por favor intenta mas tarde"
            )
          );
      }
      else {
        res
          .status(200)
          .send(getSucessResponseFormat("Tweet eliminado exitosamente"));
      }
    });
  }