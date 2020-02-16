import React, { useState } from 'react'
import Form from './components/Form'


const Person = ({ person }) => (
<p><strong>{person.name}</strong>: {person.phone}</p>

)


const App = () => {

  // STATE
  const [ persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      phone: "040-1234567"
   },
   { 
    name: 'Martin Szyska',
    phone: "0178-7825900"
 },
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ message, setMessage ] = useState('')



  // HELPERS
  const Message = ({message}) => (message)
 ? <div>
    <p>{message}</p>
  </div> 
  : null


  // INPUT control for  Form
   const control = (setter) => (e) => setter(e.target.value)


  const addPerson = (e) => {
    e.preventDefault()
    if (persons.find(person => person.name === newName)) {
      console.log(`${newName} is already added to phonebook`)
      setMessage(`${newName} is already added to phonebook`)
      setTimeout(() => setMessage(''), 3000)
    } else {
      let addedName = {
        name:newName,
        phone: newPhone
      }
      setPersons(persons.concat(addedName))
      setNewName('')
      setNewPhone('')
    }
  }




  const numbers = () => persons.map(person => <Person key={person.name[0]} person={person} />)

  return (
    <div>
      <Message message={message} />
      <h2>Phonebook</h2>
      <Form 
        onSubmit={addPerson}
        name={newName} 
        onNameChange={control(setNewName)}
        phone={newPhone}
        onPhoneChange={control(setNewPhone)}
      />
      <h2>Numbers</h2>
      {numbers()}
    </div>
  )
}

export default App