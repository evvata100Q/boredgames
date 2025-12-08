import { useEffect, useState } from 'react'
import styles from '../css/fifteen.module.css'
let inits = [
    [0, 0], [25, 0], [50, 0], [75, 0],
    [0, 25], [25, 25], [50, 25], [75, 25],
    [0, 50], [25, 50], [50, 50], [75, 50],
    [0, 75], [25, 75], [50, 75], [75, 75]
]

for (let i = 1; i <= 10; i++) {
    let a = Math.floor(Math.random() * 16)
    let b = Math.floor(Math.random() * 16);
    [inits[a], inits[b]] = [inits[b], inits[a]]

}

const Fifteen = () => {
    const [tiles, settiles] = useState(() => {
        let a = inits.map((each, index) => { return { val: index + 1 === 16 ? '' : index + 1, posx: each[0], posy: each[1] } })
        return a
    })

    function move(e) {

        if (e.key === 'd') {

            settiles(prev => {
                let copy = [...prev];
                let i = copy.findIndex((each) => { return each.val === '' })

                if (tiles[i].posx === 0) { return copy }
                let j = copy.findIndex((each) => { return each.posx === tiles[i].posx - 25 && each.posy === tiles[i].posy })
                copy[i].posx -= 25
                copy[j].posx += 25
                return copy
            })
        }
        if (e.key === 'a') {
            settiles(prev => {
                let copy = [...prev];
                let i = copy.findIndex((each) => { return each.val === '' })

                if (tiles[i].posx === 75) { return copy }
                let j = copy.findIndex((each) => { return each.posx === tiles[i].posx + 25 && each.posy === tiles[i].posy })
                copy[i].posx += 25
                copy[j].posx -= 25
                return copy
            })
        }
        if (e.key === 's') {
            settiles(prev => {
                let copy = [...prev];
                let i = copy.findIndex((each) => { return each.val === '' })

                if (tiles[i].posy === 0) { return copy }
                let j = copy.findIndex((each) => { return each.posy + 25 === tiles[i].posy && each.posx === tiles[i].posx })
                copy[i].posy -= 25
                copy[j].posy += 25
                return copy
            })
        }
        if (e.key === 'w') {
            settiles(prev => {
                let copy = [...prev];
                let i = copy.findIndex((each) => { return each.val === '' })

                if (tiles[i].posy === 75) { return copy }
                let j = copy.findIndex((each) => { return each.posy - 25 === tiles[i].posy && each.posx === tiles[i].posx })
                copy[i].posy += 25
                copy[j].posy -= 25
                return copy
            })
        }

    }

    useEffect(() => {
        window.addEventListener('keypress', move)
        return () => { window.removeEventListener('keypress', move) }


    }, [])

    return (
        <div className={styles.main}>
            <p>wasd to move</p>
            <br /><br />
            <div className={styles.board}>
                {
                    tiles.map((each, index) => {
                        return <div className={styles.tile}
                            style={{
                                left: `${each.posx}%`,
                                backgroundColor: each.val === '' && 'black',
                                top: `${each.posy}%`,
                                color: (each.posx / 25) + (4 * (each.posy / 25)) + 1 === each.val && 'green'
                            }}>
                            {each.val}
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Fifteen
