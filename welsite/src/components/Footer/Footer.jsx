import React from "react";
import styles from './Footer.module.css'; // Importa los estilos del módulo CSS

const Footer = () => {
    return (
        
        <footer className={styles.footer}> {/* Utiliza la clase del módulo CSS */}
        
            <div>
                <span>Copyright © 2023 All Rights Reserved</span>
            </div>
        </footer>
    )
}

export default Footer;
