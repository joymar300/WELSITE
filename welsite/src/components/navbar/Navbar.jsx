import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom'; // Importa el componente Link
import Logo from '../../assets/img/zorro.png';
import styles from './navbar.module.css';
import { auth, db, userExist } from '../../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useCollection, useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';


const Navbar = () => {

  
  const [user, setUser]=  useState([]);
  const [username, setUsername]= useState([]);

  useEffect(()=>{
    onAuthStateChanged(auth, verificarUser)
  

  },[])
  
function verificarUser (user){
    if (user) {
      console.log(user.email)
      traerUser(user)
      
    }else{
      console.log("no hay nadie registrado")
    }
    
  }

  
 async function traerUser (user) {
    const dataRef = collection(db,"users");
    const q = query(dataRef, where("email", "==",user.email));

     const queySnapshot = await getDocs(q);
     let data =[];
     queySnapshot.forEach((doc)=>{
       data.push(doc.data());
     });

    data.map((u)=>{
      setUsername(u.fName);
     })
     
    // const mapa= data.find((e)=> e.email = user.email)
    
    //  console.log("mapa ", mapa)
     console.log(data);
    }

  //  const [value, valueLoading, valueError] = useDocumentData(q);

   

  
  const logOut = async()=>{
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error)
    }
  }

  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(prevShowMenu => !prevShowMenu);
  };

  return (
    <>
      <header className={`${styles.header} ${showMenu ? styles.showMenu : ''}`}>
        <nav className={`${styles.nav}`}>
          <div className={styles.barra}>
            <img src={Logo} height="80px" alt="" srcSet="" />
            <h2 className={styles.nav_logo}>
              <Link to="/">Weltsite</Link> {/* Cambia el 'a' por Link */}
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
            { user ?
              <Link to="/register" className={`${styles.nav_link}`} > Registrar usuario</Link>:""
               }
            {
              user ? 
              
              <li><Link to="#"   className={`${styles.nav_link}`}   > {username}</Link> </li>:""
            }   
            <li>
              { user ? <button onClick={logOut}  className={`${styles.button}`}>cerrar sesión</button> : <Link to="/signin" className={`${styles.button}`} id="form-open">
                  Iniciar Sesion
                  </Link> }
            
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;