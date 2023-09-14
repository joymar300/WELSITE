import React, { useState } from 'react';
import oliver from '../../assets/img/oli.png';
import styles from './BotonPrender.module.css'

function BotonPrender() {
  const [mostrarModal, setMostrarModal] = useState(false);

  const mostrarMensajeClick = () => {
    console.log('Mostrar modal');
    setMostrarModal(true);
  };
  
  const cerrarModal = () => {
    console.log('Cerrar modal');
    setMostrarModal(false);
  };

  return (
    <div>
      <button onClick={mostrarMensajeClick}>Mostrar Mensaje</button>
      {mostrarModal && (
        <div className={styles.modal}> {/* Usa la clase del módulo CSS */}
          <div className={styles.modalContent}> {/* Usa la clase del módulo CSS */}
            <span className={styles.closeButton} onClick={cerrarModal}>
              &times;
            </span>
            <img src={oliver} alt="Imagen" />
            <p>Vamos a prender juntos en React</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default BotonPrender;
