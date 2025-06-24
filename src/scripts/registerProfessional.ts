import stepInputs from "../ui/stepFormRegister.js";
import clearElementChild from "../dom/clearElementChild.js";
import evaluateCategory from "../dom/evaluateCategory.js";
import observeDOMChanges from "../utils/observerDOMOnChanges.js";
import addInputListener from "../events/addInputListener.js";
import { hide } from "../ui/auxiliars.js";
import { createTitleCategorySelected } from "../dom/createElementsDom.ts.js";
import { TFormElement } from "../types/types.js";

// DOCUMENT
const D: Document = document; //ABREVIAR NOMBRE DE DOCUMENT

// SELECT
const $FORM_CATEGORY_SELECTED: HTMLSelectElement | null = D.querySelector('.form-professional-groupSelectCategory__select');  //SELECT DE CATEGORIAS

// CONTENEDOR PRINCIPAL DE SECCIONES
const $FORM_CONTAINER_GROUPS: HTMLDivElement | null = D.querySelector('.form-professional-groupSpeciality');

// CONTENEDORES CHECKS
const $GROUP_CONTEXT_CHECKS: HTMLDivElement | null = D.querySelector('.form-professional-groupSpeciality__contexts-body');
const $GROUP_SPECIALITY_CHECKS: HTMLDivElement | null = D.querySelector('.form-professional-groupSpeciality__services-body'); // CONTENEDOR DE CHECKS DE SERVICIOS
const $GROUP_DAYS_CHECKS: HTMLDivElement | null = D.querySelector('.form-professional-groupSpeciality__days-body'); // CONTENEDOR DE CHECKS DE DIAS
const $GROUP_HOUR_CHECKS: HTMLDivElement | null = D.querySelector('.form-professional-groupSpeciality__hours-body'); // CONTENEDOR DE CHECKS DE HORARIOS

// FILTRAR Y ASEGURAR QUE NO HAYA NULOS
const resetAllCheckboxContainers: HTMLDivElement[] = [
    $GROUP_CONTEXT_CHECKS,
    $GROUP_HOUR_CHECKS,
    $GROUP_DAYS_CHECKS,
    $GROUP_SPECIALITY_CHECKS
].filter((el): el is HTMLDivElement => el !== null);


//  FUNCION DE REGISTRO DE PROFESIONALES
const registerProfessional = (): void => {
    if (!$FORM_CONTAINER_GROUPS) return; // SI ES NULL SOLO RETORNAR

    // OCULTAR ELEMENTO
    hide({ $el: $FORM_CONTAINER_GROUPS, cls: ['form-step--hidden'] });

    // FUNCION QUE TIENE UN EVENTO DE CAMBIO EN UN SELECT Y ESPERA UNA CALLBACK
    addInputListener({
        element: $FORM_CATEGORY_SELECTED as TFormElement,
        callback: () => {
            // FUNCION PARA LIMPIAR LOS CHECKBOX PREVIOS
            clearElementChild({ elements: resetAllCheckboxContainers }); // LLAMAR FUNCION PARA LIMPIAR TODO ANTES

            // RENDERIZAR NUEVOS CHECKS DINAMICOS
            evaluateCategory({
                formContainerGroups: $FORM_CONTAINER_GROUPS,
                formCategorySelected: $FORM_CATEGORY_SELECTED,
                groupContextCheckbox: $GROUP_CONTEXT_CHECKS,
                groupDaysCheckbox: $GROUP_DAYS_CHECKS,
                groupHoursCheckbox: $GROUP_HOUR_CHECKS,
                groupServiceCheckbox: $GROUP_SPECIALITY_CHECKS
            });

            // ENGANCHAR VALIDACION DINAMICA PARA EL PASO 3
            stepInputs({ step: 3, formSelector: 'professional', btnSelector: 'container-btn__next' });

            stepInputs({ step: 5, formSelector: 'professional', btnSelector: 'container-btn__next' });
        }
    });

    //----------------------------SECCION DE EJECUCION DE FUNCIONES PARA LOS PASOS-----------------------------------//
    // PASO 1: TEXT + SELECT
    stepInputs({ step: 1, formSelector: 'professional', btnSelector: 'container-btn__next' });


    // PASO  2: PRIMERO MOSTRAR EL SELECT, LUEGOS LOS CHECKBOX SON GESTIONADOS POR EL EVENTO CHANGE
    stepInputs({ step: 2, formSelector: 'professional', btnSelector: 'container-btn__next' });


    observeDOMChanges({
        containerSelector: '[data-step="3"]',
        onChangeDOM: createTitleCategorySelected,
    });

    observeDOMChanges({
        containerSelector: '[data-step="4"]',
        onChangeDOM: () => {
            // PASO  4: PRESUPUESTOS
            stepInputs({ step: 4, formSelector: 'professional', btnSelector: 'container-btn__next' });
        }
    });
};

export default registerProfessional;
