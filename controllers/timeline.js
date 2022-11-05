const Usuario = require("../models/usuarioM")
const Tweet = require('../models/tweetM')
const {
    getErrorResponseFormat,
    getSucessResponseFormat,
} = require("../functions/errorFunctions");

exports.getTweets = async (req, res) => {
    let seguidos = await Usuario.findById(req.body.id, { following: 1, _id: 0 })
    seguidos = seguidos.following
    seguidos
        .map(e =>
            Tweet.find({ autor: e }, null, { sort: '-updatedAt', sort: '-createdAt' },
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
