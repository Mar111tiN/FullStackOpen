const mongoose = require('mongoose')
if ( process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const collectionName = 'test2'

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

notes = [
    {
        content: 'HTML is very Easy',
        important: true,
    },
    {
        content: 'CSS is stored in separate file',
        important: false,
    },
    {
        content: 'Browsers can only execute JS',
        important: true,
    }
]


const addNote = (note) => {
    newNote = new Note({
        ...note,
        date: new Date(),
    })
    newNote.save().then(res => {
        console.log(`Note '${note.content}' saved to DB`)
        mongoose.connection.close()
    })
}

notes.forEach(addNote)
