import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const getAll = () => axios.get(baseURL)
  .then(res => res.data)

const create = (newNumber) => 
axios.post(baseURL, newNumber)
  .then(res => res.data)

const deleteNumber = (id) => axios.delete(`${baseURL}/${id}`)
  .then(res => res.data)

const update = (updatedNumber) => axios.put(`${baseURL}/${updatedNumber.id}`, updatedNumber)
  .then(res => res.data)


export default {
  getAll,
  create,
  deleteNumber,
  update
}