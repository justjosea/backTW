const express = require('express');
const app = express();
const Usuario = require("../models/usuarioM")
const middleware = require("../middlewares/users")
const controller = require("../controllers/users")

app.get('/', controller.getUsuarios)

app.post(
    '/',
    function (req, res, next) {middleware.validateCreate(req, res, next);},
    controller.createUsuario
)

app.put(
    '/',
    function (req, res, next) {middleware.validateUpdate(req, res, next);},
    controller.updateUsuario
)

app.delete(
    '/',
    function (req, res, next) {middleware.validateDelete(req, res, next);},
    controller.deleteUsuario
)

app.get('/:id/seguidores', controller.getSeguidores)

app.get('/:id/seguidos', controller.getSeguidos)

app.post('/seguir', controller.follow)

app.delete('/seguir', controller.unfollow)

module.exports = app;