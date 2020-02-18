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

const Form = ({ numbers, setNumbers, setMessage }) => {

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

    // handle no number
    if (!isValid(newPhone)) {
      setMessage('No valid phone number has been given')
      setTimeout(() => setMessage(''), 3000)
    } else { 
      const updatedNumber = numbers.find(number => number.name === newName)
      if (updatedNumber) { // handle person exists
        console.log('updatedNumber', updatedNumber)
        if (window.confirm(`Do you want to change ${newName}'s number?`) === true) {
          const newNumber = {
            ...updatedNumber,
            phone: newPhone
          }
          phoneService.update(newNumber)
            .then(updatedNumber => {
              setNumbers(numbers.map(number => (number.id === newNumber.id)
                ? newNumber
                : number
              ))
          })
          setMessage(`${newName} has a new phone number`)
          setTimeout(() => setMessage(''), 3000)
        } else {
          setMessage(`${newName} is already taken`)
          setTimeout(() => setMessage(''), 3000)
        }
      } else {
        let newNumber = {
          name:newName,
          phone: newPhone
        }
        phoneService.create(newNumber)
          .then((addedNumber) => {
            setNumbers(numbers.concat(addedNumber))
            setNewName('')
            setNewPhone('')
          })
      }
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