const Like = require("../models/likeM");
const Tweet = require("../models/tweetM");
const {
  getErrorResponseFormat,
  getSucessResponseFormat,
} = require("../functions/errorFunctions");

exports.getTweets = async (req, res) => {

  let liked = await Like.find({ user: req.body.id }, { tweet: 1, _id: 0 })
  liked = liked.map(e => e.tweet)
  liked
    .map(e =>
      Tweet.find({ _id: e }, null, { sort: '-updatedAt', sort: '-createdAt' },
                function (error, docs) {
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
                        let tweets = docs.map(tweet => tweet.text)
                        res
                            .status(200)
                            .send(getSucessResponseFormat(tweets));
                    }
                }))
}

exports.liked = async (req, res) => {
  const { body } = req;

  const like = new Like(body);
  await like.save()
    .then(() => {
      res
        .status(200)
        .send(getSucessResponseFormat("Like creado exitosamente"));
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

exports.unliked = async (req, res) => {
  const { id } = req.body;

  Like.findByIdAndDelete(id, function (error, docs) {
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
        .send(getSucessResponseFormat("Like eliminado exitosamente"));
    }
  });
}