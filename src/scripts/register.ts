import { validateFieldsWithErrorsUI } from "../ui/fieldsValidateUI.js";
// import setupEventsByStep from "../ui/stepFormRegister.js";
import { TCategoryConfig, TCategoryKey, TData, TFieldName, TInputs } from "../types/types.js";
import { categoryConfigs, formState, globalStateValidationStep } from "../config/constant.js";
import eventTypeInput from "../events/eventTypeInput.js";
import eventTypeChange from "../events/eventTypeChange.js";
import eventSubmit from "../events/eventSubmit.js";
// import stepThree from "../ui/stepThree.js";
// import stepTwoSelectCategory from "../ui/stepTwoSelectCategory.js";
import { hide, show } from "../ui/auxiliars.js";
import getStepValidationMap from "../config/getStepValidationStrategies.js";
import setValidationStrategiesMap from "../config/setValidationStrategiesMap.js";
// import { createStepBudget } from "dom/createElementsDom.ts.js";
import createGroupCheckBoxes from "../dom/createGroupCheckBoxes.js";
// import { createStepBudget, deleteStepBudget } from "../dom/createElementsDom.ts.js";
import { ECategoryKey } from "../types/enums.js";

// DOCUMENT
const D: Document = document; //ABREVIAR NOMBRE DE DOCUMENT
const $FORM_PROFESSIONAL = D.querySelector(`.register-professional`) as HTMLFormElement | null;
const $FORM_CLIENT = D.querySelector(".register-client") as HTMLFormElement | null;

// FUNCION DE REGISTRO DE PROFESIONALES
const register = (): void | null => {
    // OPERACION DE FUSION NULA
    const form = $FORM_CLIENT ?? $FORM_PROFESSIONAL as HTMLFormElement; //SI EL VALOR DE LA IZQUIERDA ES NULO O INDEFINIDO USA EL VALOR DE LA DERECHA 

    // PARSEAR Y OBTENER VALORES DEL LOCALSTORAGE DEL "stepData"
    const savedData = JSON.parse(localStorage.getItem('stepData') || '{}') as Record<string, Record<string, string | boolean>>;
    // PARSEAR Y OBTENER VALORES DEL LOCALSTORAGE DEL "currentStep"
    const currentStep = JSON.parse(localStorage.getItem("currentStep") || "null"); // NULO SI NO EXISTE

    console.log(savedData);

    // SI EXISTE LA CLAVE EN EL LOCALSTORAGE
    if (savedData) {
        // MAPEAR TODOS LOS VALORES DE LAS CLAVES DEL OBJETO QUE SIMBOLIZA CADA PASO Y GUARDAR EN NUEVO ARRAY, SUS VALORES SON OBJETOS Y/O ARRAYS
        const stepDataArray: Record<string, TData>[] = Object.values(savedData);
        const $FORM_CONTAINER_GROUPS: HTMLDivElement | null = D.querySelector('.form-professional-groupSpeciality') ?? null;

        // COPIAMOS TODO LO QUE CONTIENE EL ARRAY Y GUARDAMOS SUS NOMBRES DE CLAVES CON SUS VALORES EN UN NUEVO OBJETO DESTINO.
        // GUARDANDO EN UN SOLO OBJETO TODAS LAS CLAVES-VALOR
        const combinedData: Record<string, TData> = Object.assign({}, ...stepDataArray);

        if (!form) return null; // SI NO HAY FORMULARIO RETORNAMOS NULO

        // RECORREMOS LOS PARES CLAVE-VALOR DEL OBJETO COMPLETO "combinedData"
        Object.entries(combinedData).forEach(([key, value]) => {
            console.log('clave: ', key);

            // CREAMOS UNA CONSTANTE Y GUARDAMOS EN CADA VUELTA LA REFERENCIA AL INPUT POR SU NAME(aqui equivale a los nombres de cada clave del objeto)
            const input = D.querySelector(`[name="${key}"]`) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null;

            console.log('es null?', input === null); // ← esto sí es inmediato
            // SI EXISTE ESE ELEMENTO EN ESE MOMENTO EJECUTAR
            if (input) {

                 console.log('dentro del if con input:', input);
                console.log('es nulo pero me meto porque se me antoja... ¿raro no?');
                
                console.log((input instanceof HTMLInputElement) && input.type === 'checkbox');
                console.log('tipo: ', input.type);
                

                // REPOBLAR VALORES
                if ((input instanceof HTMLInputElement) && input.type === 'checkbox') {
                    input.checked = Boolean(value);
                    globalStateValidationStep.isTerms = input.checked; //ACTUALIZAR EN GLOBAL EL CHECKED
                    globalStateValidationStep.isValidCheckBoxesDetailsProfession = input.checked; //ACTUALIZAR EN GLOBAL EL CHECKED

                    console.log('elemento de campo de check: ', input);
                    
                    const event:Event = new Event('change');
                    input.dispatchEvent(event);
                }

                if ((input instanceof HTMLSelectElement)) {
                    // const $FORM_CONTAINER_GROUPS: HTMLDivElement | null = D.querySelector('.form-professional-groupSpeciality') ?? null;
                    console.log('valor del select: ', input.value);

                    // QUITAR CUALQUIER SELECTED ACTIVO
                    input.querySelectorAll('option').forEach(opt => opt.removeAttribute('selected'));

                    // OBTENER EL VALOR COMO STRING Y LIMPIARLO
                    const valueStr: string = String(value).trim();

                    // BUSCAR LA OPCION CORRECTA POR VALUE 
                    const optionToSelect = Array.from(input.querySelectorAll('option')).find(opt => !opt.hasAttribute('disabled') && opt.value === valueStr.toLowerCase());

                    // ESTABLECER EL SELECTED AL OPTION ACTUAL
                    if (optionToSelect) {
                        optionToSelect.setAttribute('selected', '')
                        optionToSelect.selected = true;
                        optionToSelect.value = valueStr;
                        globalStateValidationStep.isSelected = optionToSelect.selected; //ACTUALIZAR EN GLOBAL EL SELECTED

                        const validCategoryKeys = Object.values(ECategoryKey); // ["reparacion-mantenimiento", "jardineria", "mudanza-transporte"]

                        if (validCategoryKeys.includes(input.value as TCategoryKey)) {
                            const config: TCategoryConfig = categoryConfigs[input.value as TCategoryKey];
                            if (!config) {
                                formState.hasContext = false;
                                hide({ $el: $FORM_CONTAINER_GROUPS, cls: ['form-step--hidden'] });
                                return;
                            }

                            // const sectionProfessional = D.querySelector(`[data-section="professional"]`);

                            formState.hasContext = config.hasContext;
                            const newStrategies: Record<number, TInputs> = getStepValidationMap({ hasBudget: config.budget });
                            setValidationStrategiesMap({ map: newStrategies });
                            createGroupCheckBoxes({ options: config.options });
                        }

                        // else {
                        //     console.log('Categoría no válida:',input.value);
                        // }
                        // stepTwoSelectCategory({ step: 2, form });
                    }

                    // ARRAY DE TODOS LOS ELEMENTOS CON EL ATRIBUTO data-step
                    const section: HTMLDivElement[] | null = Array.from(D.querySelectorAll('[data-step]')) ?? [];
                    const btnPrev: HTMLButtonElement | null = D.querySelector('.register-userProfessional__arrow-left'); // REFERENCIAMOS AL BOTON DE ATRAS

                    // SI TIENE ELEMENTOS
                    if (section.length > 0) {
                        const current = section.find(s => s.dataset.step === String(currentStep)); // ENCONTRAR EL PASO ACTUAL
                        const noCurrent = section.filter(s => s.dataset.step !== String(currentStep)); // ENCONTRAR LOS PASOS RESTANTES

                        //SI HAY PASO ACTUAL
                        if (current) {
                            show({ $el: current, cls: ['form-step--hidden'] }); // MOSTRAR EL PASO ACTUAL 
                            console.log(current);


                            // if(!btnNext) return;
                            const valuesCategoryKey = Object.values(ECategoryKey);

                            // SI EL PASO ACTUAL ES 1 OCULTAR LOS CHECKSBOXES DEL PASO 3
                            if (currentStep === 1) {
                                show({ $el: $FORM_CONTAINER_GROUPS, cls: ['form-step--hidden'] }); // SINO MOSTRARLO
                                hide({ $el: $FORM_CONTAINER_GROUPS, cls: ['form-step--hidden'] });

                                if (btnPrev) {
                                    btnPrev.dataset.step_prev = `${currentStep}`
                                }

                                hide({ $el: btnPrev, cls: ['register-userProfessional__arrow-left--hidden'] })
                            } else if (currentStep === 2) {
                                show({ $el: btnPrev, cls: ['register-userProfessional__arrow-left--hidden'] })
                                if (valuesCategoryKey.includes(input.value as TCategoryKey)) {
                                    console.log('sigue');
                                    if (btnPrev) {
                                        btnPrev.dataset.step_prev = `${currentStep - 1}`
                                    }
                                    show({ $el: $FORM_CONTAINER_GROUPS, cls: ['form-step--hidden'] }); // SINO MOSTRARLO
                                }
                            }
                        }

                        // SI HAY ELEMENTOS RESTANTES
                        if (noCurrent.length > 0) {
                            noCurrent.forEach(s => {
                                const btnNext: HTMLButtonElement | null = D.querySelector(`.container-btn__next[data-step="${s.dataset.step}"]`); //BTON SIGUIENTE DE CADA STEP
                                hide({ $el: s, cls: ['form-step--hidden'] }); // OCULTAR LOS DEMAS
                                hide({ $el: btnNext, cls: ['form-step--hidden'] }) //OCULTAR BOTONES
                            });
                        }
                    }
                }

                if (input.type !== 'file') {
                    input.value = String(value);
                } else {
                    // LIMPIAR INPUT FILE PROGRAMATICAMENTE
                    (input as HTMLInputElement).value = '';
                }

                const inputFile = input as HTMLInputElement; //TIPOS FILE

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
    eventTypeInput();
    eventTypeChange();
    eventSubmit();
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