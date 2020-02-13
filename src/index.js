import React from 'react';
import ReactDOM from 'react-dom';

const Hello = ({name, age}) => (
  <div>
    <p>Hello {name}, you are {age} years old</p>
  </div>
)


const App = () => {
  const now = new Date();
  return (
  <div>
    <h1>Greetings</h1>
    <Hello name="Martin" age="25"/>
  </div>
)
}
ReactDOM.render(<App />, document.getElementById('root'));
