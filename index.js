require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

// models
const Note = require('./models/note')

// const url = 

// MIDDLEWARE
// circumvent cross-origin resource sharing policy
app.use(cors())
// creaet default folder to look for static files
app.use(bodyParser.json())
app.use(express.static('build'))

const reqLogger = (req, res, next) => {
  console.log('Method:', req.method)
  console.log('Path:', req.path)
  console.log('Body:', req.body)
  console.log('-------')
  next()
}
app.use(reqLogger)

const unknownEndpoint = (req, res) => {
  res.status(404).send({error: 'unknown endpoint'})
}

// ROUTES
app.get('/api/notes', (req, res) => {
  Note.find({})
    .then(notes => {
      res.json(notes.map(note => note.toJSON()))
    })
})

app.get('/api/notes/:id', (req, res) => {
  Note.findById(req.params.id)
    .then(note => (note) 
      ? res.json(note.toJSON())
      : res.status(404).send({
        error: "note not found on DB"
      }))
    .catch( e => res.status(404).send({
      error: "malformed ID",
      details: e
    })) 
  })

app.post('/api/notes', (req, res) => {
  const body = req.body

  // no request body
  if (!body.content) {
    return res.status(404).json({
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


app.delete('/api/notes/:id', (req, res) => {
  Note.findById(req.params.id)
    .then(note => {
      note.delete()
      console.log(`Note ${note.content} deleted`)
    })
  .catch( e => {
    res.status(404).json({
      error: 'Note does note live on server'
    })
  })
})

app.put('/api/notes/:id', (req, res) => {
  const body = req.body
  const id = Number(req.params.id)
  const note = notes.find(n => n.id === id)
  if (note) {
    // update 
    const newNote = {
      ...note,
      ...body,
      date: new Date()
    }
    notes = notes.map(n => (n.id === id)
      ? newNote
      : n)
    res.json(newNote)
  } else {
    res.status(404).json({
      error: 'Note does note live on server'
    })
  }
})

app.use(unknownEndpoint)

const PORT = process.env.PORT  // || 3001

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})
