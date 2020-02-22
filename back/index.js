const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

// middleware
app.use(bodyParser.json())
app.use(express.static('build'))
app.use(cors())
morgan.token('Post', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :Post'))

let numbers = [
  {
  "name": "Ada Lovelace",
  "phone": "39-44-5323523",
  "id": 2
  },
  {
  "name": "Dan Abramov",
  "phone": "12-43-234345",
  "id": 3
  },
  {
  "name": "Mary Poppendieck",
  "phone": "39-23-6423122",
  "id": 4
  },
  {
  "name": "Franziska Peter",
  "phone": "234235",
  "id": 5
  },
  {
  "name": "Martin Szyska",
  "phone": "23423",
  "id": 6
  }
]

const generateID = () => (numbers.length)
  ? Math.max(...numbers.map(number => number.id)) + 1
  : 1

app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info for ${numbers.length} people</p>
  <p>${new Date()}</p>`)
})

app.get('/api/persons', (req, res) => {
  res.json(numbers)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const number = numbers.find(number => number.id === id)
  res.json(number)
})

app.post('/api/persons', (req, res) => {
  const number = req.body

  if (numbers.find(n => n.name === number.name)) {
      res.status(404).json({
        error: "Name already in database"
      })
    } else {
      if (!number.phone) {
        res.status(404).json({
            error: "Phone number missing"
        })
      } else {
        const newNumber = {
          ...number,
          id: generateID(),
          date: new Date()
        }
        numbers = numbers.concat(newNumber)
        res.json(newNumber)
      }
    }     
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const number = numbers.find(number => number.id === id)
    if (number) {
        numbers = numbers.filter(number => number.id !== id)
        res.status(204).end()
    } else {
        res.status(400).end()
    }
})

app.use

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Phonebook server running on port ${PORT}`)
    })