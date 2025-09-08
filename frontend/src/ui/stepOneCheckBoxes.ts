import validateStep from "../utils/validators/validateStep.js";
import { formState, globalStateValidationStep } from "../config/constant.js";
import { validateFieldsWithErrorsUI } from "./fieldsValidateUI.js";
import { TFieldName, TFormElement } from "../types/types.js";
import { EGroupCheckBox } from "../types/enums.js";

// PASO UNO CHECKBOXES
const stepOneCheckBoxes = ({ step, form, e }: { step: number, e?: Event, target?: HTMLElement, form: HTMLFormElement }): void | null => {
    const target = e?.target as TFormElement;
    if (!target.name) return null; // SI NO EXISTE NAME DEL TARGET

    // VERIFICAR CAMPOS QUE MUESTRAN MENSAJE DE ERROR EN CAMPOS
    const result = validateFieldsWithErrorsUI({
        fieldName: target.name as TFieldName,
        value: '',
        values: formState.hasContext ? [
            EGroupCheckBox.SERVICE, EGroupCheckBox.CONTEXT, EGroupCheckBox.DAY, EGroupCheckBox.HOUR] 
            : [EGroupCheckBox.SERVICE, EGroupCheckBox.DAY, EGroupCheckBox.HOUR],
        file: null,
        files: null
    });

    // SI EXISTE RESULT
    if (result) {
        globalStateValidationStep.isValidCheckBoxesDetailsProfession = result.isValid; //ACTUALIZAR AL GLOBAL SI ES VALIDO O NO
    }
    validateStep({ step, form }); //VALIDAR CAMPOS DEL PASO ACTUAL
}

export default stepOneCheckBoxes;