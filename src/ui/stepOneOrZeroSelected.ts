import validateStep from "../utils/validators/validateStep.js";
import { TFieldName, TFormElement } from "../types/types.js";
import { validateFieldsWithErrorsUI } from "./fieldsValidateUI.js";
import { globalStateValidationStep } from "../config/constant.js";

// FUNCION PARA EL PRIMER PASO
const stepOneOrZeroSelected = ({ step, form, e }: { step: number, e: Event, form: HTMLFormElement }): void | null => {
    const target = e.target as TFormElement; //ELEMENTO QUE ORIGINA EL EVENTO

    if (!target.name) return null; //SI EL TARGET NO EXISTE RETORNAR NULL

    // VERIFICAR CAMPOS QUE MUESTRAN MENSAJE DE ERROR EN CAMPOS
    const resultSelected = validateFieldsWithErrorsUI({
        fieldName: target.name as TFieldName,
        value: target.value,
        values:[],
        file: null,
        files: null
    });

    // SI EL RESULT EXISTE
    if (resultSelected) {
        globalStateValidationStep.isSelected = resultSelected.isValid; // GUARDAR SU BOOLEAN EN VARIABLE GLOBAL "isValidBudge"
    }

    validateStep({ step, form }); //VALIDAR PASO ACTUAL
};

export default stepOneOrZeroSelected;

