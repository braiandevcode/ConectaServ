import registerClient from "./scripts/registerClient.js";
import { clickEvents } from "./events/clickEvents.js";
import services from "./scripts/services.js";
import home from "./scripts/home.js";
import registerProfessional from "./scripts/registerProfessional.js";

// --------------------ULTIMA VERSION BRAIAN-------------------//

document.addEventListener('DOMContentLoaded', () => {
    clickEvents();
    if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
        home();
    };

    if (window.location.pathname === '/src/pages/register-client.html' || window.location.pathname === '/src/pages/register-pro.html') {
        registerProfessional(); //REGISTRO PROFESIONAL
        registerClient(); // REGISTRO CLIENTE
    };

if (window.location.pathname === '/src/pages/services.html') {
    home();    
    services();
    }

});