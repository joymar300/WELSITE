import React, { useEffect, useState } from 'react';
import styles from './signin.module.css'; // Asegúrate de tener la ruta correcta al archivo CSS.
import {BsPersonFill} from 'react-icons/bs'
import {RiLockPasswordFill} from 'react-icons/ri'
import Logo from '../../assets/img/LOGOCOLSAM.png';
import { auth } from '../../config/firebase';
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';

  const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] =useState("");
    const [password, setPassword]= useState("");
    const iniciar = async ()=>{
      try{
        await signInWithEmailAndPassword(auth,email,password);
        navigate("/");
       
      } catch (err){
        console.log(err)
      }
  
  
    };



    
    return (
      <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.title}>
            <span>Login Form</span>
            <img src={Logo} alt="" srcset="" />
            </div>
          <form action="#">
            <div className={styles.row}>
             <i><BsPersonFill/></i> 
              <input type="text" placeholder="Email or Phone" onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div className={styles.row}>
              <i><RiLockPasswordFill/></i>
              <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <div className={styles.pass}><a href="#">Forgot password?</a></div>
            <div className={`${styles.row} ${styles.button}`}>
              <input type="button" onClick={iniciar} value="Login"/>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;

