// ContenidoCards.js

import React, { useEffect, useState } from 'react';
import styles from './contenidoCards.module.css';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { GrClose } from 'react-icons/gr';
import { AiOutlinePlus } from 'react-icons/ai';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { onAuthStateChanged } from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
} from 'firebase/firestore';
import { auth, db, storage } from '../../config/firebase';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import Card from '../../components/Cards/card';
import BotonAtras from '../../components/ButtonBack/ButtonBack';
import { useLocation, useParams } from 'react-router-dom';
import sonidoBasura from '../../assets/img/basura.mp3';
import Loader from '../../components/Loader/loader';

const ContenidoCards = () => {
  const [isLoading, setIsLoading] = useState(true);
  const audioBasura = new Audio(sonidoBasura);
  const { contenido } = useParams();
  const location = useLocation();
  const { content } = location.state || {};

  const [data, setData] = useState([]);
  const MySwal = withReactContent(Swal);
  const [user, setUser] = useState('');

  useEffect(() => {
    traerContenido()
      .then(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      })
      .catch((error) => {
        console.error('Error al cargar contenido:', error);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      });
  }, []);

  useEffect(() => {
    traerContenido();
    onAuthStateChanged(auth, verificarUser);
  }, []);

  function verificarUser(user) {
    if (user) {
      setUser(user.email);
      console.log(user.email);
    } else {
      setUser('');
      console.log('no hay nadie registrado');
    }
  }

  const crearcontenido = async (gradoCont, contentID) => {
    try {
      const loadingAlert = MySwal.mixin({
        title: 'Creando contenido',
        icon: 'info',
        showConfirmButton: false,
        allowOutsideClick: false,
        didOpen: () => {
          MySwal.showLoading();
        },
      });
      loadingAlert.fire();
      const contRef = doc(db, gradoCont, contentID);
      const docRef = await addDoc(collection(contRef, 'info'), {
        title: newCardData.title,
        text: newCardData.text,
        color: newCardData.color,
        videoUrl: newCardData.videoUrl, // Asegúrate de almacenar la URL del video
      });

      await traerContenido();
      toggleFormModal();
      setNewCardData({
        imageSrc: '',
        title: '',
        text: '',
        color: '',
        videoUrl: '', // Limpia el campo de la URL del video
      });
      MySwal.close();
      Swal.fire({
        title: 'Creación exitosa',
        text: 'El contenido ha sido creado con éxito.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      MySwal.close();
      console.log(err);
      Swal.fire({
        title: 'Error al crear contenido',
        text: err,
        icon: 'error',
        confirmButtonText: 'Cerrar',
      });
    }
  };

  async function traerContenido() {
    const info = [];
    const dataRef = collection(db, contenido, content.id, 'info');
    const q = query(dataRef);
    const queySnapshot = await getDocs(q);
    queySnapshot.forEach((doc) => {
      info.push({ id: doc.id, ...doc.data() });
    });

    console.log(data);
    setData(info);
  }

  const borrarContenido = async (docId, imgId) => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará el contenido permanentemente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        customClass: {
          confirmButton: styles.confirmButton,
        },
        confirmButtonStyle: {
          backgroundColor: 'green',
          color: 'white',
        },
      });

      if (result.isConfirmed) {
        Swal.fire({
          title: 'Eliminando contenido',
          text: 'Procesando la eliminación...',
          icon: 'info',
          showConfirmButton: false,
          allowOutsideClick: false,
        });

        audioBasura.play();

        await deleteDoc(doc(db, contenido, content.id, 'info', docId));

        await traerContenido();
        Swal.fire({
          title: 'Eliminación exitosa',
          text: 'El contenido ha sido eliminado con éxito.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      console.error('Error al eliminar contenido:', err);
      Swal.fire({
        title: 'Error al eliminar contenido',
        text: 'Ha ocurrido un error al eliminar el contenido.',
        icon: 'error',
        confirmButtonText: 'Cerrar',
      });
    }
  };

  const [showCardModal, setShowCardModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const [newCardData, setNewCardData] = useState({
    imageSrc: '',
    title: '',
    text: '',
    color: '',
    videoUrl: '', // Nuevo campo para la URL del video
  });

  const toggleCardModal = (index) => {
    setActiveCardIndex(index);
    setShowCardModal(!showCardModal);
  };

  const toggleFormModal = () => {
    setShowFormModal(!showFormModal);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCard = { ...newCardData };

    setNewCardData({
      imageSrc: '',
      title: '',
      text: '',
      color: '',
      videoUrl: '', // Limpia el campo de la URL del video
    });
    setShowFormModal(false);
  };

  return (
    <div className={styles.total}>
      {isLoading ? (
        <Loader contentTitle={content.title} />
      ) : (
        <>
          <div className={styles.inicio} style={{ backgroundColor: '#00b7ff' }}>
            <div className={styles.titulo}>
              <h2> {content.title}</h2>
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.cardContainer}>
              {data.map((card, index) => (
                <Card
                  key={index}
                  card={card}
                  index={index}
                  user={user}
                  borarContent={borrarContenido}
                  activeCardIndex={activeCardIndex}
                  showCardModal={showCardModal}
                  toggleCardModal={toggleCardModal}
                  tipoContenido={contenido}
                  idcontenido={content.id}
                />
              ))}

              {user ? (
                <button className={styles.float} onClick={toggleFormModal} style={{ border: 'none' }}>
                  <AiOutlinePlus className={styles.myfloat} />
                </button>
              ) : (
                ''
              )}

              {showFormModal && (
                <div className={styles.formModalOverlay}>
                  <div className={styles.formModal}>
                    <div className={styles.formModalContent}>
                      <h2>Agregar Contenido</h2>
                      <form onSubmit={handleSubmit}>
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
                              [{ header: '1' }, { header: '2' }],
                              [{ font: [] }, { size: [] }],
                              [{ list: 'ordered' }, { list: 'bullet' }],
                              ['link', 'image'],
                              ['clean'],
                            ],
                          }}
                          style={{ fontSize: '16px', fontFamily: 'Arial' }}
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

                        <label htmlFor="videoUrl">URL del video de YouTube:</label>
                        <input
                          type="text"
                          id="videoUrl"
                          value={newCardData.videoUrl}
                          onChange={(e) =>
                            setNewCardData({ ...newCardData, videoUrl: e.target.value })
                          }
                        />

                        <button type="button" onClick={toggleFormModal}>
                          Cancelar
                        </button>
                        <button type="submit" onClick={() => crearcontenido(contenido, content.id)}>
                          Guardar
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <BotonAtras />
        </>
      )}
    </div>
  );
};

export default ContenidoCards;
