// DetalleContenido.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './DetalleContenido.module.css';

const DetalleContenido = () => {
  const location = useLocation();
  const { card } = location.state;

  return (
    <div className={styles.container}>
    <div className={styles.detailContainer}>
      <div className={styles.textContainer}>
        <h2 className={styles.title}>{card.title}</h2>
        <p className={styles.text}>
            {card.text.split('\n').map((paragraph, index) => (
              <React.Fragment key={index}>
                {paragraph}
                <br />
              </React.Fragment>
            ))}
          </p>
      </div>
      <img src={card.imgUrl} alt={card.title} className={styles.image} />
    </div>
    </div>
  );
};

export default DetalleContenido;
