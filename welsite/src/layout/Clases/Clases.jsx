import React from 'react';
import styles from './clases.module.css'; // Importa los estilos del módulo CSS
import Numero3 from '../../assets/img/300ppi/numero3.png';
import Numero4 from '../../assets/img/300ppi/numero4.png';
import { Link } from 'react-router-dom';

const ClasesComponent = () => {
  return (
    <div className={styles.container}>
    <div className={styles.tarjeta}>
      <div className={styles.contenido}>
        <div className={styles.ladoIzq}>
          <div className={styles.titulocard}>
            <h2 className={styles.titulo}>Contenido</h2>
            <img src={Numero3}/>
          </div>
          <div className={styles.cuerpo}>
            <p>
            ¡Bienvenido al curso de 3ro en Weltsite! Explora las ciencias sociales básicas con énfasis en geografía e historia. Nuestras clases te llevarán en un emocionante viaje de aprendizaje. Descubre culturas, eventos históricos y la diversidad de nuestro planeta. Además, disfruta de recursos complementarios y sumérgete en un mundo de conocimiento en Weltsite. ¡Aprende de manera divertida y enriquecedora en tercer grado!
            </p>
            <Link className={styles.btn} to="/contenido3"> {/* Usa Link en lugar de <a> */}
            Acceder al Contenido
            </Link>
          </div>
        </div>
        
      </div>
    </div>
    <div className={styles.tarjeta}>
      <div className={styles.contenido}>
        <div className={styles.ladoIzq}>
          <div className={styles.titulocard}>
            <h2 className={styles.titulo}>Contenido</h2>
            <img src={Numero4}/>
          </div>
          <div className={styles.cuerpo}>
            <p>
            ¡Bienvenido al curso de 4to en Weltsite! Explora temas avanzados en geografía e historia y amplía tu comprensión del mundo. A través de clases detalladas, adéntrate en conceptos fascinantes y enriquecedores. Prepárate para un emocionante viaje de aprendizaje en 4to grado en Weltsite. ¡Estoy aquí para ayudarte en cada paso del camino!
            </p>
            <Link className={styles.btn} to="/contenido4"> {/* Usa Link en lugar de <a> */}
            Acceder al Contenido
            </Link>
          </div>
        </div>
        
      </div>
    </div>
   
    </div>
  );
};

export default ClasesComponent;


