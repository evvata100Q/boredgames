import { useEffect, useState } from 'react'
import styles from '../css/tictactoe.module.css'

const Tictactoe = () => {
    const [board, setboard] = useState(new Array(3).fill('').map(each => new Array(3).fill('')))
    const [turn, setturn] = useState('x')
    const [gamedone, setgamedone] = useState('')

    function played(i, j) {
        setboard(prev => {
            let copy = [...prev]
            copy[i][j] = turn
            return copy
        })
        setturn(prev => prev === 'x' ? 'o' : 'x')
    }

    useEffect(() => {
        function winline(line) {
            if (line.join('') === 'xxx') { return 'x' }
            if (line.join('') === 'ooo') { return 'o' }
        }
        let lines = [
            board[0],
            board[1],
            board[2],
            [board[0][0], board[1][0], board[2][0]],
            [board[0][1], board[1][1], board[2][1]],
            [board[0][2], board[1][2], board[2][2]],
            [board[0][0], board[1][1], board[2][2]],
            [board[0][2], board[1][1], board[2][0]]
        ]
        for (let i = 0; i < lines.length; i++) {
            let winner = winline(lines[i])
            if (winner) { setgamedone(winner); }
        }

    }, [turn])

    function reset() {
        setboard(new Array(3).fill('').map(each => new Array(3).fill('')))
        setturn('x')
        setgamedone('')
    }

    return (
        <div className={styles.main}>
            {gamedone && <div>
                <h3 style={{ textAlign: 'center' }}>{gamedone} wins</h3>
                <button className={styles.tictactoebutton} onClick={reset}>another game</button>
            </div>}
            <br /><br />
            <div className={styles.board}>
                {
                    board.map((row, i) => row.map((value, j) => {
                        return <div
                            style={{ borderTop: i === 0 && 'transparent', borderLeft: j === 0 && 'transparent', borderRight: j === 2 && 'transparent', borderBottom: i === 2 && 'transparent' }}
                            className={styles.box}
                            onClick={() => { gamedone === '' && played(i, j) }}
                        >
                            {value}
                        </div>
                    }))
                }
            </div>
        </div >
    )
}

export default Tictactoe