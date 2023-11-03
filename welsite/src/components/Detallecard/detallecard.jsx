import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './DetalleContenido.module.css';
import BotonAtras from '../ButtonBack/ButtonBack';
import { AiOutlineEdit, AiFillSave } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';
import ReactQuill from 'react-quill';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
} from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { onAuthStateChanged } from 'firebase/auth';

const DetalleContenido = () => {
  const location = useLocation();
  const { card, tipoContenido, idcontenido } = location.state;
  const [aprobedEdit, SetAprobedEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState('');
  const [dbText, setDbText] = useState('');
  const [user, setUser] = useState('');
  const MySwal = withReactContent(Swal);
  const [urlEdit, setUrlEdit]= useState('');
  const [urlact, setUrlAct]= useState('');

  useEffect(() => {
    mostrartext();
    onAuthStateChanged(auth, verificarUser);
  }, []);

  function verificarUser(user) {
    if (user) {
      setUser(user.email);
    } else {
      setUser('');
      console.log('no hay nadie registrado');
    }
  }

  const changestate = () => {
    SetAprobedEdit(true);
    setUser('');
  };

  const crossb = () => {
    onAuthStateChanged(auth, verificarUser);
    SetAprobedEdit(false);

    

  }

  const saveEdit = async () => {
    try {
      const loadingAlert = MySwal.mixin({
        title: 'Editando contenido',
        icon: 'info',
        showConfirmButton: false,
        allowOutsideClick: false,
        didOpen: () => {
          MySwal.showLoading();
        },
      });
      loadingAlert.fire();
      const docref = doc(db, tipoContenido, idcontenido);
      await updateDoc(doc(docref, 'info', card.id), {
        text: dataEdit,
        videoUrl: urlEdit,

      });
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
  const extractVideoIdFromUrl = (url) => {
    const videoIdMatch = url.match(/(?:\?|&)v=([^&#]+)/);
    return videoIdMatch ? videoIdMatch[1] : null;
  };

  async function mostrartext() {
    const docref = doc(db, tipoContenido, idcontenido, 'info', card.id);
    const querySnapshot = await getDoc(docref);
    setDbText(querySnapshot.data().text);
    setDataEdit(querySnapshot.data().text);
    setUrlAct(querySnapshot.data().videoUrl)
    setUrlEdit(querySnapshot.data().videoUrl)
    console.log(querySnapshot.data());
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
          {aprobedEdit ? 
          (
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
              <div className={styles.urlInput}>
                <label htmlFor="videoUrl">Cambiar URL del video de YouTube:</label>
                <input
                  type="text"
                  id="videoUrl"
                  value={urlEdit}
                  onChange={(e) => (setUrlEdit(e.target.value))}
                />
              </div>
              </form>
              <div className={styles.listButtons}>
                <button onClick={saveEdit} className={styles.floatsave}>
                  <AiFillSave className={styles.myfloat} />
                </button>
                <button onClick={crossb} className={styles.floatclose}>
                  <RxCross1 className={styles.myfloat} />
                </button>
              </div>
            </>
          ) : 
          (
            <div className={styles.textContainer} >
              <div  className={styles.text}
                dangerouslySetInnerHTML={{ __html: dbText }}
              ></div>
              {urlact && (
                <div className={styles.videoContainer}>
                  <iframe 
                    src={`https://www.youtube.com/embed/${extractVideoIdFromUrl(urlact)}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
            )}
          </div>
        </div>
      </div>
      {user ? (
        <button className={styles.float} onClick={changestate}>
          <AiOutlineEdit className={styles.myfloat} />
        </button>
      ) : ''}
      <BotonAtras />
    </div>
  );
};

export default DetalleContenido;
