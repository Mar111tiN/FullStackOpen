const mongoose = require('mongoose')

const argCount = process.argv.length
if ( argCount < 3) {
    console.log('give password as argument')
    process.exit(1)
} else {
    const password = process.argv[2]
    if (argCount == 5) {
        const name = process.argv[2]
        const number = process.argv[3]
    }
}

const collectionName = phone

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