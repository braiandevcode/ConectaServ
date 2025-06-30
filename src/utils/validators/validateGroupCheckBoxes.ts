import { TFieldName } from "../../types/types";
import { formStateValidField } from "../../config/constant.js";
import { iFieldState } from "../../interfaces/interfaces";

// ESTA FUNCIÓN RECIBE UN ARRAY DE NOMBRES DE GRUPOS DE CHECKBOXES (EJ: ["service[]", "context[]", ...])
const validateGroupCheckBoxes = (groupNames: string[]): iFieldState => {
    // VARIABLE PARA SABER SI TODOS LOS GRUPOS SON VÁLIDOS
    let allGroupsValid = true;

    // RECORRER CADA GRUPO DE CHECKBOXES
    for (const name of groupNames) {
        // OBTENER TODOS LOS CHECKBOXES DEL GRUPO ACTUAL USANDO EL NAME
        const checkboxes = Array.from(document.querySelectorAll<HTMLInputElement>(`input[type="checkbox"][name="${name}"]`));

        // VERIFICAR SI AL MENOS UNO ESTA SELECCIONADO
        const isValid = checkboxes.some(cb => cb.checked);

        // ACTUALIZAR EL ESTADO DE VALIDACION EN EL OBJETO GLOBAL PARA ESE GRUPO
        formStateValidField[name as TFieldName] = {
            value: '', // NO GUARDAMOS VALOR ESPECÍFICO ACA
            error: isValid ? '' : 'ESTE GRUPO REQUIERE AL MENOS UNA OPCIÓN SELECCIONADA', // MENSAJE SI NO ES VALIDO
            isValid: isValid // GUARDAMOS EL RESULTADO DE LA VALIDACION
        };

        // SI ALGUNO DE LOS GRUPOS NO ES VALIDO, SE MARCA COMO FALSO EL ESTADO GLOBAL
        if (!isValid) {
            allGroupsValid = false;
        }
    }

    // RETORNAMOS UN OBJETO DE VALIDACION GENERAL
    return {
        error: allGroupsValid ? '' : 'UNO O MÁS GRUPOS SON INVÁLIDOS',
        value: '',
        isValid: allGroupsValid
    };
};

export default validateGroupCheckBoxes;