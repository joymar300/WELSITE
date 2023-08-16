import React, { useEffect, useState } from 'react';
import { FiHome, FiMap, FiBook, FiUsers, FiUser } from 'react-icons/fi';
import { NavLink, useLocation } from 'react-router-dom';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { FaGamepad } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { FiMenu } from 'react-icons/fi';
import Logo from '../../assets/img/zorro.png';
import styles from './navbar.module.css';
import { auth, db, userExist } from '../../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import {
  useCollection,
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const Navbar = () => {
  const [user, setUser] = useState([]);
  const [username, setUsername] = useState([]);
  const location = useLocation();

  
  function verificarUser(user) {
    if (user) {
      setUser(user.email)
      console.log(user.email)
      traerUser(user)
      
    }else{
      
      console.log("no hay nadie registrado")
    }
  }

  
 async function traerUser (user) {
  //mostrar el nombre del usuario logeado
    const dataRef = collection(db,"users");
    const q = query(dataRef, where("email", "==",user.email));

    const queySnapshot = await getDocs(q);
    let data = [];
    queySnapshot.forEach((doc) => {
      data.push(doc.data());
    });

    data.map((u) => {
      setUsername(u.fName);
    });

    console.log(data);
  }

  const logOut = async () => {
    try {
      
      await signOut(auth);
      setUser("");
    } catch (error) {
      console.log(error);
    }
  };

  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  return (
    <>
      <header className={`${styles.header} ${showMenu ? styles.showMenu : ''}`}>
        <nav className={`${styles.nav}`}>
          <div className={styles.barra}>
            <img src={Logo} height="80px" alt="" srcSet="" />
            <h2 className={styles.nav_logo}>
              <NavLink to="/">Weltsite</NavLink>
            </h2>
            <span className={styles.menu_toggle} onClick={handleMenuToggle}>
              {showMenu ? <AiOutlineClose /> : <FiMenu />}
            </span>
          </div>

          <ul className={`${styles.menu_items} ${showMenu ? styles.showMenu : ''}`}>
            <li>
              <NavLink
                to="/"
                className={`${styles.nav_link} ${location.pathname === '/' ? styles.active : ''} ${styles.home}`}
                style={location.pathname === '/' ? { backgroundColor: '#0099ff' } : null}
              >
                <FiHome /> Inicio
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/mapa"
                className={`${styles.nav_link} ${location.pathname === '/mapa' ? styles.active : ''} ${styles.map}`}
                style={location.pathname === '/mapa' ? { backgroundColor: '#00cc66' } : null}
              >
                <FiMap /> Mapa
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/clases"
                className={`${styles.nav_link} ${location.pathname === '/clases' || location.pathname.includes('/clases/contenido') ? styles.active : ''} ${styles.classes}`}
                style={(location.pathname === '/clases' || location.pathname.includes('/clases/contenido')) ? { backgroundColor: '#ff9900' } : null}
              >
                <FiBook /> Clases
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/juegos"
                className={`${styles.nav_link} ${location.pathname === '/juegos' ? styles.active : ''} ${styles.games}`}
                style={location.pathname === '/juegos' ? { backgroundColor: '#cc33ff' } : null}
              >
                <FaGamepad /> Juegos
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/creadores"
                className={`${styles.nav_link} ${location.pathname === '/creadores' ? styles.active : ''} ${styles.creators}`}
                style={location.pathname === '/creadores' ? { backgroundColor: '#ff3333' } : null}
              >
                <FiUsers /> Creadores
              </NavLink>
            </li>
            {user ? (
              <NavLink
                to="/register"
                className={`${styles.nav_link} ${styles.registre}`}
                style={location.pathname === '/register' ? { backgroundColor: '' } : null}
              >
                <AiOutlineUserAdd /> Registrar usuario
              </NavLink>
            ) : (
              ''
            )}
            {user ? (
              <li>
                <NavLink to="#" className={`${styles.nav_link}`}>
                  {username}
                </NavLink>
              </li>
            ) : (
              ''
            )}
            <li>
              {user ? (
                <button onClick={logOut} className={`${styles.button}`}>
                  cerrar sesión
                </button>
              ) : (
                <NavLink
                  to="/signin"
                  className={`${styles.button}`}
                  id="form-open"
                >
                  Iniciar Sesion
                </NavLink>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
