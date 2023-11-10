import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import './slidercolombia.css';
import oliver from '../../assets/img/Oliver3.png';
Modal.setAppElement("#root");
const DepartmentSlider = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const apiOptions = ["TouristicAttraction", "President"]; // Nombres de las dos API

  const getRandomApi = () => {
    // Elige aleatoriamente entre las dos API
    const randomIndex = Math.floor(Math.random() * apiOptions.length);
    return apiOptions[randomIndex];
  };

  const startSpinning = () => {
    if (spinning) {
      return;
    }

    setSpinning(true);

    const coneElement = document.querySelector(".container-cone");
    coneElement.classList.add("rotate-animation");

    setTimeout(() => {
      coneElement.classList.remove("rotate-animation");

      const selectedApi = getRandomApi();

      // Llamada a la API seleccionada para obtener datos aleatorios
      fetch(`https://api-colombia.com/api/v1/${selectedApi}`)
        .then((response) => response.json())
        .then((data) => {
          const randomIndex = Math.floor(Math.random() * data.length);
          setSelectedItem(data[randomIndex]);
          setShowModal(true);
          setSpinning(false);
        })
        .catch((error) => console.error(error));
    }, 2000);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setShowModal(false);
  };

  return (
    <div className="contenedor-modal">
      <div className={`rulette-container ${spinning ? "spinning" : ""}`}>
        <div className="container-element">
          <div className="container-title">
            <p>¡Dale Clic!</p>
          </div>
          <div className="contain-arrow">
            <div className="arrow"></div>
          </div>
          <div className="contain-rulette" onClick={startSpinning} disabled={spinning}>
            <div className="container-cone">
              <div className="circle"></div>
              <div className="cone1 size"></div>
              <div className="cone2 size"></div>
              <div className="cone3 size"></div>
              <div className="cone4 size"></div>
              <div className="cone5 size"></div>
              <div className="cone6 size"></div>
              <div className="cone7 size"></div>
              <div className="cone8 size"></div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="Información al azar"
        className="modal"
        overlayClassName="modal-overlay"
        closeTimeoutMS={300}
      >
        <div className="modal-content">
          <button onClick={closeModal} className="close-button">
            X
          </button>
          {selectedItem && (
            <>
              <img src={oliver} alt="" />
              <h3>{selectedItem.name}</h3>
              <p><strong>Descripción: </strong>{selectedItem.description}</p>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default DepartmentSlider;
