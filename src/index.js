import React, {useState} from 'react';
import ReactDOM from 'react-dom';


// COMPONENTS
const History = ({ allClicks }) => (allClicks.length) 
  ? <div> button press history: {allClicks.join(' ')}</div>
  : <div> The app is used by pressing the buttons </div>


const Button = ({onClick, text}) => 
  <button onClick={onClick} >
    {text}
  </button>


const App = () => {
  // STATE

  const [clicks, setClicks] = useState({left:0, right:0})
  const [allClicks, setAll] = useState([])


  const handleLeftClick = () => {
    setClicks({...clicks, left:clicks.left + 1})
    setAll(allClicks.concat('L'))
  }

  const handleRightClick = () => {
    setClicks({...clicks, right:clicks.right + 1})
    setAll(allClicks.concat('R'))
  }

  return (
    <div>
      <div>
        {clicks.left}
        <Button onClick={handleLeftClick} text="left" />
        <Button onClick={handleRightClick} text="right" />
        {clicks.right}
        <History allClicks={allClicks} />
      </div>
    </div>
  )
  }

ReactDOM.render(<App />, document.getElementById('root'))