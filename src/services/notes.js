import axios from 'axios'
const baseURL = 'http://localhost:3001/notes'

const getAll = () => axios.get(baseURL).then(res => res.data)

const create = newNote => axios.post(baseURL, newNote).then(res => res.data)

const update = (id, newNote) => axios
    .put(`${baseURL}/${id}`, newNote)
    .then(res => res.data)

export default { getAll, create, update }