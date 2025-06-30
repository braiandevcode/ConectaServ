import validateStep from "../utils/validators/validateStep.js";
import clearElementChild from "../dom/clearElementChild.js";
import evaluateCategorySelected from "../dom/evaluateCategory.js";
import { globalStateValidationStep } from "../config/constant.js";


const D: Document = document;
const stepTwoSelectCategory = ({ step, form }: { step: number, form:HTMLFormElement}) => {
    const $FORM_CATEGORY_SELECTED = D.querySelector<HTMLSelectElement>('.form-professional-groupSelectCategory__select');
    // CONTENEDOR PRINCIPAL DE SECCIONES
    const $FORM_CONTAINER_GROUPS: HTMLDivElement | null = D.querySelector('.form-professional-groupSpeciality');
    const $GROUP_CONTEXT_CHECKS = D.querySelector<HTMLDivElement>('.form-professional-groupSpeciality__contexts-body');
    const $GROUP_SPECIALITY_CHECKS = D.querySelector<HTMLDivElement>('.form-professional-groupSpeciality__services-body');
    const $GROUP_DAYS_CHECKS = D.querySelector<HTMLDivElement>('.form-professional-groupSpeciality__days-body');
    const $GROUP_HOUR_CHECKS = D.querySelector<HTMLDivElement>('.form-professional-groupSpeciality__hours-body');

    const resetAllCheckboxContainers = [
        $GROUP_CONTEXT_CHECKS,
        $GROUP_HOUR_CHECKS,
        $GROUP_DAYS_CHECKS,
        $GROUP_SPECIALITY_CHECKS
    ].filter((el): el is HTMLDivElement => el !== null);

    clearElementChild({ elements: resetAllCheckboxContainers });
    evaluateCategorySelected({
        formContainerGroups: $FORM_CONTAINER_GROUPS,
        formCategorySelected: $FORM_CATEGORY_SELECTED,
        groupContextCheckbox: $GROUP_CONTEXT_CHECKS,
        groupDaysCheckbox: $GROUP_DAYS_CHECKS,
        groupHoursCheckbox: $GROUP_HOUR_CHECKS,
        groupServiceCheckbox: $GROUP_SPECIALITY_CHECKS
    });
    
    globalStateValidationStep.isSelected = true;
    validateStep({ step, form });
}

export default stepTwoSelectCategory;