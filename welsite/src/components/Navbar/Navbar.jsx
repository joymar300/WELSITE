import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom'; // Importa el componente Link
import Logo from '../../assets/img/LOGOCOLSAM.png';
import styles from './navbar.module.css';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(prevShowMenu => !prevShowMenu);
  };

  return (
    <>
      <header className={`${styles.header} ${showMenu ? styles.showMenu : ''}`}>
        <nav className={`${styles.nav} container`}>
          <div className={styles.barra}>
            <img src={Logo} height="80px" alt="" srcSet="" />
            <h2 className={styles.nav_logo}>
              <Link to="/">Welsite</Link> {/* Cambia el 'a' por Link */}
            </h2>
            <span className={styles.menu_toggle} onClick={handleMenuToggle}>
              {showMenu ? <AiOutlineClose /> : <FiMenu />}
            </span>
          </div>

          <ul className={`${styles.menu_items} ${showMenu ? styles.showMenu : ''}`}>
            <li>
              <Link to="/" className={styles.nav_link}> {/* Cambia el 'a' por Link */}
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/mapa" className={styles.nav_link}> {/* Cambia el 'a' por Link */}
                Mapa
              </Link>
            </li>
            <li>
              <Link to="/clases" className={styles.nav_link}> {/* Cambia el 'a' por Link */}
                Clases
              </Link>
            </li>
            <li>
              <Link to="/juegos" className={styles.nav_link}> {/* Cambia el 'a' por Link */}
                Juegos
              </Link>
            </li>
            <li>
              <Link to="/creadores" className={styles.nav_link}> {/* Cambia el 'a' por Link */}
                Creadores
              </Link>
            </li>
            <li>
              <Link to="/signin" className={`${styles.button}`} id="form-open">
                Iniciar Sesion
                </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
