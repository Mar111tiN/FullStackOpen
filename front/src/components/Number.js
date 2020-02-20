import React from 'react'

const Number = ({ number, handleDelete }) => (
  <div>
    <p><strong>{number.name}</strong>: {number.phone}</p>
    <button onClick={handleDelete}>delete</button>
  </div>
    )

export default Number