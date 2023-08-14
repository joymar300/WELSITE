import React, { useState } from "react";
import styles from './Home.module.css'; // Importa los estilos como un objeto
import Logo from '../../assets/img/zorro.png';
import homeLogo from '../../assets/img/oli.png';
import dino from '../../assets/img/Dinosaurio.png';
import ClasesComponent from "../Clases/Clases";
import Card from "../Contenido3/Contenido3";
import { Link } from 'react-router-dom';
import { SliderHome } from "../../components/SliderHome/SliderHome";

const HomeView = () => {
  const items = [
    {
      title: 'Contenido 3',
      description: 'Aprende y juega con nuestro intersenate contenido',
      imageUrl: dino,
      urlNav: '/contenido3',
    },
    {
      title: 'Contenido 4',
      description: 'Aprende y juega con nuestro intersenate contenido',
      imageUrl: Logo,
      urlNav: '/contenido4'
    },
    // ... Add more items as needed
  ];
  const [selectedRadio, setSelectedRadio] = useState('tap-1');
  return (
    <>
      <section className={styles.homepage} id="home">
        <div className={styles.content}>
         <img src={homeLogo}></img> 
          <div className={styles.text}>
            <h1>BIENVENIDOS A WELTSITE</h1>
            <p>
            ¡Bienvenidos a Weltsite! Somos una página para estudiantes de 3ro y 4to del Colegio San Alberto Magno. <br/>Aquí encontrarás recursos divertidos y lecciones sobre ciencias sociales como historia, geografía y democracia.<br/>Únete, participa en actividades y juegos didácticos para mejorar tus conocimientos.<strong>¡Aprende y diviértete en Weltsite!</strong> </p>
          </div>
          <div className={styles.buttons}>

          {/* <Link className={styles.btn} to="/contenido3"> 
                Contenido 3
              </Link>
              <Link className={styles.btn} to="/contenido4"> 
                Contenido 4
              </Link> */}

          </div>
        </div>
    </section>
    {/* <div className={styles.homepage} >

    </div> */}
      <SliderHome items={items}></SliderHome>  
    

    </>
  );
};

export default HomeView;
