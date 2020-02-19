import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import Form from './components/Form'
import Notification from './components/Notification'
import noteService from './services/notes'
import './index.css'



const App = (props) => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('a new note goes here')
    const [showAll, setShowAll] = useState(true)
    const [message, setMessage] = useState(null)

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
          setMessage({
            text: `the note '${addedNote.content}' was saved to server`,
            type: "success"
          })
          setTimeout(() => setMessage(null), 2000)
          setNotes(notes.concat(addedNote))
          setNewNote('a new note goes here')
        })
    }

    const handleNoteChange = (e) => setNewNote(e.target.value)

    const toggleImportanceOf = id => () => {
    
      // 
      const note = notes.find(note => note.id === id)
      const changedNote = {...note, important: !note.important}

      noteService.update(id, changedNote)
        .then(changedNote => {
          setNotes(notes.map((note) => (note.id === id)
          ? changedNote 
          : note
          ))
          setMessage({
            text: `the note's importance was changed to'${(note.important) ? "important" : "not important"}'`,
            type: "success"
          })
          setTimeout(() => setMessage(null), 3000)
        })
        .catch(e => {
          setMessage({
            text: `the note '${note.content}' was already deleted from server`,
            type: "error"
          })
          
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
        <Notification message={ message }/>
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
          onblur={() => {if (newNote === '') setNewNote('a new note goes here')}}
          input={newNote} 
          text="save" 
        />
      </div>
    )
  }

  export default App