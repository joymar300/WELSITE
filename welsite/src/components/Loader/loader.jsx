// Loader.js
import React from 'react';
import './loader.css';
import oliver from '../../assets/img/oliver1.png';

function Loader({ contentTitle }) {
  return (
    <div className="loadercontent">
      <img className='imgoliver' src={oliver} alt="" srcSet="" />
      <p>{`Hoy vamos a aprender ${contentTitle}`}</p>
    </div>
  );
}

export default Loader;
