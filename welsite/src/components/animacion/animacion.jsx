import React from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './animacion.module.css'

const PageTransition = ({ children, location }) => (
  <CSSTransition
    key={location.key}
    classNames={styles.pagefade}
    timeout={300}
  >
    {children}
  </CSSTransition>
);

export default PageTransition;
