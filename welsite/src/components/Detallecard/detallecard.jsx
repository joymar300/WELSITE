// DetalleContenido.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './DetalleContenido.module.css';
import BotonAtras from '../ButtonBack/ButtonBack';

const DetalleContenido = () => {
  const location = useLocation();
  const { card } = location.state;

  return (
    <div>
      <div className={styles.inicio}  style={{ backgroundColor: card.color }}>
        <div className={styles.titulo} > 
          <h2>{card.title}</h2>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.detailContainer} >
          <img src={card.imgUrl} alt={card.title} className={styles.image} />
          <div className={styles.textContainer}>
           
            <p className={styles.text}>
              {card.text.split('\n').map((paragraph, index) => (
                <React.Fragment key={index}>
                  {paragraph}
                  <br />
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>
      </div>
      
      <BotonAtras/>
      
    </div>
  );
};

export default DetalleContenido;
