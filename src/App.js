import React, { useState } from 'react'

const Message = ({message}) => (message)
 ? <div>
    <p>{message}</p>
  </div> 
  : null




const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ message, setMessage ] = useState('')


  const addName = (e) => {
    e.preventDefault()
    if (persons.find(person => person.name === newName)) {
      console.log(`${newName} is already added to phonebook`)
      setMessage(`${newName} is already added to phonebook`)
      setTimeout(() => setMessage(''), 3000)
    } else {
      let addedName = {name:newName}
      setPersons(persons.concat(addedName))
      setNewName('')
    }
  }

  const inputChange = (e) => setNewName(e.target.value)

  const numbers = () => persons.map(person => <p key={person.name[0]}><strong>{person.name}</strong></p>)

  return (
    <div>
      <Message message={message} />
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