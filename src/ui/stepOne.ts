import validateStep from "../utils/validators/validateStep.js";
import { TFieldName, TFormElement } from "../types/types";
import { validateFieldsWithErrorsUI } from "./fieldsValidateUI.js";

export let isValidBasic = false; // VARIABLE AUXILIAR GLOBAL PARA EL PASO 

// FUNCION PARA EL PRIMER PASO
const stepOne = ({ step, form, e }: { step: number, e: Event, form: HTMLFormElement }): void | null => {

    const target = e.target as TFormElement; //ELEMENTO QUE ORIGINA EL EVENTO

    if (!target.name) return null; //SI EL TARGET NO EXISTE RETORNAR NULL

    // VERIFICAR CAMPOS QUE MUESTRAN MENSAJE DE ERROR EN CAMPOS
    const result = validateFieldsWithErrorsUI({
        fieldName: target.name as TFieldName,
        value: target.value,
        file: null,
        files: null
    });

    // SI EL RESULT EXISTE
    if (result) {
        isValidBasic = result.isValid; // GUARDAR SU BOOLEAN EN VARIABLE GLOBAL "isValidBudge"
    }

    validateStep({ step, form }); //VALIDAR PASO ACTUAL
};

export default stepOne;
