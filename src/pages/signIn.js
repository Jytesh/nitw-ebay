import styles from '../styles/SignIn.module.css'

export default function SignIn(){

    return(
        <div>
      <h1 style={{textAlign:'center',margin:'5%',fontSize:'300%'}}>NITW-EBAY</h1>
      <div className={styles.box}>
        <br></br>
        <h1 style={{textAlign:'center'}}>Sign In</h1>
        <br></br>
        <form action='/otp' method='POST'>
        <div style={{marginLeft:'5%',display:'grid'}}>
        
          <label for='mailId'><h2>College Mail Id</h2></label>
          <input className={styles.input} type='email' placeholder='Enter Mail Id' name='mailId' required></input>
          <button className={styles.button}>Send OTP</button>
          <a href='/' style={{textAlign:'center'}}>Go Back</a>
        </div>
        </form>
        
      </div>
    </div>
    )

}