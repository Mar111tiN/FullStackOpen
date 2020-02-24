require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

// models
const Note = require('./models/note')

// const url = 





// MIDDLEWARE
//MW:ERROR HANDLER
const errorHandler = (e, req, res, next) => {
  console.log(e.message)
  if (e.name === 'CastError' && e.kind === 'ObjectId') {
    return res.status(400).send({
      error: "malformed ID",
      details: e
  })} else {
    return res.status(404).send({
      error: 'Note does note live on server'
    })
  }
  next(e)
}
// MW:LOGGING
const reqLogger = (req, res, next) => {
  console.log('Method:', req.method)
  console.log('Path:', req.path)
  console.log('Body:', req.body)
  console.log('-------')
  next()
}

// MW: UNKNOWN
const unknownEndpoint = (req, res) => {
  res.status(404).send({error: 'unknown endpoint'})
}

// circumvent cross-origin resource sharing policy
app.use(cors())
// creaet default folder to look for static files
app.use(bodyParser.json())
app.use(express.static('build'))
app.use(reqLogger)


// ROUTES
app.get('/api/notes', (req, res) => {
  Note.find({})
    .then(notes => {
      console.log(notes)
      res.json(notes.map(note => note.toJSON()))
    })
})

app.get('/api/notes/:id', (req, res, next) => {
  Note.findById(req.params.id)
    .then(note => (note) 
      ? res.json(note.toJSON())
      : res.status(404).send({
        error: "note not found on DB"
      }))
    .catch( e => next(e)) 
  })

app.post('/api/notes', (req, res) => {
  const body = req.body

  // no request body
  if (!body.content) {
    return res.status(404).send({
      error: 'content missing'
    })
  }
  const newNote = new Note({
    content: body.content,
    date: new Date(),
    important: body.import || false,
  })
  console.log('saving', )
  newNote.save().then(savedNote => res.json(savedNote.toJSON()))
})

app.delete('/api/notes/:id', (req, res, next) => {
  Note.findByIdAndRemove(req.params.id)
    .then(delNote => (delNote) 
      ? res.status(204).end()
      : res.status(404).send({
        error: 'note not found'
      })
    )
    .catch(e => next(e))
})

app.put('/api/notes/:id', (req, res, next) => {
  const body = req.body
  const id = req.params.id

  const updatedNote = {
    content: body.content,
    important: body.important,
  }
  Note.findByIdAndUpdate(id, updatedNote, {new: true})
    .then(updatedNote => res.json(updatedNote.toJSON()))
    .catch(e => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)


const PORT = process.env.PORT  // || 3001

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})
