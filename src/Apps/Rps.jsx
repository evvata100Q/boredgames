import { useEffect, useState } from 'react'
import styles from '../css/rps.module.css'
let rockpng = './pics/rock.png'
let paperpng = './pics/paper.png'
let scissorspng = './pics/scissors.png'
let images = [rockpng, paperpng, scissorspng]


const Rps = () => {
    const [pick, setpick] = useState(0)
    const [pc, setpc] = useState(0)
    const [cpuc, setcpuc] = useState(0)
    let [ps, setps] = useState(0)
    let [cpus, setcpus] = useState(0)
    const [ingame, setingame] = useState(false)

    function start() {
        setingame(true)
        setTimeout(() => {
            setingame(false)
            setpc(pick)
            setcpuc(Math.floor(Math.random() * images.length))
        }, 1500);
    }

    useEffect(() => {
        if (!ingame) {
            if (pc === cpuc) { return }
            if (pc === 0) {
                if (cpuc === 1) {
                    setcpus(prev => prev + 1)
                }
                else {
                    setps(prev => prev + 1)
                }
            }
            else if (pc === 1) {
                if (cpuc === 0) {
                    setps(prev => prev + 1)
                }
                else {
                    setcpus(prev => prev + 1)
                }
            }
            else {
                if (cpuc === 0) {
                    setcpus(prev => prev + 1)
                }
                else {
                    setps(prev => prev + 1)
                }
            }
        }
    }, [ingame])

    function reset() {
        setcpus(0); setps(0); setpick(0); setcpuc(0); setpc(0)
    }

    return (
        <div className={styles.main}>
            {ps + cpus > 0 && <button onClick={reset}>reset</button>}
            <button onClick={start} disabled={ingame}>play</button>
            <p>{ps}-{cpus}</p>
            <div className={styles.board}>
                <div className={styles.playerchoice}>
                    <img
                        src={ingame ? images[0] : images[pc]}
                        className={`${ingame ? styles.animate : ''} ${styles.image}`} />
                </div>
                <div className={styles.cpuchoice}>
                    <img
                        src={ingame ? images[0] : images[cpuc]}
                        className={`${ingame ? styles.animate : ''} ${styles.image}`} />
                </div>

                {
                    <div className={styles.pick}>
                        {
                            images.map((each, index) => <img className={styles.image} style={{ border: index === pick && '2px solid black' }} onClick={() => { setpick(index) }} src={each} />)
                        }
                    </div>
                }
            </div>
        </div>
    )
}
export default Rps