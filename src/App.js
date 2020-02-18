import React, { useState, useEffect } from 'react'
import Form from './components/Form'
import Person from './components/Person'
import Filter from './components/Filter'
import phoneService from './services/phonebook'


const App = () => {

  // STATE
  const [ persons, setPersons] = useState([])
  const [ message, setMessage ] = useState('')
  const [ filterPhrase, setFilterPhrase ] = useState('') 

  useEffect(() => {
    phoneService.getAll().then(phonebook => setPersons(phonebook))
  },[])


  // HELPERS
  const Message = ({message}) => (message)
 ? <div>
    <p>{message}</p>
  </div> 
  : null

  const filteredPersons = filterPhrase
    ? persons.filter(person => person.name.toLowerCase().includes(filterPhrase) )
    : persons

  const numbers = () => filteredPersons.map(person => <Person key={person.name[0]} person={person} />)

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