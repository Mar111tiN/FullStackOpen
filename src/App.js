import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'

const Form = ({onSubmit, onChange, text, input, onfocus ,onblur}) => (
  <form onSubmit={onSubmit}>
    <input 
      value={input}
      onChange={onChange}
      onFocus={onfocus}
    />
    <button type="submit">{text}</button>
  </form>
)

const App = (props) => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('a new note goes here')
    const [showAll, setShowAll] = useState(true)

    // LOAD as effect
    useEffect(() => {
      noteService.getAll().then(initialNotes => setNotes(initialNotes))
     } , [])


    // HANDLERS
    const addNote = (e) => {
      e.preventDefault()
      const addedNote = {
        id: notes.length + 1,
        content: newNote,
        date: new Date().toISOString(),
        important: Math.random() > 0.5
      }

      // POST REQUEST
      noteService.create(addedNote)
        .then(addedNote => {
          console.log(addedNote)
          setNotes(notes.concat(addedNote))
          setNewNote('')
        })

      
    }

    const handleNoteChange = (e) => setNewNote(e.target.value)

    const toggleImportanceOf = id => () => {
    
      const note = notes.find(note => note.id === id)
      const changedNote = {...note, important: !note.important}
      noteService.update(id, changedNote)
        .then(changedNote => {
          setNotes(notes.map((note) => (note.id === id)
          ? changedNote 
          : note
          ))
        })
        .catch(e => {
          alert(`the note '${note.content}' was already deleted from server`)
          setNotes(notes.filter(note => note.id !== id))
        })
    }
  
    const notesToShow = showAll
      ? notes
      : notes.filter(note => note.important)

    // DISPLAY
    const rows = () => notesToShow.map(note =>
      <Note 
        toggleImportance={toggleImportanceOf(note.id)}
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
        <Form 
          onSubmit={addNote} 
          onChange={handleNoteChange} 
          onfocus={() => {if (newNote === 'a new note goes here') setNewNote('')}}
          input={newNote} 
          text="save" 
        />
      </div>
    )
  }

  export default App