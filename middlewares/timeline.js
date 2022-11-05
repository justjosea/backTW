const Joi = require("joi");
const { getErrorResponseFormat } = require("../functions/errorFunctions.js");

exports.validateGet = (req, res, next) => {
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