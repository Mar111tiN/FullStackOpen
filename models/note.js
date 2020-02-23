const mongoose = require('mongoose')

const localDBurl = 'mongodb://127.0.0.1:27017'
const url = process.env.MONGODB_URI || localDBurl

console.log('connecting to', url)

mongoConfig = { 
    useNewUrlParser: true,
    useUnifiedTopology: true
 }

mongoose.connect(url, mongoConfig)
 .then(res => console.log('connected to MongoDB'))
 .catch(e => console.log('error connecting to MongoDB'))

 const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

noteSchema.set('toJSON', {
transform: (document, obj) => {
  obj.id = obj._id.toString()
  delete obj._id
  delete obj.__v
}
})

module.exports = mongoose.model('Note', noteSchema)