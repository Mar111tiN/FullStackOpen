const notesRouter = require('express').Router();
const Note = require('../models/note');

// ROUTES
notesRouter.get('/', (req, res) => {
	Note.find({}).then((notes) => notes.map((note) => note.toJSON())).then((jsonNotes) => res.json(jsonNotes));
});

notesRouter.get('/:id', (req, res, next) => {
	Note.findById(req.params.id)
		.then(
			(note) =>
				note
					? res.json(note.toJSON())
					: res.status(404).send({
							error: 'note not found on DB'
						})
		)
		.catch((e) => next(e));
});

notesRouter.post('/', (req, res, next) => {
	const body = req.body;

	const newNote = new Note({
		content: body.content,
		date: new Date(),
		important: body.import || false
	});

	newNote.save().then((savedNote) => savedNote.toJSON()).then((jsonNote) => res.json(jsonNote)).catch((e) => next(e));
});

notesRouter.delete('/:id', (req, res, next) => {
	Note.findByIdAndRemove(req.params.id)
		.then(
			(delNote) =>
				delNote
					? res.status(204).end()
					: res.status(404).send({
							error: 'note not found'
						})
		)
		// catching Validation and server errors
		.catch((e) => next(e));
});

notesRouter.put('/:id', (req, res, next) => {
	const body = req.body;
	const id = req.params.id;

	const updatedNote = {
		content: body.content,
		important: body.important
	};
	Note.findByIdAndUpdate(id, updatedNote, { new: true })
		.then((updatedNote) => res.json(updatedNote.toJSON()))
		.catch((e) => next(error));
});

module.exports = notesRouter;
