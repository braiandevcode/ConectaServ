import { formatMontoOnlyNumber } from "../ui/auxiliars.js";
import setupEventsByStep from "../ui/stepFormRegister.js";
// DOCUMENT
const D: Document = document; //ABREVIAR NOMBRE DE DOCUMENT

// FUNCION DE REGISTRO DE PROFESIONALES
const register = (): void | null => {
    const $FORM_PROFESSIONAL: HTMLFormElement | null = D.querySelector(`.register-professional`);
    const $FORM_CLIENT: HTMLFormElement | null = D.querySelector(".register-client");
    if ($FORM_CLIENT) {
        setupEventsByStep({ step: 0, form: $FORM_CLIENT });
    }
    
    if ($FORM_PROFESSIONAL) {
        setupEventsByStep({ step: 1, form: $FORM_PROFESSIONAL });
        setTimeout(() => {
            setupEventsByStep({ step: 2, form: $FORM_PROFESSIONAL });
            setupEventsByStep({ step: 3, form: $FORM_PROFESSIONAL });
            setupEventsByStep({ step: 4, form: $FORM_PROFESSIONAL });
            setupEventsByStep({ step: 5, form: $FORM_PROFESSIONAL });
        }, 0);
    }
};

export default register;
