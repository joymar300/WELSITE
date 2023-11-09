import React, { useState, useEffect } from 'react';
import './ModalButton.css';
import gato from '../../assets/img/oliver3.webp'
const ModalButton = ({ contentTitle }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    setModalIsOpen(true);
    const timeout = setTimeout(() => {
      closeModal();
    }, 6000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <>
      <div>
        {modalIsOpen && (
          <div className="notification">
            <img src={gato}  width={150}></img>
            <p>Hola, soy Oliver, {`${contentTitle}`} </p>
            <span className="notification-progress"></span>
          </div>
         
        )}
      </div>
    </>
  );
};
export default ModalButton;
