import React, { useState, useEffect } from 'react';
import styles from './contenidogrado3.module.css'; // Importa los estilos del módulo CSS

import { Link } from 'react-router-dom';
import BotonAtras from '../../components/ButtonBack/ButtonBack';
import AgregarCont from '../../components/aregar contenido/agregarCont';
import { auth, db } from '../../config/firebase';
import { collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore';
import TarjetTheme from '../../components/tarjetas temas/targetTheme';
import Swal from 'sweetalert2';
import { onAuthStateChanged } from 'firebase/auth';
import ModalButton from '../../components/modal/modal';


const Contenidogrado3 = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState("");
  useEffect(()=>{
    traerContenido()
    onAuthStateChanged(auth, verificarUser)
  }, [])

  function verificarUser (user){
    if (user) {
    setUser(user.email)
    console.log(user.email)
    
    
  }else{
    setUser("")
    console.log("no hay nadie registrado")
  }
  
}
  async function traerContenido() {
    
    const info = []
      const dataRef = collection(db,"contenido3");
      const q = query(dataRef);
      const queySnapshot = await getDocs(q);
      queySnapshot.forEach((doc)=>{
         info.push({ id: doc.id, ...doc.data() });
       });
      
      console.log(data)
      setData(info);
    }


    const borrarContenido = async(docId)=>{
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
          await deleteDoc(doc(db,"contenido3", docId ),)
    
         
      
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
  return (
    <div>
      <div className={styles.inicio}>
        <div className={styles.titulo}>
        <h2>Elige tu tema </h2>
        </div>
      </div>
      <div className={styles.container}>

        {data.map((target, index)=>(
          <TarjetTheme content={target} index={index} key={index} borrarContenido={borrarContenido} grado='contenido3' user={user} />
        ))}
  
        {
          user != "" ?
          <AgregarCont tipContent={'contenido3'} traerContenido={traerContenido} />

          :""
        }
      </div>
      <BotonAtras/>
      <ModalButton contentTitle={'Elige tu tema de interes'}/>
    </div>
  );
};

export default Contenidogrado3;