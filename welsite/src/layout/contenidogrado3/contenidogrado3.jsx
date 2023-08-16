import React from 'react';
import styles from './contenidogrado3.module.css'; // Importa los estilos del módulo CSS

import { Link } from 'react-router-dom';

const Contenidogrado3 = () => {
  return (
    <div>
    <div className={styles.inicio}>
        <div className={styles.titulo}>
        <h2>Elige tu tema </h2>
        </div>
      </div>
    <div className={styles.container}>
    <div className={styles.tarjeta}>
      <div className={styles.contenido}>
        <div className={styles.ladoIzq}>
          <div className={styles.titulocard}>
            <h2 className={styles.titulo}>Los Continentes</h2>
          </div>
          <div className={styles.cuerpo}>
            <p>
            Los continentes son las grandes extensiones de tierra que cubren nuestro planeta Tierra. Imagina que la Tierra es un enorme rompecabezas y los continentes son las piezas que encajan juntas. Hay siete continentes en total. ¡Vamos a conocerlos!
            </p>
            <Link className={styles.btn} to="/clases/contenido3/continentes"> {/* Usa Link en lugar de <a> */}
            Acceder al Contenido
            </Link>
          </div>
        </div>
        {/* <div className={styles.ladoDer}>
          <img src={gato} alt="" srcset="" />
        </div> */}
      </div>
    </div>
    <div className={styles.tarjeta}>
      <div className={styles.contenido}>
        <div className={styles.ladoIzq}>
          <div className={styles.titulocard}>
            <h2 className={styles.titulo}>¿Qué son océanos?</h2>
          </div>
          <div className={styles.cuerpo}>
            <p>
            Los océanos son como enormes lagos de agua salada que cubren gran parte de la Tierra. Imagina que la Tierra es como una gran esfera y los océanos son como charcos de agua gigantes que se extienden por todo su superficie. Hay cinco océanos en total. ¡Vamos a conocerlos!
            </p>
            <Link className={styles.btn} to="/contenido4"> {/* Usa Link en lugar de <a> */}
            Acceder al Contenido
            </Link>
          </div>
        </div>
        {/* <div className={styles.ladoDer}>
          <img src={dino} alt="" srcset="" />
        </div> */}
        
      </div>
    </div>
   
    </div>
    </div>
  );
};

export default Contenidogrado3;