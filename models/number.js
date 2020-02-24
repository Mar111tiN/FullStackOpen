const mongoose = require('mongoose')

const localDBurl = 'mongodb://127.0.0.1:27017/fullstack'
const url = process.env.MONGODB_URL || localDBurl

console.log('connecting to', url)

mongoConfig = { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
 }

mongoose.connect(url, mongoConfig)
 .then(res => console.log('connected to MongoDB'))
 .catch(e => console.log('error connecting to MongoDB'))


const numberSchema = new mongoose.Schema({
    name: String,
    phone: String
})

numberSchema.set('toJSON', {
    transform: (doc, obj) => {
        obj.id = obj._id.toString()
        delete obj._id
        delete obj.__v
    } 
})

const Number = mongoose.model('Number', numberSchema)

module.exports = Number