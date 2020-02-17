import React, { useState, useEffect } from 'react'
import Form from './components/Form'
import Person from './components/Person'
import Filter from './components/Filter'
import axios from 'axios'


const App = () => {

  // STATE
  const [ persons, setPersons] = useState([])
  const [ message, setMessage ] = useState('')
  const [ filterPhrase, setFilterPhrase ] = useState('') 

  const getData = (url) => () => {
    axios.get(url)
      .then(res => {
        console.log(`received data from ${url}`)
        setPersons(res.data)
      })
    }

  useEffect(getData('http://localhost:3001/persons'), [])


  // HELPERS
  const Message = ({message}) => (message)
 ? <div>
    <p>{message}</p>
  </div> 
  : null

  const filteredPersons = filterPhrase
    ? persons.filter(person => person.name.toLowerCase().includes(filterPhrase) )
    : persons

  const numbers = () => filteredPersons.map(person => <Person key={person.name} person={person} />)

  const handleFilter = (e) => setFilterPhrase(e.target.value.toLowerCase())

  return (
    <div>
      <Message message={message} />
      <h2>Phonebook</h2>
      <Filter value={filterPhrase} onChange={handleFilter} />
      
      <Form 
        persons={persons}
        setPersons={setPersons}
        setMessage={setMessage}
      />
      <h2>Numbers</h2>
      {numbers()}
    </div>
  )
}

export default App