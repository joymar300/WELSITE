import React from 'react';
import styles from './clases.module.css';
import Numero3 from '../../assets/img/numero3.png';
import Numero4 from '../../assets/img/numero4.png';

const ClasesComponent = () => {
  return (
    <>
      <section className={styles.cursos} id="cursos">
        <div className={styles.title}>
          <h2 className={styles['section-title']}>Escoge tu Curso</h2>
        </div>
        <div className={styles.content}>
          <div className={`${styles.column} ${styles['col-left']} ${styles.reveal}`}>
            <div className={styles['img-card']}>
              <img src={Numero3} alt="" />
            </div>
          </div>
          <div className={`${styles.column} ${styles['col-right']} ${styles.reveal}`}>
            <h2 className={styles['content-title']}>CONTENIDO PARA 3°</h2>
            <p className={styles['paragraph-text']}>
              ¡Bienvenido al curso de 3ro en Weltsite! Explora las ciencias sociales básicas con
              énfasis en geografía e historia. Nuestras clases te llevarán en un emocionante viaje de aprendizaje. Descubre
              culturas, eventos históricos y la diversidad de nuestro planeta. Además, disfruta de recursos complementarios
              y sumérgete en un mundo de conocimiento en Weltsite. ¡Aprende de manera divertida y enriquecedora en tercer
              grado!
            </p>
            <a href="../contenidos/contenido3/contenido3.html" className={styles.btn}>
              Acceder al Contenido
            </a>
          </div>
        </div>
      </section>

      <hr className={styles['separator-line']} />

      <section className={styles.cursos} id="cursos">
        <div className={styles.content}>
          <div className={`${styles.column} ${styles['col-left']} ${styles.reveal}`}>
            <div className={styles['img-card']}>
              <img src={Numero4} alt="" />
            </div>
          </div>
          <div className={`${styles.column} ${styles['col-right']} ${styles.reveal}`}>
            <h2 className={styles['content-title']}>CONTENIDO PARA 4°</h2>
            <p className={styles['paragraph-text']}>
              ¡Bienvenido al curso de 4to en Weltsite! Explora temas avanzados en geografía e
              historia y amplía tu comprensión del mundo. A través de clases detalladas, adéntrate en conceptos fascinantes
              y enriquecedores. Prepárate para un emocionante viaje de aprendizaje en 4to grado en Weltsite. ¡Estoy aquí
              para ayudarte en cada paso del camino!
            </p>
            <a href="../contenidos/contenido4/Contenido4.html" className={styles.btn}>
              Acceder al Contenido
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default ClasesComponent;

