import React from "react";
import styles from './Home.module.css'; // Importa los estilos como un objeto
import Image from '../../assets/img/imagen1.png';

const HomeView = () => {
  return (
    <>
      <section className={styles.home}>
        <div className={`${styles.row} container`}>
          <div className={styles.column}>
            <h2>BIENVENIDOS A WELTSITE</h2>
            <p>
              ¡Bienvenidos a Weltsite! Somos una página para estudiantes de 3ro y
              4to del Colegio San Alberto Magno. Aquí encontrarás recursos divertidos
              y lecciones sobre ciencias sociales como historia, geografía y democracia.
              Únete, participa en actividades y juegos didácticos para mejorar tus conocimientos.
              ¡Aprende y diviértete en Weltsite!
            </p>
            <div className={styles.buttons}>
              <button className={styles.btn}>Read More</button>
              <button className={styles.btn}>Contact Us</button>
            </div>
          </div>
          <div className={styles.column}>
            <img
              src={Image}
              alt="heroImg"
              className={styles.hero_img}
            />
          </div>
        </div>
        
      </section>
    </>
  );
};

export default HomeView;
