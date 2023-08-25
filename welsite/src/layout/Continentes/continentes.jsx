import React, { useState } from 'react';
import styles from './continentes.module.css';
import {GrClose} from 'react-icons/gr'
import {AiOutlinePlus} from 'react-icons/ai'
import Card from '../../components/Cards/card';

const cardsData = [
    {
        imageSrc: 'https://as1.ftcdn.net/v2/jpg/01/07/28/20/1000_F_107282037_J0yMVXSthkmdqNwCza0CRo9dOThf2rcC.jpg',
        title: 'África',
        text: 
        'El relieve africano posee grandes superficies de llanuras.\n\n' +
        'África es un continente completamente rodeado de mares y océanos, ya que se encuentra entre el océano Atlántico (que lo limita al Oeste) el océano Índico (que lo limita al Este) y el mar Mediterráneo (que lo limita al Norte y lo separa de Europa). \n\n'+
        '• La superficie total de África es de 30.272.922 kilómetros cuadrados y su población es de más de 1320 millones de habitantes. En su territorio se encuentran 54 países. Su relieve es predominantemente de llanura, por el clima lluvioso y su relieve predominantemente llano, el continente se caracteriza por la presencia de largos y caudalosos ríos los más extensos son: el río Nilo (el segundo más extenso del mundo), el Congo y el Níger.'
        ,
    },
  {
    imageSrc: 'https://img.freepik.com/vector-premium/mapa-mundial-animales-america-ninos_81894-1211.jpg?w=2000',
    title: 'América',
    text:
    'Se encuentra rodeado de océanos: el océano Glacial Ártico al norte, el océano Pacífico al oeste, el océano Atlántico al este y la confluencia del Atlántico y Pacífico al sur.\n\n' +
    'Su relieve se caracteriza por la presencia de una extensa cordillera que atraviesa el continente de norte a sur por el extremo oeste. Esta cordillera se conoce como “Montañas Rocosas” en América del Norte y “Cordillera de los Andes” en América del Sur. También se caracteriza por la presencia de extensos y caudalosos ríos de llanura. Los más largos del continente son el Amazonas (el más extenso del mundo), el Mississippi y el Paraná.\n\n' +
    '• Su superficie de 42.500.000 kilómetros cuadrados está dividida en tres subcontinentes:\n' +
    '• América del Sur. Con una superficie de 17.800.000 km2, alberga a más de 423 millones de habitantes distribuidos en 12 países. Aquí se encuentra el Aconcagua, el pico más alto de América.\n\n' +
    '• América Central: la región con menor superficie de América, con 800.000 km2, y aproximadamente 105 millones de habitantes y está integrada por  20 países independientes. Es una zona de gran actividad volcánica y sísmica., se caracteriza por un clima cálido y húmedo.\n\n' +
    '• América del Norte. Con una enorme superficie de 24.700.000 km2, está formado por Canadá, México, Estados Unidos y Groenlandia. Su población es de aproximadamente 500 millones de habitantes.',
  },
  {
    imageSrc: 'https://previews.123rf.com/images/alfazetchronicles/alfazetchronicles1701/alfazetchronicles170100049/69365220-mapa-del-continente-ant%C3%A1rtico-con-la-ilustraci%C3%B3n-del-vector-de-animales-de-la-fauna-delf%C3%ADn-ballena.jpg',
    title: 'La Antártida',
    text:
      'Todo el continente se encuentra cubierto de hielo, y solo está habitado por organismos adaptados a condiciones climáticas extremas. La Antártida, con más de 14 millones de kilómetros cuadrados de extensión, no tiene población permanente, y solo tiene habitantes temporales cuyo número varía entre 1.000 y 4.000 según la época del año, la mayoría de estas personas pertenecen a expediciones científicas.',
  },
  {
    imageSrc: 'https://img.freepik.com/vector-premium/mapa-asia-diferentes-animales-banner-divertidos-dibujos-animados-ninos-continente_93083-1011.jpg?w=2000',
    title: 'Asia',
    text:
      'Es el continente con mayor superficie: 44.541.138 km2. También es el continente con mayor población, con 4500 millones de habitantes. Limita con el océano Glaciar Ártico al norte, el océano Índico al sur, el océano Pacífico al oeste y los montes Urales al este. \n\n'+
      'Está compuesto por 48 países, y aunque en su relieve predominan mesetas y llanuras, también pueden encontrarse elevados sistemas montañosos al centro y oeste, como la cordillera del Himalaya donde se ubica el Monte Everest, el más elevado del planeta, con 8848 metros de altura. Su gran extensión y lo húmedo de la mayoría de sus climas también determina la presencia de grandes cuencas hidrográficas y largos ríos. Los más extensos son el río Yangtsé, el Amarillo y el Mekong.'
      ,
  },
  {
    imageSrc: 'https://img.freepik.com/vector-gratis/ilustracion-mapa-ninos-dibujados-mano_23-2149562338.jpg?w=2000',
    title: 'Europa',
    text:
      'Se encuentra en el hemisferio norte. Es el segundo continente más pequeño con una superficie de 10.530.751 kilómetros cuadrados. Su población es de 740 millones de habitantes, con una densidad de población de 70 habitantes por kilómetro cuadrado. \n\n'+
      'Está compuesto por 47 países y otros Estados como Mónaco o el Vaticano, que son territorios con estatus especiales. En su relieve se destaca el monte Elbrús, con una altura de 5.633 metros sobre el nivel del mar, en la región del Cáucaso. Como resultado de la gran variedad de relieves y del tipo de clima que predomina, el continente europeo presenta gran cantidad de ríos de distinto caudal y extensión. Los más largos de Europa son el Volga, el Danubio y el Ural.\n\n'+
      'Es importante tener en cuenta que la delimitación de los continentes es un concepto geográfico y puede haber diferentes interpretaciones y divisiones en función de los criterios utilizados. Por ejemplo, algunas clasificaciones consideran a América como un solo continente, mientras que otras lo dividen en América del Norte y América del Sur',
  }
  // Agrega más objetos de datos para más tarjetas...
];

const Contenido = () => {
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
    cardsData.push(newCard);
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
          <h2>Los Continentes</h2>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.cardContainer}>
          {cardsData.map((card, index) => (
            <Card
              key={index}
              card={card}
              index={index}
              activeCardIndex={activeCardIndex}
              showCardModal={showCardModal}
              toggleCardModal={toggleCardModal}
            />
          ))}

          {/* Botón flotante para abrir el modal de formulario */}
          <a href="#" className={styles.float} onClick={toggleFormModal}>
            <AiOutlinePlus className={styles.myfloat} />
          </a>

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
                    <button type="submit">Guardar</button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contenido;