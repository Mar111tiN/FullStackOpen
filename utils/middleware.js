//MW:ERROR HANDLER
const errorHandler = (e, req, res, next) => {
	console.log(e.message);
	if (e.name === 'CastError' && e.kind === 'ObjectId') {
		return res.status(400).send({
			error: 'malformed ID',
			details: e.message
		});
	} else if (e.name == 'ValidationError') {
		return res.status(400).send({
			error: 'POST body not valid',
			details: e.message
		});
	} else {
		return res.status(404).send({
			error: 'Note does note live on server',
			details: e.message
		});
	}
};

// MW:LOGGING
const reqLogger = (req, res, next) => {
	console.log('Method:', req.method);
	console.log('Path:', req.path);
	console.log('Body:', req.body);
	console.log('-------');
	next();
};

// MW: UNKNOWN
const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: 'unknown endpoint' });
};

module.exports = {
	reqLogger,
	unknownEndpoint,
	errorHandler
};
