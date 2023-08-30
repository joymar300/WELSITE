// Card.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from '../../components/Cards/card.module.css';

const Card = ({ card, index }) => {
  const navigate = useNavigate();

  const navigateToDetail = () => {
    navigate(`/clases/contenido/${index}`, { state: { card } });
  };

  return (
    <div className={styles.card} onClick={navigateToDetail} style={{ cursor: 'pointer' }}>
      <div className={styles.circle} style={{ background: card.color }}></div>
      <div className={styles.content}>
        <h2>{card.title}</h2>
        <button style={{ background: card.color }}>
          Saber más
        </button>
      </div>
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default Card;
