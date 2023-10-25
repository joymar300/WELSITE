import React, { useState, useEffect } from "react";
import styles from './Home.module.css';
import homeLogo from '../../assets/images/planet.webp';
import { RiArrowDownSFill } from 'react-icons/ri';
import { SliderHome } from "../../components/SliderHome/SliderHome";
import ModalButton from "../../components/modal/modal";
import DepartmentSlider from "../../components/slidercolombia/slidercolombia";

const HomeView = () => {

  return (
    <>
      <section className={styles.homepage} id="home">
        <div className={styles.content}>
          <div className={styles.text}>
            <h1 >BIENVENIDOS </h1>
            <h2 >A WELTSITE</h2>
            <p>
             Somos una página para estudiantes de 3ro y 4to del Colegio San Alberto Magno...
            </p>
          </div>
          <img className={styles.homeLogo} src={homeLogo} alt="Planet" />
          <div className={styles.buttons}>
            {/* Tus botones aquí */}
          </div>
        </div>
      </section>

     
      <DepartmentSlider/>
      <ModalButton contentTitle={'Seré su guia en esta página'}/>

     
    </>
  );
};

export default HomeView;
