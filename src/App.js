import React, { useState } from 'react'
import Note from './components/Note'



const Form = ({onSubmit, onChange, text, input}) => (
  <form onSubmit={onSubmit}>
    <input 
      value={input}
      onChange={onChange}
    />
    <button type="submit">{text}</button>
  </form>
)

const App = (props) => {
    const [notes, setNotes] = useState(props.notes)
    const [newNote, setNewNote] = useState('a new note goes here')
    const [showAll, setShowAll] = useState(true)

    // HANDLERS
    const addNote = (e) => {
      e.preventDefault()
      const addedNote = {
        id: notes.length + 1,
        content: newNote,
        date: new Date().toISOString(),
        important: Math.random() > 0.5
      }

      setNotes(notes.concat(addedNote))
      setNewNote('')
    }

    const handleNoteChange = (e) => {
      console.log(e.target.value)
      setNewNote(e.target.value)
    }

    const notesToShow = showAll
      ? notes
      : notes.filter(note => note.important)

    const rows = () => notesToShow.map(note =>
      <Note 
        key={note.id} 
        note={note} 
      />)
  
    return (
      <div>
        <h1>Notes</h1>
        <div>
          <button onClick={() => setShowAll(!showAll)}>
            show {showAll ? 'important' : 'All'}
          </button>
        </div>
        <ul>
          {rows()}
        </ul>
        <Form onSubmit={addNote} onChange={handleNoteChange} input={newNote} text="save" />
      </div>
    )
  }

  export default App