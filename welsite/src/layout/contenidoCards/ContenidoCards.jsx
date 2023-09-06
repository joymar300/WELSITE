import React, { useEffect, useState } from 'react';
import styles from './contenidoCards.module.css';
import {GrClose} from 'react-icons/gr'
import {AiOutlinePlus} from 'react-icons/ai'
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc } from 'firebase/firestore';
import { auth, db, storage } from '../../config/firebase'
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Card from '../../components/Cards/card';
import BotonAtras from '../../components/ButtonBack/ButtonBack';
import { useLocation, useParams } from 'react-router-dom';
import AgregarCont from '../../components/aregar contenido/agregarCont';



const ContenidoCards = () => {
  const {contenido}= useParams();
  const location = useLocation();
  const { content   } = location.state || {};

  const [data, setData] = useState([]);
  const [dataUrl, setDataUrl] = useState('');
  const MySwal = withReactContent(Swal)
  const [user, setUser]=useState("");


  useEffect(()=>{
    traerContenido()
    onAuthStateChanged(auth, verificarUser)
  },[])

  function verificarUser (user){
    if (user) {
    setUser(user.email)
    console.log(user.email)
    
    
    }else{
      setUser("")
      console.log("no hay nadie registrado")
    }
  
  }
  const crearcontenido = async (gradoCont, contentID)=>{
    try{
      const loadingAlert = MySwal.mixin({
        title: 'Creando contenido',
        icon: 'info',
        showConfirmButton: false,
        allowOutsideClick: false,
        didOpen: () => {
          MySwal.showLoading(); // Muestra el indicador de progreso
        },
      });
      loadingAlert.fire();
      const contRef = doc(db, gradoCont, contentID)
      const docRef = await addDoc(collection(contRef, "info"), {
        imgUrl:'',
        title: newCardData.title,
        text: newCardData.text,
        color: newCardData.color,
      });

      const folder =  ref(storage,`${gradoCont}/imgCont/${docRef.id}`)
      await uploadBytes(folder,newCardData.imageSrc);
      const link = await getDownloadURL(folder)
      await updateDoc(doc(contRef, "info", docRef.id), {
        imgUrl: link
      })
      await traerContenido()
      toggleFormModal()
      setNewCardData({
        imageSrc: '',
        title: '',
        text: '',
        color:'',
      });
      MySwal.close();
      Swal.fire({
        title: 'Creación exitosa',
        text: 'El contenido ha sido creado con éxito.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });

    } catch (err){
      MySwal.close();
      console.log(err)
      Swal.fire({
        title: 'Error al crear contenido',
        text: err,
        icon: 'error',
        confirmButtonText: 'Cerrar',
      });
    }
    
    
  };

  async function traerContenido() {
    
  const info = []
    const dataRef = collection(db,contenido,content.id,'info');
    const q = query(dataRef);
    const queySnapshot = await getDocs(q);
    queySnapshot.forEach((doc)=>{
      info.push({ id: doc.id, ...doc.data() });
    });
    
    console.log(data)
    setData(info);
  }

  const borrarContenido = async(docId, imgId)=>{
    try{
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará el contenido permanentemente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        customClass: {
          confirmButton: styles.confirmButton, // Asigna la clase de estilo definida en contenido3.module.css
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
        await deleteDoc(doc(db,contenido, content.id, 'info', docId  ),)
        const borrarimg = ref(storage, imgId)
        deleteObject(borrarimg).then(()=>{
          console.log("imagen borrada");
          
        }).catch((err)=>{
          console.log("error al borrar imagen" + err);
          
        })
    
        await traerContenido()
        Swal.fire({
          title: 'Eliminación exitosa',
          text: 'El contenido ha sido eliminado con éxito.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });
      }

    } catch(err){
      console.error('Error al eliminar contenido:', err);
      Swal.fire({
        title: 'Error al eliminar contenido',
        text: 'Ha ocurrido un error al eliminar el contenido.',
        icon: 'error',
        confirmButtonText: 'Cerrar',
      });
    }
  }

  const [showCardModal, setShowCardModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const [newCardData, setNewCardData] = useState({
    imageSrc: '',
    title: '',
    text: '',
    color: '',
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
    });
    setShowFormModal(false);
  };

  return (
    <div className={styles.total}>
      <div className={styles.inicio}>
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
            />
          ))}

          {/* Botón flotante para abrir el modal de formulario */}
          { user ?
            <button className={styles.float} onClick={toggleFormModal} style={{border: 'none'}}>
              <AiOutlinePlus className={styles.myfloat} />
            </button>
            :""
          }
   

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
                          ...newCardData,  imageSrc: e.target.files[0]
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
                    <textarea
                      id="text"
                      value={newCardData.text}
                      onChange={(e) =>
                        setNewCardData({ ...newCardData, text: e.target.value })
                      }
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
                    <button type="submit" onClick={()=>crearcontenido(contenido, content.id)} >Guardar</button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <BotonAtras/>
    </div>
  );
};

export default ContenidoCards;