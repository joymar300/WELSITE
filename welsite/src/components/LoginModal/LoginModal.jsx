import React from 'react';
import { BsPersonFill } from 'react-icons/bs';
import { RiLockPasswordFill } from 'react-icons/ri';
import Logo from '../../assets/img/LOGOCOLSAM.png';
import styles from './LoginModal.module.css'; // Estilos para el modal

const LoginModal = ({ closeLoginModal }) => {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <span className={styles.closeButton} onClick={closeLoginModal}>
          &times;
        </span>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={styles.title}>
              <span>Login Form</span>
              <img src={Logo} alt="" srcSet="" />
            </div>
            <form action="#">
              <div className={styles.row}>
                <i>
                  <BsPersonFill />
                </i>
                <input type="text" placeholder="Email or Phone" required />
              </div>
              <div className={styles.row}>
                <i>
                  <RiLockPasswordFill />
                </i>
                <input type="password" placeholder="Password" required />
              </div>
              <div className={`${styles.row} ${styles.button}`}>
                <input type="submit" value="Login" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
