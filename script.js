const header = document.querySelector(".header");
const menuToggler = document.querySelectorAll("#menu_toggle");

menuToggler.forEach(toggler => {
  toggler.addEventListener("click", () => header.classList.toggle("showMenu"));
});
const formOpenBtn = document.querySelector("#form-open"),
  home = document.querySelector(".home"),
  formContainer = document.querySelector(".form_container"),
  formCloseBtn = document.querySelector(".form_close"),
  signupBtn = document.querySelector("#signup"),
  loginBtn = document.querySelector("#login"),
  pwShowHide = document.querySelectorAll(".pw_hide");

// Función para cerrar el formulario
const closeForm = () => {
  home.classList.remove("show");
};

formOpenBtn.addEventListener("click", () => home.classList.add("show"));
formCloseBtn.addEventListener("click", closeForm);

// Evento para cerrar el formulario cuando se presione la tecla "Esc"
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeForm();
  }
});

pwShowHide.forEach((icon) => {
  icon.addEventListener("click", () => {
    let getPwInput = icon.parentElement.querySelector("input");
    if (getPwInput.type === "password") {
      getPwInput.type = "text";
      icon.classList.replace("uil-eye-slash", "uil-eye");
    } else {
      getPwInput.type = "password";
      icon.classList.replace("uil-eye", "uil-eye-slash");
    }
  });
});

signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.add("active");
});

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.remove("active");
});