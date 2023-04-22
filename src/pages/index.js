import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <h1 style={{textAlign:'center',margin:'5%',fontSize:'300%'}}>NITW-EBAY</h1>
      <div className={styles.box}>
        <br></br>
        <h1 style={{textAlign:'center'}}>Sign Up</h1>
        <br></br>
        <form action='/otp' method='POST'>
        <div style={{marginLeft:'5%',display:'grid'}}>
          <label for='name'><h2>Name</h2></label>
          <input className={styles.input} type='text' placeholder='Enter Name' name='name' required></input>
        
          <label for='mailId'><h2>College Mail Id</h2></label>
          <input className={styles.input} type='email' placeholder='Enter Mail Id' name='mailId' required></input>
          <button className={styles.button}>Send OTP</button>
          <a href='/signIn' style={{textAlign:'center'}}>Already have an account?</a>
        </div>
        </form>
        
      </div>
    </div> 

      )
}
