require('dotenv').config()

const PORT = process.env.PORT || 3001
const localDBurl = 'mongodb://127.0.0.1:27017/fullstack'
const MONGODB_URL = process.env.MONGODB_URI || localDBurl

if (process.env.NODE_ENV === 'test') {
  MONGODB_URL = process.env.TEST_MONGODB_URL
}

module.exports = {
  MONGODB_URL,
  PORT,
}
