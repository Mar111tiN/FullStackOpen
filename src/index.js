import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [ counter, setCounter] = useState(0);

  const Display = ({ counter }) => <div>{counter}</div>

  const Button = ({ onClick, lable }) => <button onClick={onClick}>{lable}</button>

  const setByClick = (value) => () => setCounter(value)
  // state change causes a re-render of the component
  return (
    <>
      <Display counter={counter} />
      <Button onClick={setByClick(counter + 1)} lable="plus" />
      <Button onClick={setByClick(counter - 1)} lable="minus" />
      <Button onClick={setByClick(0)} lable="reset" />
    </>
);
  }

ReactDOM.render(<App />, document.getElementById('root'))