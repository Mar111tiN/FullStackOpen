import React from 'react'

const Header = ({ name }) => (
  <h2>{name}</h2>
)

const Part = ({part}) => (
  <p>{part.name} {part.exercises}</p>
)

const Content = ({ course }) => course.parts.map(part => <Part part={part} key={part.id} />)

const Total = ({course}) => {
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
  return <p><strong>total of {total} exercices </strong></p>
  }

const Course = ({course}) => (
    <div>
      <Header name={course.name} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )

  export default Course