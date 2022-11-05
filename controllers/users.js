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

exports.getUsuarios = async (req, res) => {
  Usuario.find(function (error, docs) {
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
};

exports.updateUsuario = async (req, res) => {
  const { body } = req;
  const usuario = await Usuario.findByIdAndUpdate(body.id, req.body)
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

exports.deleteUsuario = async (req, res) => {
  const { id } = req.body;

  Usuario.findByIdAndDelete(id, function (error, docs) {
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
        .send(getSucessResponseFormat("Usuario eliminado exitosamente"));
    }
  });
}

exports.getSeguidores = async (req, res) => {
  const { id } = req.params;
  Usuario.findById(id, { followers: 1, _id: 0 }, function (error, docs) {
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
        .send(getSucessResponseFormat(docs.followers));
    }
  });
}

exports.getSeguidos = async (req, res) => {
  const { id } = req.params;
  Usuario.findById(id, { following: 1, _id: 0 }, function (error, docs) {
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
        .send(getSucessResponseFormat(docs.following));
    }
  });
}

exports.follow = async (req, res) => {

  const {
    seguidor,
    seguido
  } = req.body;

  let seguidos = await Usuario.findById(seguidor, { following: 1, _id: 0 })
  let seguidores = await Usuario.findById(seguido, { followers: 1, _id: 0 })

  seguidos = seguidos.following
  seguidores = seguidores.followers

  seguidos.push(seguido)
  seguidores.push(seguidor)

  const seguidoN = await Usuario.findByIdAndUpdate(req.body.seguido, { followers: seguidores })
  const seguidorN = await Usuario.findByIdAndUpdate(req.body.seguidor, { following: seguidos })

  seguidoN.save()
    .then(() => {

      seguidorN.save()
        .then(() => {
          res
            .status(200)
            .send(getSucessResponseFormat("Enlace seguido-seguidor creado exitosamente"));
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

exports.unfollow = async (req, res) => {

  const {
    seguidor,
    seguido
  } = req.body;

  let seguidos = await Usuario.findById(seguidor, { following: 1, _id: 0 })
  let seguidores = await Usuario.findById(seguido, { followers: 1, _id: 0 })

  seguidos = seguidos.following.filter((e) => e != seguido)
  seguidores = seguidores.followers.filter((e) => e != seguidor)

  const seguidoN = await Usuario.findByIdAndUpdate(seguido, { followers: seguidores })
  const seguidorN = await Usuario.findByIdAndUpdate(seguidor, { following: seguidos })

  seguidoN.save()
    .then(() => {

      seguidorN.save()
        .then(() => {
          res
            .status(200)
            .send(getSucessResponseFormat("Enlace seguido-seguidor eliminado exitosamente"));
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