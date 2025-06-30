// import registerClient from "./scripts/registerClient.js";
import { clickEvents } from "./events/clickEvents.js";
import services from "./scripts/services.js";
import home from "./scripts/home.js";
import register from "./scripts/register.js";

// --------------------ULTIMA VERSION BRAIAN-------------------//

document.addEventListener('DOMContentLoaded', () => {
    const path: string = window.location.pathname;
    const pathClient: string = '/src/pages/register-client.html';
    const pathProfessional: string = '/src/pages/register-pro.html';
    const pathTerms: string = '/src/pages/termsAndConditions.html';
    const pathPrivacyPolicy: string = '/src/pages/privacyPolicy.html';
    clickEvents();
    if (path === '/index.html' || path === '/') {
        home();
    };

    if ((path === pathClient || path === pathProfessional || path === pathTerms || path === pathPrivacyPolicy)) {
        register(); //REGISTRO 
    } else {
        localStorage.removeItem('stepData'); //REMOVER SI SE NAVEGA A CUALQUIER OTRA PARTE QUE NO SEA LA DE LA CONDICION
    };

    if (path === '/src/pages/services.html') {
        home();
        services();
    }
});
