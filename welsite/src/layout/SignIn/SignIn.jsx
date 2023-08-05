import React from 'react';
import styles from './signin.module.css'; // Asegúrate de tener la ruta correcta al archivo CSS.
import {BsPersonFill} from 'react-icons/bs'
import {RiLockPasswordFill} from 'react-icons/ri'
import Logo from '../../assets/img/LOGOCOLSAM.png';

const SignIn = () => {
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
              <input type="text" placeholder="Email or Phone" required/>
            </div>
            <div className={styles.row}>
              <i><RiLockPasswordFill/></i>
              <input type="password" placeholder="Password" required/>
            </div>
            <div className={styles.pass}><a href="#">Forgot password?</a></div>
            <div className={`${styles.row} ${styles.button}`}>
              <input type="submit" value="Login"/>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;

