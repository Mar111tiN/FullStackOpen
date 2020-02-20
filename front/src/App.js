import React, { useState, useEffect } from 'react'
import Form from './components/Form'
import Number from './components/Number'
import Filter from './components/Filter'
import phoneService from './services/phonebook'
import './index.css'


const Message = ({message}) => (message)
? <div className={message.type}>
   <p>{message.text}</p>
 </div> 
 : null


const App = () => {

  // STATE
  const [ numbers, setNumbers] = useState([])
  const [ message, setMessage ] = useState(null)
  const [ filterPhrase, setFilterPhrase ] = useState('') 

  useEffect(() => {
    phoneService.getAll().then(phonebook => setNumbers(phonebook))
  },[])


  // HELPERS


  const handleDelete = (delNumber) => () => {
    phoneService.deleteNumber(delNumber.id)
      .then(deletedNumber => {
        setMessage({
          text: `${delNumber.name} deleted`,
          type: 'warning'
        })
        setTimeout(() => setMessage(null), 3000)
        setNumbers(numbers.filter(number => number.id !== delNumber.id))
      })
      .catch(e => {
        setMessage({text: 'not on server', type: 'error'})
        setTimeout(() => {
          setMessage(null)
          setNumbers(numbers.filter(number => number.id !== delNumber.id))
        }, 3000)
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