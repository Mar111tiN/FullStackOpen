import React, { useState, useEffect } from 'react'
import Form from './components/Form'
import Number from './components/Number'
import Filter from './components/Filter'
import phoneService from './services/phonebook'


const App = () => {

  // STATE
  const [ numbers, setNumbers] = useState([])
  const [ message, setMessage ] = useState('')
  const [ filterPhrase, setFilterPhrase ] = useState('') 

  useEffect(() => {
    phoneService.getAll().then(phonebook => setNumbers(phonebook))
  },[])


  // HELPERS
  const Message = ({message}) => (message)
 ? <div>
    <p>{message}</p>
  </div> 
  : null

  const handleDelete = (delNumber) => () => {
    phoneService.deleteNumber(delNumber.id)
      .then(deletedNumber => {
        setMessage(`${delNumber.name} deleted`)
        setTimeout(() => setMessage(''), 3000)
        setNumbers(numbers.filter(number => number.id !== delNumber.id))
      })
  }

  const filteredNumbers = filterPhrase
    ? numbers.filter(number => number.name.toLowerCase().includes(filterPhrase) )
    : numbers

  const showNumbers = () => filteredNumbers.map(number => <Number 
      key={number.id} 
      number={number}
      handleDelete={handleDelete(number)}
    />)

  const handleFilter = (e) => setFilterPhrase(e.target.value.toLowerCase())

  return (
    <div>
      <Message message={message} />
      <h2>Phonebook</h2>
      <Filter value={filterPhrase} onChange={handleFilter} />
      
      <Form 
        numbers={numbers}
        setNumbers={setNumbers}
        setMessage={setMessage}
      />
      <h2>Numbers</h2>
      {showNumbers()}
    </div>
  )
}

export default App