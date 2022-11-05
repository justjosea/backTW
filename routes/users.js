const express = require('express');
const app = express();
const middleware = require("../middlewares/users")
const controller = require("../controllers/users")

app.get('/', controller.getUsuarios)

app.post(
    '/',
    function (req, res, next) { middleware.validateCreate(req, res, next); },
    controller.createUsuario
)

app.put(
    '/',
    function (req, res, next) { middleware.validateUpdate(req, res, next); },
    controller.updateUsuario
)

app.delete(
    '/',
    function (req, res, next) { middleware.validateDelete(req, res, next); },
    controller.deleteUsuario
)

app.get(
    '/:id/seguidores',
    function (req, res, next) { middleware.validateGetbyId(req, res, next); },
    controller.getSeguidores
)

app.get(
    '/:id/seguidos',
    function (req, res, next) { middleware.validateGetbyId(req, res, next); },
    controller.getSeguidos
)

app.post(
    '/seguir',
    function (req, res, next) { middleware.validateFollow(req, res, next); },
    controller.follow
)

app.delete(
    '/seguir',
    function (req, res, next) { middleware.validateFollow(req, res, next); },
    controller.unfollow
)

module.exports = app;