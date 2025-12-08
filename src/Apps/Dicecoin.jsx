import { useState } from 'react'
import styles from '../css/dicecoin.module.css'
const Dicecoin = () => {
    const [spinning, setspinning] = useState(false)
    const [spintime, setspintime] = useState(0)
    const [rolling, setrolling] = useState(false)
    const [rolltime, setrolltime] = useState(0)

    function spin() {
        setspintime((Math.random() * 100) % 5)
        setspinning(true)
    }
    function roll() {
        setrolltime((Math.random() * 100) % 5)
        setrolling(true)
    }

    return (
        <div className={styles.main}>
            <div className="left">
                <h5 className={styles.hint}>*click to roll</h5>
                <br /><br /><br /><br />
                <div
                    className={styles.dice}
                    onClick={roll}
                    style={{
                        transform: rolling && `rotateX(${90 * (Math.floor(Math.random() * 10))}deg) rotateY(${90 * (Math.floor(Math.random() * 10))}deg)`,
                        transitionDuration: `${rolltime}s`
                    }}
                >
                    <div className={`${styles.side} ${styles.one}`}>1</div>
                    <div className={`${styles.side} ${styles.two}`}>2</div>
                    <div className={`${styles.side} ${styles.three}`}>3</div>
                    <div className={`${styles.side} ${styles.four}`}>4</div>
                    <div className={`${styles.side} ${styles.five}`}>5</div>
                    <div className={`${styles.side} ${styles.six}`}>6</div>
                </div>
            </div>
            <div className={styles.line}></div>
            <div className={styles.right}>
                <h5 className={styles.hint}>*click to spin</h5>
                <br /><br /><br />
                <div
                    className={styles.coin}
                    onClick={spin}
                    style={{ transform: spinning && `rotateY(${180 * (Math.floor(Math.random() * 10))}deg)`, transitionDuration: `${spintime}s` }}
                >
                    <div className={styles.head}>h</div>
                    <div className={styles.tail}>t</div>
                </div>
            </div>
        </div >
    )
}

export default Dicecoin