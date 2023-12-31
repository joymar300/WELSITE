import React from 'react';
import { Link } from 'react-router-dom'; // Importar el componente Link
import styles from './Error404.module.css';
// import dino from '../../assets/img/dinosaurio.webp'
import gato from '../../assets/img/dibujokid.png'

const ErrorPage = () => {
  return (
    <div className={styles['error-page-container']}>
      <div className={styles.content}>
        <img src={gato} width={150}/>
        <h4 data-text="Opps! Page not found" className={styles.errorText}>
          Opps! Page not found
        </h4>
        <p className={styles.errorMessage}>
          Sorry, the page you're looking for doesn't exist. If you think something is broken, report a problem.
        </p>
        <div className={styles.btns}>
          <Link to="/">return home</Link> {/* Usar Link en lugar de <a> */}
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;


