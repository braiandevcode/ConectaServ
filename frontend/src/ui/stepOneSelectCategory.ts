import { globalStateValidationStep } from "../config/constant.js";
import evaluateCategorySelected from "../dom/evaluateCategory.js";
import validateStep from "../utils/validators/validateStep.js";

const stepOneSelectCategory = ({step, e, target, form }:{step: number, e?: Event, target?: HTMLElement, form: HTMLFormElement}) => {
    const D:Document=document;
     const $FORM_CONTAINER_GROUPS: HTMLDivElement | null = D.querySelector('.form-professional-groupSpeciality');
        if (!e) return undefined;
        evaluateCategorySelected({
            formContainerGroups: $FORM_CONTAINER_GROUPS,
            e,
            target,
            form
        });
        
        globalStateValidationStep.isSelected = true;
        validateStep({ step, form });
}
export default stepOneSelectCategory;