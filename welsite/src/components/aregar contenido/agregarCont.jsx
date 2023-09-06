import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import { onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc } from 'firebase/firestore';
import { useState } from "react";
import { AiOutlinePlus } from 'react-icons/ai';
import styles from './agregarCont.module.css';
import withReactContent from 'sweetalert2-react-content';
import { db } from '../../config/firebase';
const AgregarCont = ({ tipContent , traerContenido })=>{
  const MySwal = withReactContent(Swal)
  const [showFormModal, setShowFormModal] = useState(false);
  const [newCardData, setNewCardData] = useState({
  
    title: '',
    text: '',
  
  });
  const traerC = ()=>{
   traerContenido();
  }
  const crearcontenido = async ()=>{
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
      const docRef = await addDoc(collection(db, tipContent), {
      
        title: newCardData.title,
        text: newCardData.text,
 
      });
  

      traerC();
      toggleFormModal()
      setNewCardData({
      
        title: '',
        text: '',
     
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
      console.log(err)
      Swal.fire({
        title: 'Error al crear contenido',
        text: 'Ha ocurrido un error al crear el contenido.',
        icon: 'error',
        confirmButtonText: 'Cerrar',
      });
    }
    
    
  };

  
    const toggleFormModal = () => {
      setShowFormModal(!showFormModal);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
 
      setNewCardData({
        
        title: '',
        text: '',
    
      });
      setShowFormModal(false);
    };
  
    return (
      <div>
        <a href="#" className={styles.float} onClick={toggleFormModal}>
          <AiOutlinePlus className={styles.myfloat} />
        </a>
  
        {showFormModal && (
          <div className={styles.formModalOverlay}>
            {/* ... Tu código de modal de formulario aquí */}
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
                      <textarea
                        id="text"
                        value={newCardData.text}
                        onChange={(e) =>
                          setNewCardData({ ...newCardData, text: e.target.value })
                        }
                      />  
                      <button type="button" onClick={toggleFormModal}>
                        Cancelar
                      </button>
                      <button onClick={crearcontenido}>Guardar</button>
                    </form>
                  </div>
                </div>
          </div>
        )}
      </div>
    );
}
AgregarCont.propTypes ={
  tipContent: PropTypes.string.isRequired,
  traerContenido: PropTypes.func.isRequired
}
export default AgregarCont;