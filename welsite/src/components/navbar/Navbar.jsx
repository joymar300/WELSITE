import { ReactDOM } from "react-dom";
import "./style.css";

const Navbar = ()=>{
  return (
    <>
    <header class="header">
        <nav class="nav container">
          <div class="barra">
            <img src="src/assets/images/colsamcamisa .PNG"  height="80px" alt="" srcset=""/>
            <h2 class="nav_logo"><a href="#">Welsite</a></h2>
          </div>
          
  
          <ul class="menu_items">
            <span class="material-symbols-outlined" id="menu_toggle">close</span>
            <li><a href="#" class="nav_link">Inicio</a></li>
            <li><a href="#" class="nav_link">Mapa</a></li>
            <li><a href="#" class="nav_link">Clases</a></li>
            <li><a href="#" class="nav_link">juegos</a></li>
            <li><a href="#" class="nav_link">Creadores</a></li>
            <li><a class="button" id="form-open">Iniciar Sesion</a></li>
          </ul>
  
          <span class="material-symbols-outlined" id="menu_toggle">menu</span>  
           {/* <img src="images/bars.svg" alt="timesicon"  />  */}
        </nav>
        </header>
       
    </>
    

    )
}

export default Navbar;