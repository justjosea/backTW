const Joi = require("joi");
const { getErrorResponseFormat } = require("../functions/errorFunctions.js");

exports.validateGet = (req, res, next) => {
	const { body } = req;
	const schema = Joi.object().keys({
		id: Joi.string().messages({
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

exports.validateCreate = (req, res, next) => {
    const { body } = req;
	const schema = Joi.object().keys({
		text: Joi.string().required().messages({
			"any.required": `El texto es requerido`,
			"string.base": `El texto no es valido`,
			"string.empty": `El texto no puede ser vacio`,
		}),
        autor: Joi.string().required().messages({
			"any.required": `El autor es requerido`,
			"string.base": `El autor no es valido`,
			"string.empty": `El autor no puede ser vacio`,
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
        id: Joi.string().required().messages({
			"any.required": `El id es requerido`,
			"string.base": `El id no es valido`,
			"string.empty": `El id no puede ser vacio`,
		}),
		text: Joi.string().required().messages({
			"any.required": `El texto es requerido`,
			"string.base": `El texto no es valido`,
			"string.empty": `El texto no puede ser vacio`,
		})
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