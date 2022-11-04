exports.getSucessResponseFormat = (data) => {
	const response = {
		status: true,
		data: data,
	};
	return response;
};

exports.getErrorResponseFormat = (message) => {
	const response = {
		status: false,
		message: message,
	};
	return response;
};