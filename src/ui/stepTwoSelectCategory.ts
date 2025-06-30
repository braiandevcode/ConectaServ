import validateStep from "../utils/validators/validateStep.js";
import evaluateCategorySelected from "../dom/evaluateCategory.js";
import { globalStateValidationStep } from "../config/constant.js";

const D: Document = document;
const stepTwoSelectCategory = ({ step, form, e, }: { step: number, e?: Event, form: HTMLFormElement }) => {
    const $FORM_CONTAINER_GROUPS: HTMLDivElement | null = D.querySelector('.form-professional-groupSpeciality');
    if(!e) return undefined;
    evaluateCategorySelected({
        formContainerGroups: $FORM_CONTAINER_GROUPS,
        e,
        form
    });

    globalStateValidationStep.isSelected = true;
    validateStep({ step, form });
}

export default stepTwoSelectCategory;