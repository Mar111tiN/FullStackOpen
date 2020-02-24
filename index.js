require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Number = require('./models/number')


// middleware
app.use(bodyParser.json())
app.use(cors())
// static serve
app.use(express.static('build'))
// logging
morgan.token('Post', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :Post'))
// MW: UNKNOWN
const unknownEndpoint = (req, res) => {
  res.status(404).send({error: 'unknown endpoint'})
}

// MW: Error
const errorHandler = (e, req, res, next) => {
  if (e.name === "CastError" && e.type === "ObjectID") {
    res.status(400).send({
      error: 'malformed ID',
      detail: e
  })
  } else {
    res.status(404).send({
      error: "unknown error", 
      detail: e
    })
  }
}

app.get('/info', (req, res) => {
  Number.find({})
  .then(numbers => res.send(`<p>Phonebook has info for ${numbers.length} people</p>
  <p>${new Date()}</p>`))
  .catch(e => res.status(404).send({
    error: 'No numbers found on server',
    details: e
  }))
})

app.get('/api/persons', (req, res) => {
  Number.find({})
  .then(numbers => res.json(numbers.map(n => n.toJSON())))
  .catch(e => res.status(404).send({
    error: 'No numbers found on server', 
    details: e
  }))
})

app.get('/api/persons/:id', (req, res, next) => {
  Number.findById(req.params.id)
  .then(number => {
    (number)
    ? res.json(number.toJSON())
    : res.status(404).send({
      error: "This number does not exist",
      details: e
    })})
    .catch(e => next(e))
})

app.post('/api/persons', (req, res, next) => {
  const number = req.body
  if (!number.name) {
    return res.status(400).send({
      error: "Incomplete data"
    })
  }
  const newNumber = new Number({
    name: number.name,
    phone: number.phone
  })
  newNumber.save()
  .then(addedNumber => res.json(addedNumber.toJSON()))
  .catch(e => next(e))    
})

app.delete('/api/persons/:id', (req, res, next) => {
  Number.findByIdAndRemove(req.params.id)
  .then(delNumber => (delNumber)
    ? res.status(204).end()
    : res.status(404).end()
  )
  .catch(e => next(e))
})

app.put('/api/persons/:id', (req, res, next) => {
  const changedNumber = req.body
  if (!changedNumber.name) {
    return res.status(400).send({error: "not in database"})
  }
  Number.findByIdAndUpdate(req.params.id, changedNumber, {new: true})
  .then(updatedNumber => res.json(updatedNumber.toJSON()))
  .catch(e => next(e))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Phonebook server running on port ${PORT}`)
    }) 