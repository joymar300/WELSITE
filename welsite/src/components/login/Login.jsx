import { ReactDOM } from "react";

const Login = ()=>{

    return (
    <>
        <div class="form signup_form">
            <form action="#">
                <h2>Crear Cuenta</h2>

                <div class="input_box">
                <input type="email" placeholder="Enter your email" required />
                <i class="uil uil-envelope-alt email"></i>
                </div>
                <div class="input_box">
                <input type="password" placeholder="Create password" required />
                <i class="uil uil-lock password"></i>
                <i class="uil uil-eye-slash pw_hide"></i>
                </div>
                <div class="input_box">
                <input type="password" placeholder="Confirm password" required />
                <i class="uil uil-lock password"></i>
                <i class="uil uil-eye-slash pw_hide"></i>
                </div>

                <button class="button">Crear Cuenta </button>

                <div class="login_signup">Ya tienes Cuenta? <a href="#" id="login">Iniciar Sesion</a></div>
            </form>
        </div>
    </>);
}