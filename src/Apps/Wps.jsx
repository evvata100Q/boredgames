import { useEffect, useRef, useState } from 'react'
import styles from '../css/wps.module.css'
let words = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.Illo rem nostrum praesentium ipsum perspiciatis libero doloremque, amet accusantium eius.Adipisci expedita ad aspernatur, nobis blanditiis ullam sed provident officia culpa error consequatur velit corrupti.Exercitationem soluta iure asperiores natus reprehenderit in nisi omnis blanditiis accusamus veniam nam, quibusdam sit itaque.'.split('')
const Wps = () => {
    const secsref = useRef(null)
    const [i, seti] = useState(0)
    const [secs, setsecs] = useState(0)
    const [para, setpara] = useState(words.map(char => { return { value: char, stat: null } }))

    function setstates(e) {
        setpara(prev => {
            let copy = [...prev]
            if (e.key === para[i].value) {
                copy[i].stat = true
            }
            else if (e.key === 'Enter') {
                copy[i - 1].stat = null
            }
            else {
                copy[i].stat = false
            }
            return copy
        })
        seti(prev => {
            return e.key === 'Enter' ? prev - 1 : prev + 1
        })
    }
    function typed(e) {
        if (secsref.current === null) {
            secsref.current = setInterval(() => {
                setsecs(prev => prev + 1)
            }, 1000);
            setstates(e)
        }
        else {
            setstates(e)
        }

    }
    function reset() {
        secsref.current = null
        seti(0)
        setsecs(0)
        setpara(words.map(char => { return { value: char, stat: null } }))
    }

    function correcttypes() {
        return para.reduce((acc, each) => acc + (each.stat === true ? 1 : 0), 0)
    }

    useEffect(() => {
        window.addEventListener('keypress', typed)
        if (secs === 10) {
            window.removeEventListener('keypress', typed)
        }
        return () => { window.removeEventListener('keypress', typed) }


    }, [i])

    if (secs === 10) {
        clearInterval(secsref.current)
    }

    return (
        <div className={styles.main}>
            <h5>*press enter to backspace</h5>
            {
                secs === 0 ? <h5>*type to start</h5> : < p > {secs}</p>

            }
            <br /><br />
            {
                secs === 10 && <div style={{ textAlign: 'center' }}>
                    <p>raw speed: {i / 10} letters/second, speed:{correcttypes() / 10} letters/second</p>
                    <br />
                    <button onClick={reset}>reset</button>
                </div>
            }
            <br /><br />
            <div className={styles.para}>
                {
                    para.map(each => <span
                        style={{
                            textDecoration: each.stat === true ? 'underline' : each.stat === false ? 'underline' : '',
                            textDecorationColor: each.stat === true ? 'green' : each.stat === false ? 'red' : ''
                        }}>
                        {each.value === ' ' ? '\u00A0' : each.value}
                    </span>)
                }
            </div>
        </div >
    )
}

export default Wps

