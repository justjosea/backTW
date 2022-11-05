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
		id: Joi.string().required().messages({
			"any.required": `El id es requerido`,
			"string.base": `El id no es valido`,
			"string.empty": `El id no puede ser vacio`,
		}),
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

exports.validateDelete = (req, res, next) => {
	const { body } = req;
	const schema = Joi.object().keys({
		id: Joi.string().required().messages({
			"any.required": `El id es requerido`,
			"string.base": `El id no es valido`,
			"string.empty": `El id no puede ser vacio`,
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

exports.validateGetbyId = (req, res, next) => {
	const { id } = req.params;
	const idP = Joi.string().required().messages({
			"any.required": `El id es requerido`,
			"string.base": `El id no es valido`,
			"string.empty": `El id no puede ser vacio`,
		})
	
	const { error } = idP.validate(id);
	const valid = error == null;
	if (valid) {
		next();
	} else {
		const { details } = error;
		const message = details.map((i) => i.message).join(",");
		res.status(500).send(getErrorResponseFormat(message));
	}
};

exports.validateFollow = (req, res, next) => {
	const { body } = req;
	const schema = Joi.object().keys({
		seguidor: Joi.string().required().messages({
			"any.required": `El id es requerido`,
			"string.base": `El id no es valido`,
			"string.empty": `El id no puede ser vacio`,
		}),
		seguido: Joi.string().required().messages({
			"any.required": `El id es requerido`,
			"string.base": `El id no es valido`,
			"string.empty": `El id no puede ser vacio`,
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