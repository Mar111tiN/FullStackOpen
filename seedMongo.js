const mongoose = require('mongoose')
const argCount = process.argv.length

// if ( argCount < 3) {
//     console.log('give password as argument')
//     process.exit(1)
// }

const password = process.argv[2]
const collectionName = 'notes-app'

// const url = `mongodb+srv://fullstack_user1:${password}@msmongo-x00kk.mongodb.net/${collectionName}?retryWrites=true&w=majority`

const url = 'mongodb://127.0.0.1:27017/fullstack'
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

const showNotes = () => {
    Note.find({}).then(allNotes => {
        allNotes.forEach(note => console.log(`${note.content} (${(note.important) 
            ? "important" 
            : "not important"})`))
        mongoose.connection.close()
    })
}

if ( argCount === 3) {
    notes.forEach(addNote)
} else {
    switch (process.argv[3]) {
        case "seed": notes.forEach(addNote); break;
        case "show": showNotes(); break;
    }
}