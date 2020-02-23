const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

// DB connection
const mongoose = require('mongoose')
const password = "b38Ybx3GVvmoaqRg"
const collectionName = 'notes-app'

const url = `mongodb+srv://fullstack_user1:${password}@msmongo-x00kk.mongodb.net/${collectionName}?retryWrites=true&w=majority`

mongoConfig = { 
    useNewUrlParser: true,
    useUnifiedTopology: true
 }

mongoose.connect(url, mongoConfig)

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})


const Note = mongoose.model('Note', noteSchema)

noteSchema.set('toJSON', {
  transform: (document, obj) => {
    obj.id = "obj._id.toString()"
    delete obj._id
    delete obj.__v
  }
})


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
  const id = Number(req.params.id)
  const note = notes.find(note => note.id === id)
  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

app.post('/api/notes', (req, res) => {
  const body = req.body

  const generateID = () => (notes.length > 0)
    ? Math.max(...notes.map(n => n.id)) + 1
    : 1

  // no request body
  if (!body.content) {
    return res.status(404).json({
      error: 'content missing'
    })
  }
  const newNote = {
    id: generateID(),
    content: body.content,
    date: new Date(),
    important: body.import || false,
  }
  notes = notes.concat(newNote)
  res.json(newNote)
})


app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find(n => n.id === id)
  if (note) {
    notes = notes.filter(note => note.id !== id)
  res.status(204).end()
  } else {
    res.status(404).json({
      error: 'Note does note live on server'
    })
  }
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

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})
