import React, {FC, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../../assets/img/oli.png';
import styles from './navbar.module.css';
import { auth, db, userExist } from '../../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import'./style.css';
import { FiHome, FiMap, FiBook, FiUsers, FiUser,FiMenu } from 'react-icons/fi';
import { AiOutlineUserAdd ,AiOutlineClose } from 'react-icons/ai';
import { FaGamepad } from 'react-icons/fa';
import {BsFillPersonFill, BsPersonAdd} from 'react-icons/bs'
import {MdKeyboardArrowUp} from 'react-icons/md'
import {BiLogOut} from 'react-icons/bi'
import { color } from 'framer-motion';

const Navbar = () => {
  const [user, setUser] = useState("");
  const [username, setUsername] = useState([]);
  const location = useLocation();
  useEffect(() => {
    onAuthStateChanged(auth, verificarUser);
  }, []);
  
  function verificarUser(user) {
    if (user) {
      setUser(user.email)
      console.log(user.email)
      traerUser(user)
      
    }else{
      setUser("")
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
        
           
            <li>
              {
                user ? (

                <div className="dropdown">
                <div className="content">
                  <span className="material-symbols-outlined"> <BsFillPersonFill/> </span>
                  <p>{username}</p>
                  <span className="material-symbols-outlined"> <MdKeyboardArrowUp/> </span>
                </div>
                <button type="button"></button>
                <div className="menu">
                  
                  <a>
                    <span className="material-symbols-outlined"> <BsPersonAdd/> </span>
                    <NavLink
                    to="/register"
                    style={{color :'white' }} > Agregar usuario</NavLink>
                  </a>
                  <a onClick={logOut}>
                    <span className="material-symbols-outlined"> <BiLogOut/> </span>
                    <p>
                        cerrar sesión
                    </p>
                  </a>
                  
                </div>
              </div>
                ):(
                <NavLink
                  to="/signin"
                  className={`${styles.button}`}
                  id="form-open"
                >
                  Iniciar Sesion
                </NavLink>

                )
              }
            </li>
           
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
