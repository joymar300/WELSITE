import PropTypes from 'prop-types';
import styles from '../../components/tarjetas temas/targetTheme.module.css'
import { Link, useNavigate } from 'react-router-dom';
import {BsFillTrash3Fill} from "react-icons/bs";
import { BiTrash } from 'react-icons/bi';
const TarjetTheme =({grado, content, index, borrarContenido, user})=>{
    const navigate = useNavigate();
    const navigateToDetail = () => {
        navigate(`/clases/tipocontendio/${grado}/${content.title}` , {state:{grado, content}});
      };
    const borrarc =()=>{
        borrarContenido(content.id)
    }
return(
    <>
        <div className={styles.tarjeta}>
            <div className={styles.contenido}>
            <div className={styles.ladoIzq}>
                <div className={styles.titulocard}>
                <h2 className={styles.titulo}>{content.title}</h2>
                </div>
                <div className={styles.cuerpo}>
                    <p>
                        {content.text}
                    </p>
                    <div className={styles.buttonPosition}>

                        <button className={styles.btn} onClick={navigateToDetail} > {/* Usa Link en lugar de <a> */}
                        Acceder al Contenido
                        </button>
                        {   user != "" ? <button className={styles.btnDelete}  onClick={borrarc}>Eliminar</button>:""
                        }
                    </div>
                </div>
            </div>
            {/* <div className={styles.ladoDer}>
                <img src={gato} alt="" srcset="" />
            </div> */}
            </div>
        </div>
    
    </>
)
}

TarjetTheme.propTypes ={
    grado: PropTypes.string.isRequired,
    content: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    borrarContenido: PropTypes.func.isRequired,
    user: PropTypes.string.isRequired
}

export default TarjetTheme;