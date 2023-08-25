import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Actualiza las importaciones
import styles from './App.module.css';
import Navbar from './components/navbar/Navbar';
import HomeView from './layout/Home/Home';
import SignIn from './layout/SignIn/SignIn';
import Error404 from './components/Error/Error';
import Clases from './layout/Clases/Clases';
import Juegos from './layout/Juegos/Juegos';
import Footer from './components/Footer/Footer';
import Creadores from './layout/Creadores/Creadores';
import Contenido3 from './layout/Contenido3/Contenido3';
import Contenido4 from './layout/Contenido4/Contenido4';
import Register from './layout/Register/Register';
import Contenido from './layout/Continentes/continentes';
import Contenidogrado3 from './layout/contenidogrado3/contenidogrado3';
import { SliderHome } from './components/SliderHome/SliderHome';
import DetalleContenido from './components/Detallecard/detallecard';


function App() {

  return (
    
    <BrowserRouter>
      <div className={styles.container}>
        <Navbar />
        <div className={styles.content}>
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/clases/*" element={<Clases />} />
            <Route path="/signin" element={<CenteredSignIn />} />
            <Route path="/creadores" element={<Creadores />} />
            <Route path="/clases/contenido3/*" element={<Contenidogrado3 />} />
            <Route path="/contenido4" element={<Contenido4 />} />
            <Route path="/register" element={<Register />} />
            <Route path="/clases/contenido3/continentes" element={<Contenido />} />
            <Route path="/juegos" element={<Juegos />} />
            <Route path="/SliderHome" element={<SliderHome />} />
            <Route path="/clases/contenido/:index" element={<DetalleContenido />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
        <Footer className={styles.footer} /> 
      </div>
    </BrowserRouter>
  );
}

// Nuevo componente para centrar el SignIn
function CenteredSignIn() {
  return (
    <div className={styles['centered-content']}>
      <SignIn />
    </div>
  );
}

export default App;
