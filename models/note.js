const mongoose = require('mongoose')

const localDBurl = 'mongodb://127.0.0.1:27017/fullstack'
const url = process.env.MONGODB_URI || localDBurl

console.log('connecting to', url)

mongoConfig = { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
 }

mongoose.connect(url, mongoConfig)
 .then(res => console.log('connected to MongoDB'))
 .catch(e => console.log('error connecting to MongoDB'))

 const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minlength: 5,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, obj) => {
    obj.id = obj._id.toString()
    delete obj._id
    delete obj.__v
  }
  })

const Note = mongoose.model('Note', noteSchema)



module.exports = Note