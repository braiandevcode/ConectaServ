import { TFieldName, TFormElement } from "../types/types";
import saveDataStep from "../utils/saveDataStep.js";
import { formState, formStateValidField } from "../config/constant.js";
import { validateFieldsWithErrorsUI } from "../ui/fieldsValidateUI.js";
import { iFieldState } from "../interfaces/interfaces";

// RECORDAR: MAS ADELANTE SE PODRIA => MIGRARLO AL DE LOS EVENTOS DELEGADOS

// REGISTRO DE CLIENTE
const registerClient = () => {
    const D: Document = document; // DOCUMENT
    const $FORM_CLIENT: TFormElement | null = D.querySelector('.register-client'); // REFERENCIAR FORMULARIO CLIENTE

    if (!$FORM_CLIENT) return; // SI EL FORMULARIO NO EXISTE RETORNAR

    const inputs: NodeListOf<HTMLInputElement> = $FORM_CLIENT.querySelectorAll('input:not(.terms)'); // TODOS LOS INPUTS MENOS EL CHECK DE TERMINOS
    const select: HTMLSelectElement | null = $FORM_CLIENT.querySelector('select'); // SELECCION DE LUGAR

    const checkboxTerms: HTMLInputElement | null = $FORM_CLIENT.querySelector('input[name="terms"]'); // REFERENCIA ELEMENTO TERMINOS
    const allFieldsClient = select ? [...inputs, select] : [...inputs];

    const $BUTTON_SUBMIT: HTMLButtonElement | null = $FORM_CLIENT.querySelector('button[type="submit"]'); // BOTON SUBMIT

    // VALIDACION GENERAL DE CAMPOS
    const validateStepBasicAll = (): boolean => {
        return allFieldsClient.every(el => {
            const result = validateFieldsWithErrorsUI({
                fieldName: el.name as TFieldName,
                value: el.value,
                file: null,
                files: null
            });

            return result?.isValid === true; // ASEGURARSE DE QUE RESULT NO SEA NULL
        });
    };

    // ACTUALIZAR EL ESTADO DEL BOTÓN
    const updateButtonState = () => {
        const isValidFieldsAll = validateStepBasicAll(); // REUTILIZAR FUNCION DE VALIDACION DE CAMPOS
        const isCheckboxTermsValid = checkboxTerms?.checked; // VERIFICA SI EL CHECKBOX ESTA MARCADO

        // ACTUALIZA EL ESTADO DEL BOTÓN SEGÚN LA VALIDEZ DE LOS CAMPOS Y EL CHECKBOX
        if (isValidFieldsAll && isCheckboxTermsValid) {
            $BUTTON_SUBMIT?.removeAttribute('disabled');
        } else {
            $BUTTON_SUBMIT?.setAttribute('disabled', 'true');
        }
    };

    // EVENTO
    $FORM_CLIENT.addEventListener('input', () => {
        saveDataStep({ step: "0", elements: allFieldsClient }); // CARGAR DATOS DEL CLIENTE
        console.log(formState.dataByStep); // DEPURACION DE LOS DATOS QUE SE GUARDAN EN TIPEO
        updateButtonState(); // ACTUALIZA EL ESTADO DEL BOTÓN
    });

    // ESCUCHAR CAMBIOS EN EL CHECKBOX DE TERMINOS
    if (checkboxTerms) {
        checkboxTerms.addEventListener('change', updateButtonState);
    }

    // RECORRER Y VALIDAR CADA CAMPO
    allFieldsClient.forEach(el => {
        el.addEventListener('input', () => {
            const fieldName = el.name as TFieldName; // NAME
            const value: string = el.value; // VALUE

            const isValidFieldName = (name: string): name is TFieldName => {
                return name in formStateValidField;
            };

            if (!isValidFieldName(fieldName)) return null;

            const messageError = document.querySelector(`[data-message=${fieldName}] .has-error`) as HTMLSpanElement | null;
            if (!messageError) return;

            // VALIDACION BASE PARA LOS INPUTS
            const result = validateFieldsWithErrorsUI({ fieldName, value, file: null, files: null });

            if (!result) return; // ASEGURARSE DE QUE RESULT NO SEA NULL

            // APLICAR CLASES
            el.classList.toggle('is-valid', result.isValid);
            el.classList.toggle('is-invalid', !result.isValid);

            // ACTUALIZAR EL MENSAJE DE ERROR SOLO SI CAMBIA
            if (!result.isValid) {
                if (messageError.textContent !== result.error) {
                    messageError.textContent = result.error;
                }
            } else {
                messageError.textContent = '';
            }

            updateButtonState(); // ACTUALIZA EL ESTADO DEL BOTÓN
        });
    });
};

export default registerClient;
