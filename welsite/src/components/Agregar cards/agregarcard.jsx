import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import ReactQuill from 'react-quill'; // Importa el editor de texto enriquecido
import 'react-quill/dist/quill.snow.css'; // Importa el estilo del editor
import styles from './agregarcard.module.css';

const AgregarCards = ({ onSubmit }) => {
  const [showFormModal, setShowFormModal] = useState(false);
  const [newCardData, setNewCardData] = useState({
    imageSrc: '',
    title: '',
    text: '',
    color: '',
  });

  const toggleFormModal = () => {
    setShowFormModal(!showFormModal);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newCardData);
    setNewCardData({
      imageSrc: '',
      title: '',
      text: '',
      color: '',
    });
    setShowFormModal(false);
  };

  return (
    <div>
      <button href="#" className={styles.float} onClick={toggleFormModal}>
        <AiOutlinePlus className={styles.myfloat} />
      </button>

      {showFormModal && (
        <div className={styles.formModalOverlay}>
          <div className={styles.formModal}>
            <div className={styles.formModalContent}>
              <h2>Agregar Contenido</h2>
              <form onSubmit={handleSubmit}>
                <label htmlFor="image">Imagen:</label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={(e) =>
                    setNewCardData({
                      ...newCardData,
                      imageSrc: URL.createObjectURL(e.target.files[0]),
                    })
                  }
                />

                <label htmlFor="title">Título:</label>
                <input
                  type="text"
                  id="title"
                  value={newCardData.title}
                  onChange={(e) =>
                    setNewCardData({ ...newCardData, title: e.target.value })
                  }
                />

                <label htmlFor="text">Texto:</label>
                <ReactQuill
                  value={newCardData.text}
                  onChange={(value) => setNewCardData({ ...newCardData, text: value })}
                  modules={{
                    toolbar: [
                      [{ 'header': '1'}, {'header': '2'}, {'font': []}],
                      [{'list': 'ordered'}, {'list': 'bullet'}],
                      ['link', 'image'],
                      ['clean']
                    ]
                  }}
                />

                <label htmlFor="color">Color:</label>
                <input
                  type="color"
                  id="color"
                  value={newCardData.color}
                  onChange={(e) =>
                    setNewCardData({ ...newCardData, color: e.target.value })
                  }
                  style={{
                    border: 'none',
                    outline: 'none',
                    padding: '2px',
                    boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)',
                    cursor: 'pointer',
                  }}
                />

                <button type="button" onClick={toggleFormModal}>
                  Cancelar
                </button>
                <button type="submit">Guardar</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgregarCards;
