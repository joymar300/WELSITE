import React from "react";
import styles from './Creadores.module.css'; // Importa los estilos del módulo CSS
import gato from '../../assets/img/gato.webp'
import BotonPrender from "../../components/botonoliver/botonOliver";

const Creadores = () => {
    return (
        <>
        <div className={styles.inicio}>
                <div className={styles.titulo}>
                    <h2>Quienes Somos</h2>
                   
                </div>
            </div>
            <div className={styles.somos}>
            <div className={styles.img}>
                <img src={gato} alt="" />
            </div>
            <div className={styles.text}>
                <h2>Quienes somos</h2>
                        <p>Somos un equipo apasionado y comprometido con la educación en ciencias sociales. Nuestro objetivo es proporcionarte recursos de alta calidad que estimulen tu curiosidad y te inspiren a aprender de manera activa. Valoramos la diversidad y fomentamos el aprendizaje colaborativo. Estamos aquí para apoyarte en tu viaje educativo y ayudarte a desarrollar habilidades en la asignatura. Únete a nosotros en Weltsite y descubre un mundo de conocimiento en nuestra plataforma educativa.</p>
                    </div>
            </div>
        <section className={styles.services}>
            
            <h2>Creadores</h2>
            {/* <p>Explore our wide range of camping gear services.</p> */}
            <ul className={styles.cards}>
                <li className={styles.card}>
                    <img src="https://w7.pngwing.com/pngs/442/477/png-transparent-computer-icons-user-profile-avatar-profile-heroes-profile-user.png" alt="img" />
                    <h3>Valery</h3>
                    <p>Diseño</p>
                </li>
                {/* Repite para otros elementos */}
                <li className={styles.card}>
                    <img src="https://w7.pngwing.com/pngs/442/477/png-transparent-computer-icons-user-profile-avatar-profile-heroes-profile-user.png" alt="img" />
                    <h3>Kathyana</h3>
                    <p>Diseño</p>
                </li>
                <li className={styles.card}>
                    <img src="https://w7.pngwing.com/pngs/442/477/png-transparent-computer-icons-user-profile-avatar-profile-heroes-profile-user.png" alt="img" />
                    <h3>Daniel</h3>
                    <p>Desarrollador</p>
                </li>
                <li className={styles.card}>
                    <img src="https://w7.pngwing.com/pngs/442/477/png-transparent-computer-icons-user-profile-avatar-profile-heroes-profile-user.png" alt="img" />
                    <h3>Isabella</h3>
                    <p>Desarrollador</p>
                </li>
                <li className={styles.card}>
                    <img src="https://w7.pngwing.com/pngs/442/477/png-transparent-computer-icons-user-profile-avatar-profile-heroes-profile-user.png" alt="img" />
                    <h3>Alejandra</h3>
                    <p>Desarrollador</p>
                </li>
                <li className={styles.card}>
                    <img src="https://w7.pngwing.com/pngs/442/477/png-transparent-computer-icons-user-profile-avatar-profile-heroes-profile-user.png" alt="img" />
                    <h3>Veronica</h3>
                    <p>Diseño</p>
                    <BotonPrender/>
                </li>
            </ul>
        </section>
        </>
    )
}

export default Creadores;
