import React from 'react'
import ReactDOM from 'react-dom'



const Header = ({course}) => (
  <h1>{course}</h1>
)

const Total = ({number}) =>(
<p>Number of exercices {number}</p>
) 

const Part = ({part}) => (
  <p>{part.name} {part.exercises}</p>
)

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Part part={course.parts[0]} />
      <Part part={course.parts[1]} />
      <Part part={course.parts[2]} />
      <Total number={course.parts.reduce((sum, part) => sum + part.exercises, 0)} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))