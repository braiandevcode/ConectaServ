import { TFieldName, TToggleBudgetFieldsProps, TValidateFieldParams } from "../types/types";
import { formState, formStateValidField, globalStateValidationStep } from "../config/constant.js";
import { iFieldState } from "../interfaces/interfaces";
import validateBudgetValue from "../utils/validators/validateBudgeValue.js";
import { validateConfirmPassword, validateEmail, validateFullName, validatePassword, validateUserName } from "../utils/validators/validateBasicValue.js";
import { validateDescription, validateImageExperiences, validateImageProfile } from "../utils/validators/validateProfileValue.js";
import { capitalizeWords } from "./auxiliars.js";

//--------------------------------------------VALIDACIONES  DE CAMPOS CON MEN ----------------------------------------//
export const validateFieldsWithErrorsUI = ({ fieldName, value, file, files }: TValidateFieldParams): iFieldState | null => {
    let result: iFieldState; //VARIABLE AUXILIAR

    const isValidFieldName = (name: string): name is TFieldName => {
        return name in formStateValidField;
    };

    if(!isValidFieldName(fieldName)) return null;
    // VERIFICAR EL NAME DEL CAMPO
    switch (fieldName) {
        case 'fullName':
            result = validateFullName(capitalizeWords(value));
            break;
        case 'userName':
            result = validateUserName(value);
            break;
        case 'email':
            result = validateEmail(value);
            break;
        case 'password':
            result = validatePassword(value);
            break;
        case 'confirmPassword':
            result = validateConfirmPassword(value);
            break;

        case 'description':
            result = validateDescription(value);
            break;

        case 'amountBudge':
            result = validateBudgetValue(value);
            break;
        case 'imageProfile':
            result = validateImageProfile(file);
            break;
        case 'imageExperiences':
            result = validateImageExperiences(files);
            break;
        default:
            result = { error: '', value, isValid: true };
            break;
    }

    formStateValidField[fieldName] = result; //ACTUALIZAR Y GUARDAR RESULT EN EL OBJETO GLOBAL
    return result;
};

//--------------------------------------- VAIDACIONES DE RADIO BUTTONS EN PASO PRESUPUESTO------------------------------------------------------//
export const UIStepBudgeRadioButtons = (
    {
        isBudgeYes,
        elementRadioReinsert,
        elementInputAmount,
        elementBtn,
        fieldName,
    }: TToggleBudgetFieldsProps): iFieldState => {

    // SI COBRA PRESUPUESTO "SÍ"
    if (isBudgeYes) {
        formState.stepStatus[4] = false; //NO PERMITIR AVANZAR
        const rawValue: string = elementInputAmount?.value || ''; // VALOR DEL MONTO O VACIO
        const result: iFieldState = validateBudgetValue(rawValue); //LLAMAR FUNCION QUE MANEJA LA LOGICA DE VALIDACION

        // ACTUALIZACIONES Y CAMBIOS EN LA UI
        elementInputAmount?.removeAttribute('disabled');
        elementInputAmount?.focus();
        elementBtn?.setAttribute('disabled', 'true');

        // SI NO ES VALIDO
        if (!result.isValid) {
            elementRadioReinsert?.forEach(r => r.setAttribute('disabled', 'true')); //DESHABILITAR RADIOS DE REINTEGRO
        } else {
            formState.stepStatus[4] = true;
            elementRadioReinsert?.forEach(r => r.removeAttribute('disabled')); // HABILITAR RADIOS DE REINTEGRO
            elementBtn?.removeAttribute('disabled'); //HABILITAR BOTON SIGUIENTE
        }

        return formStateValidField[fieldName] = result;
    }

    // Si NO COBRA PRESUPUESTO
    formState.stepStatus[4] = true;
    elementBtn?.removeAttribute('disabled');
    elementRadioReinsert?.forEach(r => r.checked = r.value === 'no');

    // LIMPIAR Y DESHABILITAR CAMPO DEL MONTO
    if (elementInputAmount) {
        elementInputAmount.value = '';
        elementInputAmount.setAttribute('disabled', 'true');
        elementInputAmount.classList.remove('is-valid', 'is-invalid');

        const parent: HTMLDivElement | null = elementInputAmount.closest('[data-message]');
        const span = parent?.querySelector('.containerMsgError .has-error') as HTMLSpanElement;
        if (span) span.textContent = ''; //SI EL ELEMENTO SPAN EXISTE LIMPIAR EL TEXCONTENT
    }

    // RETORNAR ESTADO DE VALIDACIONDEL FORMULARIO POR DEFECTO EN VALIDO
    return formStateValidField[fieldName] = {
        error: '',
        value: '',
        isValid: true
    };
};


