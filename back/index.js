const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

const numbers = [
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

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${numbers.length} people</p>
    <p>${new Date()}</p>`)
})


app.get('/api/persons', (req, res) => {
    res.json(numbers)
})

app.get('/api/persons/:id', )

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Phonebook server running on port ${PORT}`)
    })