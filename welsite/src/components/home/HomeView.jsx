import { ReactDOM } from "react";

const HomeView = ()=>{
    return (<>
     <section class="home">

        <div class="row container">
            <div class="column">
            <h2>BIENVENIDOS A WELTSITE</h2>
            <p>¡Bienvenidos a Weltsite! Somos una página para estudiantes de 3ro y 4to del Colegio San Alberto Magno. Aquí encontrarás recursos divertidos y lecciones sobre ciencias sociales como historia, geografía y democracia. Únete, participa en actividades y juegos didácticos para mejorar tus conocimientos. ¡Aprende y diviértete en Weltsite!</p>
            <div class="buttons">
                <button class="btn">Read More</button>
                <button class="btn">Contact Us</button>
            </div>
            </div>
            <div class="column">
            <img src="src/assets/images/WELTSITE - NO BG-05.png" alt="heroImg" class="hero_img" />
            </div>
        </div>
     </section>
    
    </>);
}

export default HomeView;