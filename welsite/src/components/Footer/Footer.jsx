import React from "react";
import styles from './Footer.module.css';
import Logo from '../../assets/img/LOGOCOLSAM.png'; 

const Footer = () => {
    return (
        
        <footer className={styles.footer}> {/* Utiliza la clase del módulo CSS */}
        
            <div>
                <span>Copyright © 2023 All Rights Reserved</span>
                <img src={Logo} alt="" srcset="" />
            </div>
        </footer>
    )
}

export default Footer;
