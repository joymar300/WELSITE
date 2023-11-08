import React, { useState, useEffect } from 'react';
import './ModalButton.css';
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
            <p>Hola, soy Oliver🦊{`${contentTitle}`} </p>
            <span className="notification-progress"></span>
          </div>
         
        )}
      </div>
    </>
  );
};
export default ModalButton;
