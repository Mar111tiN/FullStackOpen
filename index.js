const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// MIDDLEWARE
app.use(bodyParser.json())
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

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2019-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2019-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2019-05-30T19:20:14.298Z",
      important: true
    }
  ]

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

app.get('/notes', (req, res) => {
  res.json(notes)
})

app.get('/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find(note => note.id === id)
  if (note) {
    res.json(note)
  } else {
    res.status(400).end()
  }
})

app.post('/notes', (req, res) => {
  const note = req.body

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
    text: note.content,
    date: new Date(),
    important: body.import || false,
  }
  notes = notes.concat(newNote)
  res.json(newNote)
})


app.delete('/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)
  res.status(204).end()
})

app.use(unknownEndpoint)

const PORT = 3001

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})
