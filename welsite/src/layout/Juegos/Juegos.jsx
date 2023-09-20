import React, { useEffect, useState } from 'react';
import styles from './Juegos.module.css';
import {GrClose} from 'react-icons/gr'
import {AiOutlinePlus} from 'react-icons/ai'
import {BiSolidTrash} from 'react-icons/bi'
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { addDoc, collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore';
import ModalButton from '../../components/modal/modal';
const Juegos = () => {
    const [showFormModal, setShowFormModal] = useState(false);
    const [newCardData, setNewCardData] = useState({
      imageSrc: '',
      title: '',
      link: '',
    });
    const [cardsData, setCardsData] = useState([
      // ... tus datos de tarjetas aquí
      {
        imageSrc: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M11.25 5.337c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.036 1.007-1.875 2.25-1.875S15 2.34 15 3.375c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959 0 .332.278.598.61.578 1.91-.114 3.79-.342 5.632-.676a.75.75 0 01.878.645 49.17 49.17 0 01.376 5.452.657.657 0 01-.66.664c-.354 0-.675-.186-.958-.401a1.647 1.647 0 00-1.003-.349c-1.035 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401.31 0 .557.262.534.571a48.774 48.774 0 01-.595 4.845.75.75 0 01-.61.61c-1.82.317-3.673.533-5.555.642a.58.58 0 01-.611-.581c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.035-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959a.641.641 0 01-.658.643 49.118 49.118 0 01-4.708-.36.75.75 0 01-.645-.878c.293-1.614.504-3.257.629-4.924A.53.53 0 005.337 15c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.036 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.369 0 .713.128 1.003.349.283.215.604.401.959.401a.656.656 0 00.659-.663 47.703 47.703 0 00-.31-4.82.75.75 0 01.83-.832c1.343.155 2.703.254 4.077.294a.64.64 0 00.657-.642z" />
          </svg>
        ),
        title: 'Juego #1',
        link: 'https://es.educaplay.com/juego/15528008-welsite.html'
      },
  {
    imageSrc: 'https://humanidades.com/wp-content/uploads/2018/10/descubrimiento-de-Am%C3%A9rica-3-e1582748979129.jpg',
    title: 'Juego #2',
    link:'https://es.educaplay.com/juego/15527692-weltsite.html'
  },
  {
    imageSrc: 'https://humanidades.com/wp-content/uploads/2019/05/epoca-colonial-1-e1588461602649.jpg',
    title: 'Juego #3',
    link:'https://es.educaplay.com/recursos-educativos/15680643-completa_el_texto_weltsite.html'
  },
  {
    link:'https://es.educaplay.com/recursos-educativos/15673125-weltsite.html',
    title: 'Juego #4',
    text:
      'Las principales colonias en América estuvieron bajo domino español, portugués, y luego la anglosajón. La más extensa de las tres fue la española, que tras la llegada al continente en el siglo XV procedió a su sangrienta conquista.'
  },
  {
    link:'https://es.educaplay.com/recursos-educativos/15680311-relieves.html',
    title: 'Juego #5',
    text:
      'La región Andina cuenta con una gran diversidad natural y por ella pasa la cordillera de Los Andes. El clima de esta región es muy cambiante ya que en ella se dan grandes variaciones de altitud, pudiéndose encontrar tres tipos de clima: tropical, subtropical y templado. En cuanto a su biodiversidad, presenta una fauna y flora únicas: son las orquídeas, la quina y el monedero las especies de vegetales más representativas y el colibrí, el cóndor y el zorro colorado son las especies de animales que representan la región.'

  },
  {
    title: 'Juego #6',
    link:'https://es.educaplay.com/recursos-educativos/15672919-minerales_en_weltsite.html'
  },
    ]);
  
    const toggleFormModal = () => {
      setShowFormModal(!showFormModal);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const newCard = { ...newCardData };
      setCardsData([...cardsData, newCard]);
      setNewCardData({
      
        title: '',
        link: '',
      });
      setShowFormModal(false);
    };
  
    const deleteCard = (index) => {
      const updatedCards = [...cardsData];
      updatedCards.splice(index, 1);
      setCardsData(updatedCards);
    };



  
    // base de datos
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
      const docRef = await addDoc(collection(db, "juegos"), {
        title: newCardData.title,
        link: newCardData.link,
      });

   
      await traerContenido()
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

  async function traerContenido() {
    
  const info = []
    const dataRef = collection(db,"juegos");
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
          confirmButton: styles.confirmButton, // Asigna la clase de estilo definida en contenido4.module.css
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
        await deleteDoc(doc(db,"juegos", docId ))
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



//fin base de datos



    return (
      <>
     
      <div className={styles.inicio}>
        <div className={styles.titulo}>

        <h2>¿Quieres jugar y aprender?</h2>
        </div>
      </div>
      <div className={styles.container}>
        
        <div className={styles.cardContainer}>
          {data.map((card, index) => (
            <div className={styles.body} key={index}>
              <a
                className={`${styles.card} ${styles.credentialing}`}
                href={card.link}
                target="_blank"
              >
                <div className={styles.overlay}></div>
                <div className={styles.circle} >
                <svg xmlns="http://www.w3.org/2000/svg" height="72px" width="64px" viewBox="0 0 640 512"><path d="M192 64C86 64 0 150 0 256S86 448 192 448H448c106 0 192-86 192-192s-86-192-192-192H192zM496 168a40 40 0 1 1 0 80 40 40 0 1 1 0-80zM392 304a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zM168 200c0-13.3 10.7-24 24-24s24 10.7 24 24v32h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H216v32c0 13.3-10.7 24-24 24s-24-10.7-24-24V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h32V200z"/></svg>
                </div>
                <p>{card.title}</p>
                
              </a>
              {
                user ? 
                <button className={styles.buttoncardDelete} onClick={()=>borrarContenido(card.id)}>
                  Eliminar
                </button>
                
                : ""
              }
              
            </div>
          ))}
          {
            user ? 
              <a href="#" className={styles.float} onClick={toggleFormModal}>
                <AiOutlinePlus className={styles.myfloat} />
              </a>
            
            :""
          }
  
          {showFormModal && (
            <div className={styles.formModalOverlay}>
          <div className={styles.formModal}>
            <div className={styles.formModalContent}>
              <h2>Agregar Juego</h2>
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

                <label htmlFor="text">link</label>
                <input
                  type="text"
                  id="link"
                  value={newCardData.link}
                  onChange={(e) =>
                    setNewCardData({ ...newCardData, link: e.target.value })
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
    </div>
    <ModalButton contentTitle={'Hoy Vamos A Jugar y Aprender'}/>
    </>
  );
};

export default Juegos;