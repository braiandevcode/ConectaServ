import { setupEventsByStep } from "../ui/stepFormRegister.js";

// DOCUMENT
const D: Document = document; //ABREVIAR NOMBRE DE DOCUMENT

// const stepKey = String(step); //CONVERTIR A STRING EL VALOR DEL PASO

const $FORM: HTMLFormElement | null = D.querySelector(`.register-professional`);


//  FUNCION DE REGISTRO DE PROFESIONALES
const registerProfessional = (): void | null => {
    if (!$FORM) return null;
    // hide({ $el: , cls: ['form-step--hidden']});
    setTimeout(() => {
        setupEventsByStep({ step: 2, form: $FORM });
        setupEventsByStep({ step: 3, form: $FORM });
        setupEventsByStep({ step: 4, form: $FORM });
        setupEventsByStep({ step: 5, form: $FORM });
    }, 0);
    setupEventsByStep({ step: 1, form: $FORM });
};

export default registerProfessional;
