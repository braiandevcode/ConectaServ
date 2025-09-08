import { TFieldName, TFormElement } from "../types/types";
import { validateFieldsWithErrorsUI } from "../ui/fieldsValidateUI.js";
import { iFieldState } from "../interfaces/interfaces";
import saveDataStep from "../utils/saveDataStep.js";
import { formStateValidField, globalStateValidationStep } from "../config/constant.js";
import stepThreeAmountBudge from "../ui/stepThreeAmountBudge.js";
import stepLastOrZero from "../ui/stepLastOrZero.js";
import stepThreeDescription from "../ui/stepTwoDescription.js";
import { validateConfirmPassword } from "../utils/validators/validateBasicValue.js";

// FUNCION DE DELEGACION PARA EL EVENTO 'INPUT' EN FORMULARIOS
const eventTypeInput = (): void => {
    document.addEventListener('input', (e: Event) => {
        e.preventDefault(); //PREVENIR POR DEFECTO

        const target = e.target as HTMLInputElement; //TARGET DEL EVENTO
        if (!target) return null; //SI NO EXISTE RETORNAL NULO

        if (!target.name) return null;
        const fieldName = target.name as TFieldName; // NAME DEL CAMPO

        const formElementRegisterClient = (target.closest('.register-client') as HTMLFormElement); //FORMULARIO DE CLIENTE
        const formElementRegister = (target.closest('.register-professional') as HTMLFormElement) ?? formElementRegisterClient; // UNO U OTRO FORMULARIO

        // SI CUALQUIERA DE AMBOS EXISTE
        if (formElementRegister) {
            const stepKey: string = target.closest('[data-step]')?.getAttribute('data-step') as string; //VALOR DEL data-step DEL ANCESTRO MAS CERCANO AL ELEMENTO TARGET CON EL ATRIBUTO "data-step"

            const step: number = parseInt(stepKey); //PARSEAR A NUMERO SU VALOR

            //LISTA DE TODOS LOS ELEMENTOS DEL FORMULARIO SIN DISCRIMINAR
            const allFormElements = Array.from(formElementRegister.elements as HTMLFormControlsCollection) as TFormElement[];

            const value:string = target.value; // VALOR DEL CAMPO

            const vectorType: string[] = ['checkbox', 'radio']; // LISTAS DE VALORES DE LOS TIPO DE INPUT => SOLO DE CHECKBOX Y RADIO
            const listSectionBasic: string[] = ['fullName', 'userName', 'email', 'password', 'confirmPassword']; // LISTAS DE VALORES DE LOS NAME 

            // SI EL INPUT ES DE CUALQUIER TIPO EXLUYENDO CHECKBOX Y RADIO
            if (!vectorType.includes(target.type)) {
                //REFERNECIA AL SELECTOR CON "data-message" DEL FORMULARIO
                const containerMessage = formElementRegister.querySelector(`[data-message="${fieldName}"]`) as HTMLDivElement; 
                const messageError: HTMLSpanElement | null = containerMessage?.querySelector('.has-error'); //REFERENCIAR ELEMENTO SPAN DESDE EL CONTENEDOR REFERENCIADO
                
                if (!messageError) return null; // SI NO HAY ELEMENTO REFERENCIADO RETORNAR NULO

                const result: iFieldState | null | undefined = validateFieldsWithErrorsUI({ fieldName, value, values: [], file: null, files: null }); //VALIDAR EL RESULTADO ACTUAL

                if (!result) return null; // ASEGURARSE DE QUE RESULT NO SEA NULL => SINO NULO

                let isValidFinal: boolean = result.isValid; // GUARDAR VALOR POR DEFECTO
                let errorFinal: string = result.error; // GUARDAR VALOR POR DEFECTO

                // VALIDACION EXTRA PARA PRESUPUESTO
                if (fieldName === 'amountBudge' && step === 3) {
                    stepThreeAmountBudge({ step, e, form: formElementRegister });

                    isValidFinal = result.isValid && globalStateValidationStep.isValidBudgeAmount;
                    errorFinal = !result.isValid ? result.error : (!globalStateValidationStep.isValidBudgeAmount ? globalStateValidationStep.errorAmount : '');

                    target.classList.toggle('is-valid', isValidFinal);
                    target.classList.toggle('is-invalid', !isValidFinal);
                    messageError.textContent = isValidFinal ? '' : errorFinal;

                    saveDataStep({ step, elements: allFormElements });
                }

                // SECCION BASICA
                if (listSectionBasic.includes(fieldName) && (step === 3 || step === 4 || step === 0)) {
                    stepLastOrZero({ step, e, form: formElementRegister });

                    // ACA SE REFERENCIA AL INPUT DE CONFIRMAR CONTRASEÑA ESPECIFICAMENTE
                    const confirmPass: HTMLInputElement | null = formElementRegister.querySelector('input[name="confirmPassword"]');

                    // SI EXISTE EL ELEMENTO Y SI NO ESTA VACIO
                    if (confirmPass && confirmPass?.value?.trim() !== '') {
                        const containerMsg = formElementRegister.querySelector(`[data-message="confirmPassword"]`) as HTMLDivElement;
                        const messageError: HTMLSpanElement | null = containerMsg?.querySelector('.has-error')

                        if (!messageError) return; // SI NO HAY ELEMENTO REFERENCIADO RETORNAR

                        const res = validateConfirmPassword(confirmPass?.value); //OBTENER VALIDACION

                        formStateValidField.confirmPassword = res; // ACTUALIZAR EL ESTADO GLOBAL

                        // AÑADIR LOS ESTILOS Y MENSAJES CORRESPONDIENTES
                        confirmPass.classList.toggle('is-valid', res.isValid);
                        confirmPass.classList.toggle('is-invalid', !res.isValid);
                        messageError.textContent = res.isValid ? '' : res.error;
                    }

                    // DEL TARGET ACTUAL APLICAMOS ESTILOS Y MENSAJE
                    target.classList.toggle('is-valid', isValidFinal);
                    target.classList.toggle('is-invalid', !isValidFinal);
                    messageError.textContent = isValidFinal ? '' : errorFinal;

                    saveDataStep({ step, elements: allFormElements }); //GUARDAR DATOS ACTUALES
                }

                // SECCION PERFIL
                if (fieldName === 'descriptionUser' && (step === 2)) {
                    stepThreeDescription({ step, e, form: formElementRegister });

                    // DEL TARGET ACTUAL APLICAMOS ESTILOS Y MENSAJE
                    target.classList.toggle('is-valid', isValidFinal);
                    target.classList.toggle('is-invalid', !isValidFinal);
                    messageError.textContent = isValidFinal ? '' : errorFinal;

                    saveDataStep({ step, elements: allFormElements }); //GUARDAR DATOS ACTUALES
                }
            }
        }
    });
};

export default eventTypeInput;
