import validateStep from "../utils/validators/validateStep.js";
import { TFormElement } from "../types/types.js";
import { validateFieldsWithErrorsUI } from "./fieldsValidateUI.js";
import { globalStateValidationStep } from "../config/constant.js";

const stepTwoDescription = ({ step, form, e }: { step: number, form: HTMLFormElement, e: Event }): void | null => {
    const target = e.target as TFormElement;
    
    if (!target.name) return null; // SI EL NAME NO EXISTE RETORNAR NULO
    // LLAMAR FUNCION QUE VALIDA VALORES SEGUN EL NAME
    const validationResult = validateFieldsWithErrorsUI({
        fieldName: target.name,
        value: target.value,
        values:[],
        file: null,
        files: null,
    });

    if(validationResult){
     globalStateValidationStep.isValidDescription = validationResult.isValid;
    }
    validateStep({ step, form }); //ACTUALIZAR VALIDACION DEL CAMPO DESCRIPCION DEL PASO ACTUAL
}

export default stepTwoDescription;