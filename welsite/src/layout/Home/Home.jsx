import React from "react";
import styles from './Home.module.css'; // Importa los estilos como un objeto
import Logo from '../../assets/img/zorro.png';
import ClasesComponent from "../Clases/Clases";
import Card from "../Contenido3/Contenido3";
import { Link } from 'react-router-dom';

const HomeView = () => {
  return (
    <>
      <section className={styles.homepage} id="home">
      <div className={styles.content}>
        <div className={styles.text}>
          <h1>BIENVENIDOS A WELTSITE</h1>
          <p>
          ¡Bienvenidos a Weltsite! Somos una página para estudiantes de 3ro y 4to del Colegio San Alberto Magno. <br/>Aquí encontrarás recursos divertidos y lecciones sobre ciencias sociales como historia, geografía y democracia.<br/>Únete, participa en actividades y juegos didácticos para mejorar tus conocimientos.<strong>¡Aprende y diviértete en Weltsite!</strong> </p>
        </div>
        <div className={styles.buttons}>

        <Link className={styles.btn} to="/contenido3"> {/* Usa Link en lugar de <a> */}
              Contenido 3
            </Link>
            <Link className={styles.btn} to="/contenido3"> {/* Usa Link en lugar de <a> */}
              Contenido 4
            </Link>

        </div>
      </div>
    </section>
    </>
  );
};

export default HomeView;
