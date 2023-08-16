import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import { SliderHome } from './components/SliderHome/SliderHome';

function App() {
  return (
    <BrowserRouter>
      <div className={styles.container}>
        {/* Renderiza la Navbar fuera de las rutas */}
        <Navbar />

        <div className={styles.content}>
          {/* Contenido principal */}
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/clases" element={<Clases />} />
            <Route path="/signin" element={<CenteredSignIn />} />
            <Route path="*" element={<Error404 />} />
            <Route path='/creadores' element={<Creadores/>} />
            <Route path="/contenido3" element={<Contenido3/>} />
            <Route path='/contenido4' element={<Contenido4/>}/>
            <Route path="/register" element={<Register />} />
            <Route path='/juegos' element={<Juegos/>}/>
            <Route path='/SliderHome' element={<SliderHome/>}/>
          </Routes>
        </div>
        <Footer className={styles.footer} /> 
      </div>
    </BrowserRouter>
  );
}

export default App;

// Nuevo componente para centrar el SignIn
function CenteredSignIn() {
  return (
    <div className={styles['centered-content']}>
      <SignIn />
    </div>
  );
}





