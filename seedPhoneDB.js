require('dotenv').config()
const mongoose = require('mongoose')

const argCount = process.argv.length
if ( argCount < 3) {
    console.log('give password as argument')
    process.exit(1)
} 

const password = process.argv[2]
const collectionName = "phone"
const url = `mongodb+srv://fullstack_user1:${password}@msmongo-x00kk.mongodb.net/${collectionName}?retryWrites=true&w=majority`

mongoConfig = { 
    useNewUrlParser: true,
    useUnifiedTopology: true
 }
mongoose.connect(url, mongoConfig)

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

  const numberSchema = new mongoose.Schema({
    name: String,
    phone: String
  })

  const Number = mongoose.model('Number', numberSchema)

  const addNumber = (number) => {
    const newNumber = new Number({
      ...number,
      date: new Date()
    })
    newNumber.save().then(res => {
      console.log(`newNumber <${number.name} - ${number.phone}> added to DB`)
      mongoose.connection.close()
    })
  }

const showNumbers = () => {
    const allNumbers = Number.find({}).then(allNumbers => 
      allNumbers.forEach(number => {
        console.log(`${number.name} - ${number.phone}`)
        mongoose.connection.close()
      })
    )}

if ( (argCount === 4) && (process.argv[3] === "seed")) {
    numbers.forEach(addNumber)
  }

if ( (argCount === 5)) {
  const newNumber = {
    name: process.argv[3],
    phone: process.argv[4]
  }
  addNumber(newNumber)
}

if ( (argCount === 3)) {

  showNumbers()
}
