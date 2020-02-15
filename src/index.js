import React from 'react'
import ReactDOM from 'react-dom'



const Header = ({ name }) => (
  <h1>{name}</h1>
)

const Total = ({number}) =>(
<p><strong>total of {number} exercices </strong></p>
) 

const Part = ({part}) => (
  <p>{part.name} {part.exercises}</p>
)


const Content = ({ course }) => course.parts.map(part => <Part part={part} key={part.id} />)


const Course = ({course}) => (
    <div>
      <Header name={course.name} />
      <Content course={course} />
    </div>
  )

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id:2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id:3
      },
      {
        name: 'Redux and React',
        exercises: 10,
        id:4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
      <Total number={course.parts.reduce((sum, part) => sum + part.exercises, 0)} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))