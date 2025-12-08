import { useEffect, useRef, useState } from 'react'
import styles from '../css/sudoku.module.css'

const Sudoku = () => {
    const [focusrow, setfocusrow] = useState(null)
    const [focuscol, setfocuscol] = useState(null)
    const [board, setboard] = useState(
        new Array(9).fill('').map(each => new Array(9).fill(''))
    )

    function pressed(e) {
        if (!(e.key == 'q' || !isNaN(e.key))) { return }
        setboard(prev => {
            let copy = [...prev]
            if (!isNaN(e.key)) {
                copy[focusrow][focuscol] = e.key
                return copy
            }
            else {
                copy[focusrow][focuscol] = ''
                return copy
            }
        })
    }

    useEffect(() => {
        window.addEventListener('keypress', pressed)
        return () => { window.removeEventListener('keypress', pressed) }
    }, [focusrow, focuscol])

    function handleclick(rowi, coli) {
        setfocusrow(rowi)
        setfocuscol(coli)
    }


    function done() {
        let rowsets = new Array(9).fill('').map(each => { return new Set() })
        let colsets = new Array(9).fill('').map(each => { return new Set() })
        let boxsets = new Array(9).fill('').map(each => { return new Set() })

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                if (board[i][j] === '') { continue }
                let number = board[i][j]
                if (rowsets[i].has(number)) { alert('row error'); return } else { rowsets[i].add(number) }
                if (colsets[j].has(number)) { alert('column error'); return } else { colsets[j].add(number) }

                function boxnumber(i, j) {
                    return (3 * Math.floor(i / 3)) + (Math.floor(j / 3))
                }
                if (boxsets[boxnumber(i, j)].has(number)) { alert('grid error'); return } else { boxsets[boxnumber(i, j)].add(number) }
            }
        }
        alert('you win')
    }

    return (
        <div className={styles.main}>
            <button className={styles.sudokubutton} onClick={done}>check</button>
            <br />
            <h4 style={{ alignSelf: '' }}>*press q to remove</h4>
            <br /><br />
            <div className={styles.table}>
                {board.map((row, rowindex) => row.map((number, colindex) => {
                    return <div
                        className={styles.gridcell}
                        onClick={() => { handleclick(rowindex, colindex) }}
                        style={{ backgroundColor: rowindex === focusrow && colindex === focuscol ? 'lightgray' : '' }}>
                        {number}
                    </div>
                }))}
            </div>
        </div >
    )
}

export default Sudoku