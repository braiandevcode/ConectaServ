import home from "./scripts/home.js";
import modalRol from "./scripts/modalRol.js";
import registerProfessional from "./scripts/registerProfessional.js";

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
        home();
        modalRol();
    }

    if (window.location.pathname === '/src/pages/register-client.html' || window.location.pathname === '/src/pages/register-pro.html') {
        registerProfessional();
    }
});