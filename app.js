const config = require('./utils/config');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');
const notesRouter = require('./controllers/notes');
const mw = require('./utils/middleware');
const mongoose = require('mongoose');

console.log('connecting to', config.MONGODB_URL);

mongoConfig = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
};

mongoose
	.connect(config.MONGODB_URL, mongoConfig)
	.then((res) => console.log('connected to MongoDB'))
	.catch((e) => console.log('error connecting to MongoDB'));

// circumvent cross-origin resource sharing policy
app.use(cors());
// creaet default folder to look for static files
app.use(bodyParser.json());
app.use(express.static('build'));
app.use(mw.reqLogger);

app.use('/api/notes', notesRouter);

app.use(mw.unknownEndpoint);
app.use(mw.errorHandler);

module.exports = app;
