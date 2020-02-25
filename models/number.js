const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

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
    name: {
        type: String,
        unique: true,
        required: true
    }
    phone: {
        type: String,
        required: true
    }
})

numberSchema.set('toJSON', {
    transform: (doc, obj) => {
        obj.id = obj._id.toString()
        delete obj._id
        delete obj.__v
    } 
})
numberSchema.plugin(uniqueValidator)

const Number = mongoose.model('Number', numberSchema)

module.exports = Number