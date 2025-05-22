import home from "./scripts/home.js";
import modalRol from "./scripts/modalRol.js";

document.addEventListener('DOMContentLoaded', ()=> {
    if(window.location.pathname === '/index.html' || window.location.pathname === '/'){
        home();
        modalRol();
    }
});