import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

import HomeView from './layout/Home/Home';
import SignIn from './layout/SignIn/SignIn';
import Error404 from './components/Error/Error';
import Clases from './layout/Clases/Clases';
import Navbar from './components/navbar/Navbar';
import Register from './layout/Register/Register';

function App() {
  return (
    <BrowserRouter>
      {/* Renderiza la Navbar fuera de las rutas */}
      
      <Navbar />
      <div className="container"> {/* Agrega un contenedor para centrar el contenido */}
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/clases" element={<Clases/>} />
          <Route path="/signin" element={<CenteredSignIn />} />
          <Route path="*" element={<Error404/>} />
          <Route path="/register" element={<Register />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

// Nuevo componente para centrar el SignIn
function CenteredSignIn() {
  return (
    <div className="centered-content">
      <SignIn />
    </div>
  );
}



