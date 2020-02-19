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
      setMessage({
        text: 'No valid phone number has been given',
        type: 'error'
      })
      setTimeout(() => setMessage(null), 3000)
    } else { 
      const updatedNumber = numbers.find(number => number.name === newName)
      if (updatedNumber) { // handle person exists
        if (window.confirm(`Do you want to change ${newName}'s number?`) === true) {
          const newNumber = {
            ...updatedNumber,
            phone: newPhone
          }
          phoneService
          .update(newNumber)
            .then(updatedNumber => {
              setNumbers(numbers.map(number => (number.id === newNumber.id)
                ? newNumber
                : number
              ))
            })
            .catch(e => {
              setMessage({text: 'not on server', type: 'error'})
              setTimeout(() => setMessage(null), 3000)
            })
          setMessage({
            text: `${newName} has a new phone number`,
            type: 'success'
          })
          setTimeout(() => setMessage(null), 3000)
        } else {
          setMessage({
            text: `${newName} is already taken`,
            type: 'error'
          })
          setTimeout(() => setMessage(null), 3000)
        }
      } else {
        let newNumber = {
          name:newName,
          phone: newPhone
        }
        phoneService.create(newNumber)
          .then((addedNumber) => {
            setNumbers(numbers.concat(addedNumber))
          })
        setMessage({
          text: `${newName} has been added to phone list`,
          type: 'success'
        })
        setTimeout(() => setMessage(null), 3000)
      }
      setNewName('')
      setNewPhone('')
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