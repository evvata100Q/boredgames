import { useState } from 'react'
import styles from '../css/wordle.module.css'
let answer = 'kerbs'
const App = () => {
  let [guesscount, setguesscount] = useState(0)
  const [guesses, setguesses] = useState(new Array(6).fill('     '))
  const [curguess, setcurguess] = useState('')

  const [outgame, setoutgame] = useState(false)

  function reset() {
    setcurguess('')
    setguesses(new Array(6).fill('     '))
    setguesscount(0)
    setoutgame(false)
  }

  function guessword() {
    setguesses(prev => { prev[guesscount] = curguess; return prev })
    setcurguess('')

    if (curguess === answer) {
      setoutgame(true)
    }
    else {
      if (guesscount === 5) {
        setoutgame(true)
      }
      else {
        setguesscount(prev => prev + 1)
      }
    }


  }




  return (
    <div className={styles.main}>

      {
        outgame && <button onClick={reset}>reset</button>
      }



      <form onSubmit={(e) => { e.preventDefault(); guessword() }}>
        <input disabled={outgame} type="text" placeholder='enter a word' value={curguess} onChange={(e) => { setcurguess(e.target.value) }} minLength={5} maxLength={5} />
      </form>

      <br /><br />

      <div className={styles.guessestable}>
        {
          guesses.map(each =>
            each.split('').map((letter, index) => {
              return <div className={styles.gridbox} style={{ backgroundColor: each[index] === answer[index] ? 'green' : answer.includes(letter) ? 'yellow' : '' }}>
                {letter}
              </div>
            })
          )
        }
      </div>
    </div>
  )
}


export default App