import React, { useState } from "react";
import styles from './Home.module.css'; // Importa los estilos como un objeto
import homeLogo from '../../assets/img/oli.png';
import Logo from '../../assets/img/zorro.png';
import dino from '../../assets/img/Dinosaurio.png';
import ClasesComponent from "../Clases/Clases";
import Card from "../Contenido3/Contenido3";
import { Link } from 'react-router-dom';
import { SliderHome } from "../../components/SliderHome/SliderHome";
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import {RiArrowDownSFill} from 'react-icons/ri';  


const HomeView = () => {
  




  return (
    <>
      <section className={styles.homepage} id="home">
        <div className={styles.content}>
         <img className={styles.homeLogo} src={homeLogo}></img> 
          <div className={styles.text}>
            <h1>BIENVENIDOS A WELTSITE</h1>
            <p>
            ¡Bienvenidos a Weltsite! Somos una página para estudiantes de 3ro y 4to del Colegio San Alberto Magno. <br/>Aquí encontrarás recursos divertidos y lecciones sobre ciencias sociales como historia, geografía y democracia.<br/>Únete, participa en actividades y juegos didácticos para mejorar tus conocimientos.<strong>¡Aprende y diviértete en Weltsite!</strong> </p>
          </div>
          <ScrollLink to="SliderHome" className={styles.sliderButton} smooth={true} duration={800}>
              <RiArrowDownSFill/>
            </ScrollLink>
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

    <div id="SliderHome"> 
          <SliderHome ></SliderHome>  
    </div>
    
    

    </>
  );
};

export default HomeView;
