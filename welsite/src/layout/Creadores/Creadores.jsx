import React from "react";
import styles from './Creadores.module.css'; // Importa los estilos del módulo CSS

const Creadores = () => {
    return (
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
                </li>
            </ul>
        </section>
    )
}

export default Creadores;
