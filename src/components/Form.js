import React, { useState} from 'react'
import phoneService from '../services/phonebook'

const Input = ({ text, value, onChange }) => (
  <div>
    {text}: <input 
      value={value}
      onChange={onChange}
    />
</div>
)

const Form = ({ persons, setPersons, setMessage }) => {

  // STATE
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')

  // INPUT control for  Form
  const control = (setter) => (e) => setter(e.target.value)

  // can be made extensive with regex
  const isValid = (number) => {
    const phonePattern = /^[0-9+][0-9 -]+$/
    return number.match(phonePattern)
  }

  const addPerson = (e) => {
    e.preventDefault()

    // handle person exists
    if (persons.find(person => person.name === newName)) {
      console.log(`${newName} is already added to phonebook`)
      setMessage(`${newName} is already added to phonebook`)
      setTimeout(() => setMessage(''), 3000)

    // handle no number
    } else if (!isValid(newPhone)) {
      setMessage('No valid phone number has been given')
      setTimeout(() => setMessage(''), 3000)
    } else {
      let newNumber = {
        name:newName,
        phone: newPhone
      }
      phoneService.createNumber(newNumber)
        .then((addedNumber) => {
          setPersons(persons.concat(addedNumber))
          setNewName('')
          setNewPhone('')
        })
    }
  }

  return (
    <div>
      <h2>Add new person</h2>
      <form onSubmit={addPerson}>
        <Input text="name" value={newName} onChange={control(setNewName)} />
        <Input text="phone" value={newPhone} onChange={control(setNewPhone)} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>

  )
}

export default Form



