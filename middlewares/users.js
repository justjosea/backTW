const Joi = require("joi");
const { getErrorResponseFormat } = require("../functions/errorFunctions.js");

exports.validateCreate = (req, res, next) => {
    const { body } = req;
	const schema = Joi.object().keys({
		name: Joi.string().required().messages({
			"any.required": `El nombre es requerido`,
			"string.base": `El nombre no es valido`,
			"string.empty": `El nombre no puede ser vacio`,
		}),
        email: Joi.string().required().messages({
			"any.required": `El email es requerido`,
			"string.base": `El email no es valido`,
			"string.empty": `El email no puede ser vacio`,
		}),
        password: Joi.string().required().messages({
			"any.required": `La contraseña es requerida`,
			"string.base": `La contraseña no es valida`,
			"string.empty": `La contraseña no puede ser vacia`,
		}),
        followers: Joi.array().items(Joi.string()).messages({
            "array.base": `Los seguidores deben ser un array`,
            "string.base": `Los seguidores no son validos`
        }),
        following: Joi.array().items(Joi.string()).messages({
            "array.base": `Los seguidos deben ser un array`,
            "string.base": `Los seguidos no son validos`
        }),
        tweets: Joi.array().items(Joi.string()).messages({
            "array.base": `Los tweets deben ser un array`,
            "string.base": `Los tweets no son validos`
        }),
        likes: Joi.array().items(Joi.string()).messages({
            "array.base": `Los likes deben ser un array`,
            "string.base": `Los likes no son validos`
        }),
	});

	const { error } = schema.validate(body);
	const valid = error == null;
	if (valid) {
		next();
	} else {
		const { details } = error;
		const message = details.map((i) => i.message).join(",");
		res.status(500).send(getErrorResponseFormat(message));
	}
};

exports.validateUpdate = (req, res, next) => {
	const { body } = req;
	const schema = Joi.object().keys({
		name: Joi.string().required().messages({
			"any.required": `El nombre es requerido`,
			"string.base": `El nombre no es valido`,
			"string.empty": `El nombre no puede ser vacio`,
		}),
        email: Joi.string().required().messages({
			"any.required": `El email es requerido`,
			"string.base": `El email no es valido`,
			"string.empty": `El email no puede ser vacio`,
		}),
        password: Joi.string().required().messages({
			"any.required": `La contraseña es requerida`,
			"string.base": `La contraseña no es valida`,
			"string.empty": `La contraseña no puede ser vacia`,
		}),
        followers: Joi.array().items(Joi.string()).messages({
            "array.base": `Los seguidores deben ser un array`,
            "string.base": `Los seguidores no son validos`
        }),
        following: Joi.array().items(Joi.string()).messages({
            "array.base": `Los seguidos deben ser un array`,
            "string.base": `Los seguidos no son validos`
        }),
        tweets: Joi.array().items(Joi.string()).messages({
            "array.base": `Los tweets deben ser un array`,
            "string.base": `Los tweets no son validos`
        }),
        likes: Joi.array().items(Joi.string()).messages({
            "array.base": `Los likes deben ser un array`,
            "string.base": `Los likes no son validos`
        }),
	});

	const { error } = schema.validate(body);
	const valid = error == null;
	if (valid) {
		next();
	} else {
		const { details } = error;
		const message = details.map((i) => i.message).join(",");
		res.status(500).send(getErrorResponseFormat(message));
	}
};
