import { useState, useRef, useEffect } from 'react'
import Die from './Die'
import {nanoid } from 'nanoid'
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

function App() {

  const [dice, setDice] = useState(() => generateAllNewDice()) 
  const buttonRef = useRef(null) 


  const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)

  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus()
    }
  },[gameWon])

  function generateAllNewDice() {
    return new Array(10)
    .fill(0)
    .map(() => (
      {value: Math.ceil(Math.random() * 6), 
      isHeld: false,
      id:nanoid()}
    ))
  }

  function hold(id) {
    setDice(prevDice => {
      return prevDice.map(die => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die
      })
    })
  }

  function rollDice() {
    setDice(prevDice => {
      return prevDice.map(die => {
        return die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)}
      })
    })
  }

  const diceElements = dice.map(die => 
  <Die 
    key={die.id} 
    id={die.id}
    value={die.value} 
    isHeld={die.isHeld}  
    handleClick= {() => hold(die.id)}
  />)

  function handleGame() {
    gameWon ? setDice(generateAllNewDice()) : rollDice()

  }

  const { width, height } = useWindowSize();
  

  return (
    <>
      {gameWon && <Confetti width={width} height={height} />}
      <div aria-live="polite" className="sr-only">
        {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>
      <div className='container'>
        <h1>Tenzies</h1>
        
        <p>
          Roll until all dice are the same.
          <br/> Click each die to freeze it at its current value between rolls. 
        </p>

        <div className='dice-container'>
          {diceElements}
        </div>

        <button ref={buttonRef} onClick={handleGame}>
         {gameWon ? "New Game" : 'Roll'}
        </button>
      </div>
    </>
  )
}

export default App
