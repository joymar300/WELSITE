import React from 'react';
import styles from './clases.module.css'; // Importa los estilos del módulo CSS
import { NavLink, useLocation } from 'react-router-dom'; // Importa useLocation


const ClasesComponent = () => {
  const location = useLocation(); // Obtén la ubicación actual
  return (
    <div>
    <div className={styles.inicio}>
        <div className={styles.titulo}>
        <h2>Elige tu Contenido </h2>
        </div>
      </div>
    <div className={styles.container}>
    <div className={styles.card}>
  <h3 className={styles.heading}>Contenido 3 </h3>
  <div className={styles.overlay}></div>
  <NavLink
                  className={`${styles.cardbtn} ${
                    location.pathname === '/clases/contenido3' ||
                    location.pathname === '/clases'
                      ? styles.active
                      : ''
                  }`}
                  to="/clases/contenido3"
                >
                  Acceder al Contenido
                </NavLink>
</div>
    <div className={styles.card}>
  <h3 className={styles.heading}>Contenido 4 </h3>
  <div className={styles.overlay}></div>
  <NavLink className={styles.cardbtn} to="/contenido4"> {/* Usa Link en lugar de <a> */}
            Acceder al Contenido
            </NavLink>
</div>
   
    </div>
    </div>
  );
};

export default ClasesComponent;


