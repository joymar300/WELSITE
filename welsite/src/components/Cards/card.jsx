import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from '../../components/Cards/card.module.css';
import { BsFillTrash3Fill } from 'react-icons/bs';
import ModalButton from '../modal/modal';
import { prototype } from 'react-quill';

// Importa el archivo de sonido

const Card = ({ card, index, user, borarContent , tipoContenido, idcontenido}) => {
  const navigate = useNavigate();


  const navigateToDetail = () => {
    navigate(`/clases/contenido/${index}`, { state: {card, tipoContenido, idcontenido} });
  };

  const borarC = () => { // Reproduce el sonido al hacer clic en el botón de eliminar
    borarContent(card.id, card.imgUrl);
  };

  return (
    <div className={styles.card} style={{ cursor: 'pointer' }}>
      <div
        className={styles.circle}
        onClick={navigateToDetail}
        style={{ background: card.color, border: `2px solid ${card.color}` }}
      ></div>
      <div className={styles.content} onClick={navigateToDetail}>
        <h2>{card.title}</h2>
      </div>
      {user ? (
        <button onClick={borarC} className={styles.trashButtom} style={{ cursor: 'pointer' }}>
          <BsFillTrash3Fill style={{}} />
        </button>
      ) : (
        ''
      )}
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  user: PropTypes.string,
  borarContent: PropTypes.func,
  tipoContenido: PropTypes.string,
  idcontenido: prototype.object
};

export default Card;
