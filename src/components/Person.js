import React from 'react'

const Person = ({ person }) => (
    <p><strong>{person.name}</strong>: {person.phone}</p>
    )

export default Person