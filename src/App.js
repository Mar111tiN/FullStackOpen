import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')


  const addName = (e) => {
    e.preventDefault()
    let addedName = {name:newName}
    setPersons(persons.concat(addedName))
    setNewName('')

  }

  const inputChange = (e) => setNewName(e.target.value)

  const numbers = () => persons.map(person => <p key={person.name[0]}><strong>{person.name}</strong></p>)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
          value={newName}
          onChange={inputChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {numbers()}
    </div>
  )
}

export default App