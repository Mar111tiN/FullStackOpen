import React, { useState} from 'react'


const Input = ({ text, value, onChange }) => (
  <div>
    {text} : 
    <input 
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

  return (
    <form onSubmit={addPerson}>
      <Input text="name" value={newName} onChange={control(setNewName)} />
      <Input text="phone" value={newPhone} onChange={control(setNewPhone)} />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default Form



