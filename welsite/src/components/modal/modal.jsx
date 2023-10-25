import React, { useState, useEffect } from 'react';
import './ModalButton.css';
import oliver from '../../assets/img/oli.png';

// Importa los archivos de sonido
import sonidoEntrada from '../../assets/img/iphone.mp3';
import sonidoSalida from '../../assets/img/salida.mp3';

const ModalButton = ({ contentTitle }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  const closeModal = () => {
     // Reproduce el sonido al cerrar el modal
    setModalIsOpen(false);
  };

  useEffect(() => {
    // Abre el modal automáticamente al cargar la página
    // Reproduce el sonido al abrir el modal
    setModalIsOpen(true);

    // Cierra el modal después de 6 segundos
    const timeout = setTimeout(() => {
      closeModal();
    }, 6000);

    return () => {
      // Limpia el timeout si el componente se desmonta antes de que se cierre el modal automáticamente
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <div>
        {modalIsOpen && (
          <div className="notification">
            <p>Hola, soy Oliver😺{`${contentTitle}`} </p>
            <span className="notification-progress"></span>
          </div>
         
        )}
      </div>
    </>
  );
};

export default ModalButton;
