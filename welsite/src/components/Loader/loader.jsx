// Loader.js
import React from 'react';
import './loader.css';
import oliver from '../../assets/img/oliver1.png';

function Loader({ contentTitle }) {
  return (
    <div className="loadercontent">
      <div className="loader-image">
        <img className='imgoliver' src={oliver} alt="" srcSet="" />
        <p className="cloud-text">{`Hoy vamos a aprender ${contentTitle}`}</p>
      </div>
      <div className="loader">
        <div className="loader__circle"></div>
        <div className="loader__circle"></div>
        <div className="loader__circle"></div>
        <div className="loader__circle"></div>
      </div>
    </div>
  );
}

export default Loader;
