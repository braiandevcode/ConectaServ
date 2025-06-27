import validateStep from "../utils/validators/validateStep.js";
import { TFormElement } from "../types/types.js";
import { validateFieldsWithErrorsUI } from "./fieldsValidateUI.js";
import { globalStateValidationStep } from "../config/constant.js";

const stepFourOrFiveDescription = ({ step, form, e }: { step: number, form: HTMLFormElement, e: Event }) => {
    const target = e.target as TFormElement;
    
    if (!target.name) return;

    const validationResult = validateFieldsWithErrorsUI({
        fieldName: target.name,
        value: '',
        file: null,
        files: null,
    });
    

    if(validationResult){
     globalStateValidationStep.isValidDescription = validationResult.isValid;
    }
    validateStep({ step, form });
}

export default stepFourOrFiveDescription;