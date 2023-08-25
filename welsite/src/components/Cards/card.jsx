import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from '../../layout/Continentes/continentes.module.css';
import {BsFillTrash3Fill} from "react-icons/bs";

const Card = ({ card, index, user }) => {
  const navigate = useNavigate();

  const navigateToDetail = () => {
    navigate(`/clases/contenido/${index}`, { state: { card } });
  };

  return (
    <div className={styles.card} onClick={navigateToDetail} style={{ cursor: 'pointer'}}>
      <div className={styles.circle} style={{ background: card.color,  border: " 2px solid "+card.color }}></div>
      <div className={styles.content}>
        <h2>{card.title}</h2>
        <button style={{ background: card.color, border: " 2px solid "+card.color }}>
          Saber más
        </button>
        {/* {user ? <div> <button onClick={()=>borrarContenido(card.id, card.imgUrl)} style={{background: "#b72020", border: "#b72020"}}>  <BsFillTrash3Fill/> </button></div> :""} */}

      </div>
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  user: PropTypes.number 
};

export default Card;
