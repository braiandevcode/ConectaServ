import { validateFieldsWithErrorsUI } from "../ui/fieldsValidateUI.js";
import setupEventsByStep from "../ui/stepFormRegister.js";
import { TFieldName } from "../types/types.js";
import { globalStateValidationStep } from "../config/constant.js";
import eventSubmit from "../events/eventSubmit.js";

// DOCUMENT
const D: Document = document; //ABREVIAR NOMBRE DE DOCUMENT
const $FORM_PROFESSIONAL = D.querySelector(`.register-professional`) as HTMLFormElement | null;
const $FORM_CLIENT = D.querySelector(".register-client") as HTMLFormElement | null;

// FUNCION DE REGISTRO DE PROFESIONALES
const register = (): void => {
    const form = $FORM_CLIENT ?? $FORM_PROFESSIONAL as HTMLFormElement; // SEGUN EL FORMULARIO

    // PARSEAR Y OBTENER VALORES DEL LOCALSTORAGE
    const savedData = JSON.parse(localStorage.getItem('stepData') || '{}') as Record<string, Record<string, string | boolean>>;

    // SI EXISTE LA CLAVE EN EL LOCALSTORAGE
    if (savedData) {
        // RECORREMOS LOS PARES CLAVE-VALOR DEL OBJETO
        for (const [key, _] of Object.entries(savedData)) {
            if (!form) return;

            Object.entries(savedData[key]).forEach(([key, value]) => {
                const input = document.querySelector(`[name="${key}"]`) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null;

                if (input) {
                    // REPOBLAR VALORES
                    if (input.type === 'checkbox') {
                        if (input instanceof HTMLInputElement) {
                            input.checked = Boolean(value);
                            globalStateValidationStep.isTerms = input.checked; //ACTUALIZAR EN GLOBAL EL CHECKED
                        }
                    }

                    // QUITAR CUALQUIER SELECTED ACTIVO
                    input.querySelectorAll('option').forEach(opt => opt.removeAttribute('selected'));

                    // OBTENER EL VALOR COMO STRING Y LIMPIARLO
                    const valueStr: string = String(value).trim();

                    // BUSCAR LA OPCION CORRECTA POR VALUE 
                    const optionToSelect = Array.from(input.querySelectorAll('option')).find(opt => !opt.hasAttribute('disabled') && opt.value === valueStr.toLowerCase());

                    if (optionToSelect) {
                        optionToSelect.setAttribute('selected', '')
                        optionToSelect.selected = true;
                        optionToSelect.value = valueStr;
                        globalStateValidationStep.isSelected = optionToSelect.selected; //ACTUALIZAR EN GLOBAL EL SELECTED
                    }

                    if (input.type !== 'file') {
                        input.value = String(value);
                    } else {
                        // Solo limpiar input file programáticamente
                        (input as HTMLInputElement).value = '';
                    }

                    const inputFile = input as HTMLInputElement; //TIPOS FILE
                    // const inputFiles = input as HTMLInputElement; //TIPOS FILES

                    // VALIDAR DE FORMA MANUAL
                    const validation = validateFieldsWithErrorsUI({
                        fieldName: key as TFieldName,
                        values: [],
                        value: input.value.trim() ? input.value : '',
                        file: inputFile.files && inputFile.files.length > 0 ? inputFile.files[0] : null,
                        files: inputFile.files && inputFile.files.length > 0 ? inputFile.files : null,
                    });

                    // MARCAR VISUALMENTE SI ES VALIDO
                    const parent = input.closest('[data-message]') as HTMLDivElement;
                    // DEL PARENT EL ELEMENTO CON LASE ".has-error"
                    const span = parent?.querySelector('.has-error') as HTMLSpanElement | null;

                    // SI ES VALIDO APLICAR ESTILOS 
                    if (validation?.isValid) {
                        input.classList.add('is-valid');
                        input.classList.remove('is-invalid');
                        if (span) span.textContent = ''; //LIMPIAR SPAN
                    } else {
                        input.classList.add('is-invalid');
                        input.classList.remove('is-valid');
                        if (span) span.textContent = validation?.error || '';
                    }

                }
            });
        }
    }

    // ACTIVAR LISTENERS DE PASOS FORMULARIOS REGISTRO
    // SI ES CLIENTE
    if ($FORM_CLIENT) {
        setupEventsByStep({ step: 0, form });
        eventSubmit({ form: $FORM_CLIENT });
    }

    // SI ES EL PROFESIONAL
    if ($FORM_PROFESSIONAL) {
        setupEventsByStep({ step: 1, form });
        setTimeout(() => {
            setupEventsByStep({ step: 2, form });
            setupEventsByStep({ step: 3, form });
            setupEventsByStep({ step: 4, form });
            setupEventsByStep({ step: 5, form });
        }, 0);
    }

};

/*
    ES UN EVENTO ESPECIAL QUE SIEMPRE SE DISPARA INCLUSO CUANDO EL NAVEGADOR MUESTRA UN PAGINA DESDE EL BFCACHE 
    (ALGO QUE EL EVENTO DOMContentLoaded O INCLUSO EL  popstate NO HACEN ).
*/

history.pushState({}, '', location.href);

window.addEventListener('popstate', () => {
    const form = $FORM_CLIENT ?? $FORM_PROFESSIONAL; // SEGUN EL FORMULARIO
    localStorage.removeItem('stepData');
    form?.querySelectorAll('input[name], textarea[name], select[name]');
    form?.classList.remove('is-valid');
    form?.classList.remove('is-invalid');
    console.log('Atrás detectado → limpiando localStorage');
});

export default register;
