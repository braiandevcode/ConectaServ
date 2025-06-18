import { TFieldName, TFormElement } from "../types/types";
import addInputListener from "../events/addInputListener.js";
import saveDataStep from "../utils/saveDataStep.js";
import { formState } from "../config/constant.js";
import { validateStepBasic } from "../ui/stepValidationsFields.js";
import { iFieldState } from "../interfaces/interfaces";

// REGISTRO DE CLIENTE
const registerClient = () => {
    const D: Document = document;
    const $FORM_CLIENT: TFormElement | null = D.querySelector('.register-client');

    if (!$FORM_CLIENT) return;

    const inputs: NodeListOf<HTMLInputElement> = $FORM_CLIENT.querySelectorAll('input:not(.terms)');
    const select: HTMLSelectElement | null = $FORM_CLIENT.querySelector('select');
    const checkboxTerms: HTMLInputElement | null = $FORM_CLIENT.querySelector('input[name="terms"]');
    const allFieldsClient = select ? [...inputs, select] : [...inputs];

    const $BUTTON_SUBMIT: HTMLButtonElement | null = $FORM_CLIENT.querySelector('button[type="submit"]');

    // VALIDACION GENERAL DE CAMPOS
    const validateStepBasicAll = (): boolean => {
        return allFieldsClient.every(el => {
            const result = validateStepBasic({
                fieldName: el.name as TFieldName,
                value: el.value,
            });
            return result.isValid;
        });
    };

    // ACTUALIZAR EL ESTADO DEL BOTÓN
    const updateButtonState = () => {
        const isValidFieldsAll = validateStepBasicAll();
        const isCheckboxTermsValid = checkboxTerms?.checked; // Verifica si el checkbox está marcado

        // ACTUALIZA EL ESTADO DEL BOTÓN SEGÚN LA VALIDEZ DE LOS CAMPOS Y EL CHECKBOX
        if (isValidFieldsAll && isCheckboxTermsValid) {
            $BUTTON_SUBMIT?.removeAttribute('disabled');
        } else {
            $BUTTON_SUBMIT?.setAttribute('disabled', 'true');
        }
    };

    // EVENTO CHANGE E INPUT EN REGISTRO DE CLIENTE
    addInputListener({
        element: $FORM_CLIENT as TFormElement,
        callback: () => {
            saveDataStep({ step: "0", elements: allFieldsClient }); //CARGAR DATOS DEL CLIENTE
            console.log(formState.dataByStep); // DEPURACION DE LOS DATOS QUE SE GUARDAN EN TIPEO
            updateButtonState(); // ACTUALIZA EL ESTADO DEL BOTÓN
        }
    });

    // ESCUCHAR CAMBIOS EN EL CHECKBOX DE TERMINOS UTILIZANDO addInputListener
    if (checkboxTerms) {
        addInputListener({
            element: checkboxTerms,
            callback: updateButtonState
        });
    }

    // RECORRER Y VALIDAR CADA CAMPO
    allFieldsClient.forEach(el => {
        addInputListener({
            element: el,
            callback: () => {
                const fieldName = el.name as TFieldName; // NAME
                const value: string = el.value; // VALUE

                const messageError = document.querySelector(`[data-message=${fieldName}] .has-error`) as HTMLSpanElement | null;
                if (!messageError) return;

                // VALIDACION BASE PARA LOS INPUTS
                const result: iFieldState = validateStepBasic({ fieldName, value });

                // APLICAR CLASES
                el.classList.toggle('is-valid', result.isValid);
                el.classList.toggle('is-invalid', !result.isValid);

                // ACTUALIZAR EL MENSAJE DE ERROR SOLO SI CAMBIA
                if (!result.isValid) {
                    // SOLO ACTUALIZAR EL MENSAJE SI EL ERROR CAMBIA
                    if (messageError.textContent !== result.error) {
                        messageError.textContent = result.error;
                    }
                } else {
                    // SI LA VALIDACION ES CORRECTA, LIMPIAR EL MENSAJE
                    messageError.textContent = '';
                }

                updateButtonState(); // ACTUALIZA EL ESTADO DEL BOTÓN
            }
        });
    });
};

export default registerClient;
