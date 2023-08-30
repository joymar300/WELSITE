import React, { useEffect, useState } from 'react';
import styles from './Contenido4.module.css';
import {GrClose} from 'react-icons/gr'
import {AiOutlinePlus} from 'react-icons/ai'
import withReactContent from 'sweetalert2-react-content';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db, storage } from '../../config/firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Swal from 'sweetalert2';
import Card from '../../components/Cards/card';
import BotonAtras from '../../components/ButtonBack/ButtonBack';
const cardsData = [
    {
        imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Desembarco_de_Col%C3%B3n_de_Di%C3%B3scoro_Puebla.jpg',
        title: 'Descubrimiento de América',
        text: 
        'El descubrimiento de América representa uno de los eventos más impactantes en la historia. Hasta ese momento, las civilizaciones de América y Eurasia habían evolucionado de manera independiente. Sin embargo, con la llegada de Cristóbal Colón a las Antillas, dos mundos en diferentes etapas evolutivas entraron en contacto.\n\n' +
        'Este encuentro tuvo consecuencias enormes. España, Portugal y otras potencias europeas colonizaron el nuevo continente, impulsando el surgimiento de la burguesía y el capitalismo. Pero América sufrió devastación inmediata: pérdida de culturas precolombinas, explotación de nativos y saqueo de recursos. \n\n'+
        'Desde la perspectiva histórica, el descubrimiento de América culminó el expansionismo de la Europa de la Baja Edad Media, influido por exploraciones atlánticas portuguesas. A principios del siglo XV, los Estados europeos medievales estaban en su máximo desarrollo y buscaban nuevas rutas comerciales debido al crecimiento de la industria, el comercio y el nacimiento de la burguesía en el feudalismo.'
        ,
        color: '#289dd2',
       
    },
  {
    imageSrc: 'https://humanidades.com/wp-content/uploads/2018/10/descubrimiento-de-Am%C3%A9rica-3-e1582748979129.jpg',
    title: '¿Por qué se llama "Descubrimiento"?',
    text:
    'Actualmente, el concepto de “descubrimiento de América” se encuentra en debate por varios motivos. Por un lado, porque hablar de “descubrir” implica conocer algo que hasta entonces era desconocido. Sin embargo, el continente se hallaba ampliamente poblado; se estima que la población americana rondaba los 50 millones de personas. Por otro lado, hay evidencia material de que pueblos nórdicos europeos habrían navegado entre las islas del norte del continente, e incluso habitado algunas de ellas, desde el siglo X en adelante.',
    color: '#3cc091',
  },
  {
    imageSrc: 'https://humanidades.com/wp-content/uploads/2019/05/epoca-colonial-1-e1588461602649.jpg',
    title: 'Época colonial',
    text:
      'La época colonial fue el período histórico en el que las poblaciones de diversos continentes, como América y África, fueron controladas y sometidas por el poder de los imperios europeos, como el español, el francés y el inglés. El proceso de dominación tuvo un alcance integral y abarcó cuestiones religiosas, políticas, sociales y culturales. Hubo muchas situaciones de colonialismo en el mundo, sobre todo el infringido por Europa sobre América, África, Asia y Oceanía durante los siglos XVIII y XIX. Las huellas de dicho período dejaron evidencia en cada región de una manera distinta y dieron origen a numerosos procesos de descolonización y diversificación cultural, especialmente en el llamado Tercer mundo.',
      color:'#c03c5c',
  },
  {
    imageSrc: 'https://cdn.colombia.com/images/v2/colombia-info/historia-colombia/epoca-hispanica/sociedad-colonial/sociedad-esclavista-800.jpg',
    title: 'Época colonial en América',
    text:
      'Las principales colonias en América estuvieron bajo domino español, portugués, y luego la anglosajón. La más extensa de las tres fue la española, que tras la llegada al continente en el siglo XV procedió a su sangrienta conquista.',
      color:'#d68d38',
      
      
  },
  {
    imageSrc: 'https://spanishincolombia.caroycuervo.gov.co/documentos/imagenes/Region-Andina.jpg',
    title: 'Región Andina o de los Andes Colombianos',
    text:
      'La región Andina cuenta con una gran diversidad natural y por ella pasa la cordillera de Los Andes. El clima de esta región es muy cambiante ya que en ella se dan grandes variaciones de altitud, pudiéndose encontrar tres tipos de clima: tropical, subtropical y templado. En cuanto a su biodiversidad, presenta una fauna y flora únicas: son las orquídeas, la quina y el monedero las especies de vegetales más representativas y el colibrí, el cóndor y el zorro colorado son las especies de animales que representan la región.',
      color:'#b139b1',

  }
  // Agrega más objetos de datos para más tarjetas...
];

const Contenido4 = () => {
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
      const docRef = await addDoc(collection(db, "contenido4"), {
        imgUrl:'',
        title: newCardData.title,
        text: newCardData.text,
        color:newCardData.color,
      });

      const folder =  ref(storage,`contenido4/${docRef.id}`)
      await uploadBytes(folder,newCardData.imageSrc);
      const link = await getDownloadURL(folder)
      await updateDoc(doc(db, "contenido4", docRef.id), {
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
    const dataRef = collection(db,"contenido4");
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
        await deleteDoc(doc(db,"contenido4", docId ),)
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



//fin base de datos

  const [showCardModal, setShowCardModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const [newCardData, setNewCardData] = useState({
    imageSrc: '',
    title: '',
    text: '',
    color:'',
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
    cardsData.push(newCard);
    setNewCardData({
      imageSrc: '',
      title: '',
      text: '',
      color:'',
    });
    setShowFormModal(false);
  };
  

  return (
    <div>
    <div className={styles.inicio}>
        <div className={styles.titulo}>
        <h2>¿Quieres jugar y aprender?</h2>
        </div>
      </div>
    <div className={styles.container}>
    <div className={styles.cardContainer}>
      {/* {cardsData.map((card, index) => (
        <div key={index} className={styles.card}>
          <img src={card.imageSrc} alt={card.title} />
          <h2>{card.title}</h2>
          <button onClick={() => toggleCardModal(index)} className={styles.buttoncard}>
            Mostrar más contenido
          </button>
          {showCardModal && activeCardIndex === index && (
            <div className={styles.modalOverlay}>
              <div className={styles.modal}>
                <div className={styles.modalContent}>
                  <h2>{card.title}</h2>
                  <p>{card.text}</p>
                  <button onClick={() => toggleCardModal(index)}>
                    <GrClose />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))} */}
  {
    user?
      <a href="#" className={styles.float} onClick={toggleFormModal}>
        <AiOutlinePlus className={styles.myfloat} />
      </a>
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
                      ...newCardData,
                      imageSrc: e.target.files[0],
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

                <button type="button" onClick={toggleFormModal}>
                  Cancelar
                </button>
                <button type="button" onClick={crearcontenido}>Guardar</button>
              </form>
            </div>
          </div>
        </div>
      )}
      {
       data ? cardsData.map((card, index)=>(

        <Card
        key={index}
        card={card}
        index={index}
        activeCardIndex={activeCardIndex}
        showCardModal={showCardModal}
        toggleCardModal={toggleCardModal}
      />

          
        )
          
         
        ):""
      }

    </div>
    </div>
    <BotonAtras/>
    </div>
  );
};

export default Contenido4;