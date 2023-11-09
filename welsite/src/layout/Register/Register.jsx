import React, { useEffect, useState } from 'react';
import styles from './register.module.css'; // Asegúrate de tener la ruta correcta al archivo CSS.
import {BsPersonFill} from 'react-icons/bs'
import {RiLockPasswordFill} from 'react-icons/ri'
import Logo from '../../assets/img/LOGOCOLSAM.png';
import { auth } from '../../config/firebase';
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase';
import { addDoc, collection } from 'firebase/firestore';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


  const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] =useState("");
    const [password, setPassword]= useState("");
    const [fName, setFName]= useState("");
    const [mName, setMName]= useState("");
    const [fApellido, setFApellido]= useState("");
    const [sApellido, setSApellido]= useState("");
    const MySwal = withReactContent(Swal)
    const crearUser = async ()=>{
     try{ 
      const loadingAlert = MySwal.mixin({
        title: 'Creando contenido',
        icon: 'info',
        showConfirmButton: false,
        allowOutsideClick: false,
        didOpen: () => {
          MySwal.showLoading(); // Muestra el indicador de progreso
        },
      });
      loadingAlert.fire();

        await createUserWithEmailAndPassword(auth,email,password).then(async(userCredential)=>{
          var user = userCredential.user;
          try{
            const docRef = await addDoc(collection(db, "users"), {
                fName: fName,
                mName: mName,
                fApellido: fApellido,
                sApellido: sApellido,
                email: email,
                uid: user.uid,
                
              });
              console.log("Document written with ID: ", docRef.id);
              
            }catch(error){
              console.log(error)
          }
          
        });
        
        MySwal.close();
        Swal.fire({
          title: 'Creación exitosa',
          text: 'El usuario ha sido creado con éxito.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });
      navigate("/");

    } catch (err){
      console.log(err)
      Swal.fire({
        title: 'Error al crear usuario',
        text: err,
        icon: 'error',
        confirmButtonText: 'Cerrar',
      });
    }


      
       
 
  
  
    };



    
    return (
      <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.title}>
            <span>Register Form</span>
            <img src={Logo} alt="" srcset="" />
            </div>
          <form action="#">
            <div className={styles.row}>
             <i><BsPersonFill/></i> 
              <input type="text" placeholder="Primer Nombre" onChange={(e) => setFName(e.target.value)} required/>
            </div>
            <div className={styles.row}>
             <i><BsPersonFill/></i> 
              <input type="text" placeholder="Segundo Nombre (opcional)" onChange={(e) => setMName(e.target.value)} />
            </div>
            <div className={styles.row}>
             <i><BsPersonFill/></i> 
              <input type="text" placeholder="Primer apellido" onChange={(e) => setFApellido(e.target.value)} required/>
            </div>
            <div className={styles.row}>
             <i><BsPersonFill/></i> 
              <input type="text" placeholder="Segundo Apellido (opcional)" onChange={(e) => setSApellido(e.target.value)} />
            </div>
            <div className={styles.row}>
             <i><BsPersonFill/></i> 
              <input type="text" placeholder="Email or Phone" onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div className={styles.row}>
              <i><RiLockPasswordFill/></i>
              <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            {/* <div className={styles.pass}><a href="#">Forgot password?</a></div> */}
            <div className={`${styles.row} ${styles.button}`}>
              <input type="button" onClick={crearUser} value="Login"/>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;

