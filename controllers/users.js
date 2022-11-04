const Usuario = require("../models/usuarioM")
const {
    getErrorResponseFormat,
    getSucessResponseFormat,
  } = require("../functions/errorFunctions");

  exports.createUsuario = async (req, res) => {
    const { body } = req;
  
    const usuario = new Usuario(body);
    await usuario.save()
    .then(() => {
        res
          .status(200)
          .send(getSucessResponseFormat("Usuario creado exitosamente"));
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

  exports.updateUsuario = async (req, res) => {
    const {body} = req;
    const usuario = await Usuario.findByIdAndUpdate(req.body.id, req.body)
    await usuario.save()
    .then(() => {
        res
          .status(200)
          .send(getSucessResponseFormat("Usuario actualizado exitosamente"));
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

