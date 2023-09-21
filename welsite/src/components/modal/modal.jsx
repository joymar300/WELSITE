import React, { useState, useEffect } from 'react';
import './ModalButton.css';
import oliver from '../../assets/img/oli.png';

// Importa los archivos de sonido
import sonidoEntrada from '../../assets/img/iphone.mp3';
import sonidoSalida from '../../assets/img/salida.mp3';

const ModalButton = ({ contentTitle }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [audioEntrada] = useState(new Audio(sonidoEntrada)); // Sonido al abrir el modal
  const [audioSalida] = useState(new Audio(sonidoSalida)); // Sonido al cerrar el modal

  const closeModal = () => {
    audioSalida.play(); // Reproduce el sonido al cerrar el modal
    setModalIsOpen(false);
  };

  useEffect(() => {
    // Abre el modal automáticamente al cargar la página
    audioEntrada.play(); // Reproduce el sonido al abrir el modal
    setModalIsOpen(true);
  }, []);

  return (
    <div>
      {modalIsOpen && (
        <div className="popup-modal">
          <div className="popup-modal-content">
            <button onClick={closeModal} className="close-modal-button">
              X
            </button>
            <img src={oliver} alt="" srcSet="" width={150} />
            <h2>Hola, soy Oliver</h2>
            <p>{`${contentTitle}`}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalButton;
