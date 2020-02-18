import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const getAll = () => axios.get(baseURL)
  .then(res => res.data)

const createNumber = (newNumber) => 
axios.post(baseURL, newNumber)
  .then(res => res.data)


export default {
  getAll,
  createNumber
}