import styles from '../styles/Otp.module.css'

export default function Otp(){
    
    return(
        <div className={styles.container}>
            <h1 style={{textAlign:'center', marginTop:'100px', marginBottom:'50px'}}>Enter OTP</h1>
                <form action='http://localhost:3000/main' method='POST'>
                <div className={styles.userInput}>

                
                <input className={styles.input} type="text" id='1st' maxlength="1" required></input>
                <input className={styles.input} type="text" id='sec' maxlength="1" required onkeyup="clickEvent(this,'third')"></input>
                <input className={styles.input} type="text" id='third' maxlength="1" required onkeyup="clickEvent(this,'fourth')"></input>
                <input className={styles.input} type="text" id='fourth' maxlength="1" required></input>
                
                </div>
                <div className={styles.userInput}>
                <button className={styles.button} >Next</button>
                </div>
                </form>
                
                
        </div>
    )
};