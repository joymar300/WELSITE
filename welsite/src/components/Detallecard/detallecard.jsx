import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './DetalleContenido.module.css';
import BotonAtras from '../ButtonBack/ButtonBack';
import {AiOutlineEdit, AiFillSave} from 'react-icons/ai';
import {RxCross1} from 'react-icons/rx'
import ReactQuill from 'react-quill';
import { QuerySnapshot, collection, doc, getDoc, query, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { onAuthStateChanged } from 'firebase/auth';
const DetalleContenido = () => {
  const location = useLocation();
  const { card, tipoContenido, idcontenido } = location.state;
  const [aprobedEdit, SetAprobedEdit] = useState(false);
  const [dataEdit, setDataEdit]= useState("");
  const [dbText, setDbText]= useState("");
  const [user, setUser] = useState('');
  const MySwal = withReactContent(Swal);


  useEffect(()=>{
    mostrartext();
    onAuthStateChanged(auth, verificarUser);
  }, [])

  function verificarUser(user) {
    if (user) {
      setUser(user.email);
    } else {
      setUser('');
      console.log('no hay nadie registrado');
    }
  }
  const changestate = ()=>{
    SetAprobedEdit(true);
    setUser('')
  }
const crossb =()=>{
  onAuthStateChanged(auth, verificarUser);
    SetAprobedEdit(false);
}

  const saveEdit = async() =>{
    try{
    const loadingAlert = MySwal.mixin({
      title: 'Editando contenido',
      icon: 'info',
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: () => {
        MySwal.showLoading(); // Muestra el indicador de progreso
      },
    });
    loadingAlert.fire();
    const docref =  doc(db, tipoContenido, idcontenido);
    await updateDoc(doc(docref, 'info', card.id), {
      text: dataEdit,
    })
    mostrartext();
    SetAprobedEdit(false);
    onAuthStateChanged(auth, verificarUser);
    MySwal.close();
    Swal.fire({
      title: 'Edición exitosa',
      text: 'El contenido ha sido editado con éxito.',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
    });
    } catch (err) {
    MySwal.close();
    console.log(err);
    Swal.fire({
      title: 'Error al editar contenido',
      text: err,
      icon: 'error',
      confirmButtonText: 'Cerrar',
    });
  }
}
async function mostrartext(){

  const docref =  doc(db, tipoContenido, idcontenido, 'info', card.id);
  const querySnapshot = await getDoc(docref);
  setDbText(querySnapshot.data().text); 
  setDataEdit(querySnapshot.data().text);
  console.log(querySnapshot.data())
}
  return (
    <div>
      <div className={styles.inicio} style={{ backgroundColor: card.color }}>
        <div className={styles.titulo}>
          <h2>{card.title}</h2>
         
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.detailContainer}>
        
          <div className={styles.textContainer}>
            {/* Muestra el contenido del campo de texto enriquecido */}
            {
              aprobedEdit ?
              <>
                <form>
                  <ReactQuill
                    value={dataEdit}
                    onChange={(value) => setDataEdit(value)}
                    modules={{
                      toolbar: [
                        [{ header: '1' }, { header: '2' }, { font: [] }],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['link', 'image'],
                        ['clean'],
                      ],
                    }}
                  />
                </form>
                <div className={styles.listButtons}>

                <button onClick={saveEdit} className={styles.floatsave}> <AiFillSave className={styles.myfloat} /></button>
                <button onClick={crossb} className={styles.floatclose}> <RxCross1 className={styles.myfloat} /> </button>
                </div>
              </>

                :
                <div
                  className={styles.text}
                  dangerouslySetInnerHTML={{ __html: dbText}}
                ></div>
            }
          </div>
        </div>
      </div>
      {user ?
        <button className={styles.float} onClick={changestate} >
            <AiOutlineEdit className={styles.myfloat} />
          </button>
        : ''
      }
      <BotonAtras />
    </div>
  );
};

export default DetalleContenido;
