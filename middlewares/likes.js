const Joi = require("joi");
const { getErrorResponseFormat } = require("../functions/errorFunctions.js");

exports.validate = (req, res, next) => {
	const { body } = req;
	const schema = Joi.object().keys({
		id: Joi.string().required().messages({
			"any.require": `El id es necesario`,
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
		tweet: Joi.string().required().messages({
			"any.required": `El texto es requerido`,
			"string.base": `El texto no es valido`,
			"string.empty": `El texto no puede ser vacio`,
		}),
        user: Joi.string().required().messages({
			"any.required": `El autor es requerido`,
			"string.base": `El autor no es valido`,
			"string.empty": `El autor no puede ser vacio`,
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