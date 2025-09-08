import { clickEvents } from "./events/clickEvents.js";
import home from "./scripts/home.js";
import register from "./scripts/register.js";
import eventSubmit from "./events/eventSubmit.js";
import { pathPages } from "./config/constant.js";
import services from "./scripts/services.js";

// --------------------ULTIMA VERSION BRAIAN-------------------//

document.addEventListener('DOMContentLoaded', () => {    
    const currentStep = JSON.parse(localStorage.getItem("currentStep") || "null"); // NULO SI NO EXISTE
    
    if(String(currentStep).trim() === "null"){
        localStorage.setItem('currentStep', "1");
    }

    const path: string = window.location.pathname;
    const { PATH_FORM_CLIENT, PATH_FORM_PROFESSIONAL, PATH_TERMS, PATH_PRIVACY } = pathPages;
    
    clickEvents();
    if (path === '/index.html' || path === '/') {
        home();
    };

    if ((path === PATH_FORM_CLIENT || path === PATH_FORM_PROFESSIONAL || path === PATH_TERMS || path === PATH_PRIVACY)) {
        register(); //REGISTRO 
    } else {
        localStorage.removeItem('stepData'); //REMOVER SI SE NAVEGA A CUALQUIER OTRA PARTE QUE NO SEA LA DE LA CONDICION
    };

    if (path === '/src/pages/services.html') {
        home();
        services();
    }
});