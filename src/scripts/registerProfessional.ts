import { CONTEXTS, DATE_DAYS, DATE_HOUR, GARDENNING_AND_OUTDOOR_MAINTENANCE, REPAIR_AND_MAINTENANCE, MOVING_AND_TRANSPORT } from "../config/constant.js";
import clickEventStepFormRegister from "../helpers/clickEventStepFormRegister.js";
import renderModalOptions from "../helpers/renderModalOptions.js";
import stepInputs from "../helpers/stepFormRegister.js";


// CONTENEDOR PRINCIPAL DEL FORMULARIO
// const $REGISTER_USER_PROFESSIONAL_CONTAINER: HTMLDListElement | null = document.querySelector('.register-userProfessional__container');


// SELECT
const $CATEGORY_SPECIALITY_FORM: HTMLSelectElement | null = document.querySelector('.group-select select[name="category"]');  //SELECT DE CATEGORIAS

// CONTENEDOR PRINCIPAL DE SECCIONES
const $CONTAINER_SPECIALITY: HTMLElement | null = document.querySelector('.form-professional-groupSpeciality');

const $SECTION_GROUP_SPECIALITYS_WREAPPER_CHECKS: HTMLDivElement | null = document.querySelector('.form-professional-groupSpeciality__checks-wrapper');

// CONTENEDORES DE SECCIONES DE PASOS
const $PROFESSIONAL_CONTEXT: HTMLDivElement | null = document.querySelector('.form-professional-groupSpeciality__containerChecksContexts');
const $PROFESSIONAL_DATE: HTMLDivElement | null = document.querySelector('.form-professional-groupSpeciality__containerChecksDates');
const $PROFESSIONAL_SPECIALITY: HTMLDivElement | null = document.querySelector('.form-professional-groupSpeciality__containerChecksSpecialitys');
const $PROFESSIONAL_WRAPPER: HTMLDivElement | null = document.querySelector('.form-professional-groupSpeciality__checks-wrapper');

// SUBTITULOS
const $PROFESSIONAL_SPECIALITY_TITLE: HTMLHeadingElement | null = document.querySelector('.form-professional-groupSpeciality__header'); //TITULO ESPECIALIDADES
const $PROFESSIONAL_BUDGET_TITLE: HTMLHeadingElement | null = document.querySelector('.form-professional-groupBudget__header'); // TITULO PRESUPUESTO
const $PROFESSIONAL_PROFILE_TITLE: HTMLHeadingElement | null = document.querySelector('.form-professional-groupProfile__header'); // TITULO PERFIL

// CONTENEDORES CHECKS
const $PROFESSIONAL_CONTEXT_CHECKS: HTMLDivElement | null = document.querySelector('.form-professional-groupSpeciality__contexts-body');
const $PROFESSIONAL_SPECIALITY_CHECKS: HTMLDivElement | null = document.querySelector('.form-professional-groupSpeciality__services-body'); // CONTENEDOR DE CHECKS DE SERVICIOS
const $PROFESSIONAL_DAYS_CHECKS: HTMLDivElement | null = document.querySelector('.form-professional-groupSpeciality__days-body'); // CONTENEDOR DE CHECKS DE DIAS
const $PROFESSIONAL_HOUR_CHECKS: HTMLDivElement | null = document.querySelector('.form-professional-groupSpeciality__hours-body'); // CONTENEDOR DE CHECKS DE HORARIOS



// FUNCION PARA LIMPIAR CONTENEDORES
const resetAllCheckboxContainers = () => {
    $PROFESSIONAL_CONTEXT_CHECKS!.innerHTML = '';
    $PROFESSIONAL_HOUR_CHECKS!.innerHTML = '';
    $PROFESSIONAL_DAYS_CHECKS!.innerHTML = '';
    $PROFESSIONAL_SPECIALITY_CHECKS!.innerHTML = '';
}


const addElementsMovingAndTransport = (): void => {
    $PROFESSIONAL_CONTEXT?.classList.add('form-professional-groupSpeciality__containerChecksContexts--visible')
    $PROFESSIONAL_SPECIALITY?.classList.add('form-professional-groupSpeciality__containerChecksSpecialitys--visible');
    $PROFESSIONAL_CONTEXT?.classList.remove('form-professional-groupSpeciality__containerChecksContexts--visible');
    $PROFESSIONAL_DATE?.classList.add('form-professional-groupSpeciality__containerChecksDates--visible');
    $PROFESSIONAL_SPECIALITY_TITLE?.classList.add('form-professional-groupSpeciality__header--visible');
    $PROFESSIONAL_BUDGET_TITLE?.classList.add('form-professional-groupBudget__header--visible');
    $PROFESSIONAL_PROFILE_TITLE?.classList.add('form-professional-groupProfile__header--visible');
    $SECTION_GROUP_SPECIALITYS_WREAPPER_CHECKS?.classList.add('form-professional-groupSpeciality__checks-wrapper--visible');
    $PROFESSIONAL_WRAPPER?.classList.add('form-professional-groupSpeciality__checks-wrapper--visible');
    $CONTAINER_SPECIALITY?.classList.remove('form-step--hidden');
    renderModalOptions({ vectorOptions: MOVING_AND_TRANSPORT, type: 'service', $PROFESSIONAL_CONTAINER: $PROFESSIONAL_SPECIALITY_CHECKS });
    renderModalOptions({ vectorOptions: CONTEXTS, type: 'context', $PROFESSIONAL_CONTAINER: $PROFESSIONAL_CONTEXT_CHECKS });
    renderModalOptions({ vectorOptions: DATE_DAYS, type: 'day', $PROFESSIONAL_CONTAINER: $PROFESSIONAL_DAYS_CHECKS });
    renderModalOptions({ vectorOptions: DATE_HOUR, type: 'hour', $PROFESSIONAL_CONTAINER: $PROFESSIONAL_HOUR_CHECKS });
}

const addElementRepairandGarden = (): void => {
    $PROFESSIONAL_CONTEXT?.classList.add('form-professional-groupSpeciality__containerChecksContexts--visible');
    $PROFESSIONAL_SPECIALITY?.classList.add('form-professional-groupSpeciality__containerChecksSpecialitys--visible');
    $PROFESSIONAL_DATE?.classList.add('form-professional-groupSpeciality__containerChecksDates--visible');
    $PROFESSIONAL_SPECIALITY_TITLE?.classList.add('form-professional-groupSpeciality__header--visible');
    $PROFESSIONAL_BUDGET_TITLE?.classList.add('form-professional-groupBudget__header--visible');
    $PROFESSIONAL_PROFILE_TITLE?.classList.add('form-professional-groupProfile__header--visible');
    $PROFESSIONAL_WRAPPER?.classList.add('form-professional-groupSpeciality__checks-wrapper--visible');
    $SECTION_GROUP_SPECIALITYS_WREAPPER_CHECKS?.classList.add('form-professional-groupSpeciality__checks-wrapper--visible');
    $CONTAINER_SPECIALITY?.classList.remove('form-step--hidden');
    renderModalOptions({ vectorOptions: REPAIR_AND_MAINTENANCE, type: 'service', $PROFESSIONAL_CONTAINER: $PROFESSIONAL_SPECIALITY_CHECKS });
    renderModalOptions({ vectorOptions: CONTEXTS, type: 'context', $PROFESSIONAL_CONTAINER: $PROFESSIONAL_CONTEXT_CHECKS });
    renderModalOptions({ vectorOptions: DATE_DAYS, type: 'day', $PROFESSIONAL_CONTAINER: $PROFESSIONAL_DAYS_CHECKS });
    renderModalOptions({ vectorOptions: DATE_HOUR, type: 'hour', $PROFESSIONAL_CONTAINER: $PROFESSIONAL_HOUR_CHECKS });
}

const removeElements = (): void => {
    $PROFESSIONAL_CONTEXT?.classList.remove('form-professional-groupSpeciality__containerChecksContexts--visible');
    $PROFESSIONAL_DATE?.classList.remove('form-professional-groupSpeciality__containerChecksDates--visible');
    $PROFESSIONAL_SPECIALITY?.classList.remove('form-professional-groupSpeciality__containerChecksSpecialitys--visible');
    $PROFESSIONAL_SPECIALITY_TITLE?.classList.remove('form-professional-groupSpeciality__header--visible');
    $PROFESSIONAL_BUDGET_TITLE?.classList.remove('form-professional-groupBudget__header--visible');
    $PROFESSIONAL_PROFILE_TITLE?.classList.remove('form-professional-groupProfile__header--visible');
    $PROFESSIONAL_WRAPPER?.classList.remove('form-professional-groupSpeciality__checks-wrapper--visible');
    $SECTION_GROUP_SPECIALITYS_WREAPPER_CHECKS?.classList.remove('form-professional-groupSpeciality__checks-wrapper--visible');
    $CONTAINER_SPECIALITY?.classList.add('form-step--hidden');
}

//  FUNCION DE REGISTRO DE PROFESIONALES
const registerProfessional = (): void => {
    // EVENTO CHANGE PARA SELECCIONAR CATEGORIA
    $CONTAINER_SPECIALITY?.classList.add('form-step--hidden');
    $CATEGORY_SPECIALITY_FORM?.addEventListener('change', () => {
        if ($PROFESSIONAL_SPECIALITY_CHECKS && $PROFESSIONAL_CONTEXT_CHECKS && $PROFESSIONAL_DAYS_CHECKS && $PROFESSIONAL_HOUR_CHECKS) {
            resetAllCheckboxContainers();
            if ($CATEGORY_SPECIALITY_FORM.value === 'mudanza-transporte') {
                addElementsMovingAndTransport();
            } else if ($CATEGORY_SPECIALITY_FORM.value === 'reparacion-mantenimiento' || $CATEGORY_SPECIALITY_FORM.value === 'jardineria-mantenimiento-exterior') {
                addElementRepairandGarden();
            } else {
                removeElements();
            }
        }
    });


    // REFERENCIA  A TODOS LOS INPUTS DEL FORMULARIO PASO 1
    clickEventStepFormRegister({ selectorSection: 'form-step' });
    stepInputs({ step: 1, formSelector: 'formProfessional', btnSelector: 'container-btn__next', selectorSection: 'form-basic' });
    stepInputs({ step: 2, formSelector: 'formProfessional', btnSelector: 'container-btn__next', selectorSection: 'form-professional' });

}

export default registerProfessional;
