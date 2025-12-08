import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import styles from '../css/layout.module.css'

let games = ['dice and coin', 'rock paper scissors', 'sudoku', 'tictactoe', 'wordle', 'typing speed', 'fifteen']
let urls = ['dicecoin', 'rps', 'sudoku', 'tictactoe', 'wordle', 'wps', 'fifteen']
games = games.map((each, index) => { return { gamename: each, url: urls[index] } })

const Layout = () => {
    const [sidebar, setsidebar] = useState(false)

    function ott() {
        return Math.floor(Math.random() * 256)
    }

    return (
        <div className={styles.main} onClick={() => { setsidebar(false) }}>

            <div className={`${styles.sidebar} ${sidebar && styles.sbaractive}`} >
                {
                    games.map(game => {
                        return <div className={styles.sidebaritem} style={{ backgroundColor: `rgba(${ott()},${ott()}, ${ott()},0.25)` }}>
                            <Link className={styles.linktogames} to={game.url}>{game.gamename}</Link>
                        </div>
                    })
                }
            </div>
            <div onClick={(e) => { e.stopPropagation(); setsidebar(true) }} className={`${styles.sidebutton} ${sidebar && styles.sbuttonactive}`} ></div>
            <Outlet />
        </div>
    )
}

export default Layout