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

  const [ message, setMessage ] = useState('')



  // HELPERS
  const Message = ({message}) => (message)
 ? <div>
    <p>{message}</p>
  </div> 
  : null

  
  const numbers = () => persons.map(person => <Person key={person.name[0]} person={person} />)


  return (
    <div>
      <Message message={message} />
      <h2>Phonebook</h2>
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