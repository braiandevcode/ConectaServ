import { TFieldName, TFormElement } from "../types/types";
import { validateFieldsWithErrorsUI } from "../ui/fieldsValidateUI.js";
import { iCbEventBaseProps, iFieldState, iFormEventHandler } from "../interfaces/interfaces";
import saveDataStep from "../utils/saveDataStep.js";
import { globalStateValidationStep } from "../config/constant.js";

// FUNCION DE DELEGACION PARA EL EVENTO 'INPUT' EN FORMULARIOS
// ESTA FUNCION AGREGA UN ESCUCHADOR DE EVENTO AL FORMULARIO Y EJECUTA UNA CALLBACK PERSONALIZADA SEGUN EL CONTEXTO (REGISTRO, CONTACTO, ETC).
// LA CALLBACK 'cbEvent' DEBE DEFINIRSE EN CADA CASO CON SU PROPIA INTERFAZ PARA RECIBIR LOS DATOS NECESARIOS. 
// SE USA UNA INTERFAZ GENERICA PARA PERMITIR TIPADO FLEXIBLE SEGUN EL FORMULARIO DONDE SE INVOQUE.

const eventTypeInput = <T extends iCbEventBaseProps>({ cbEvent, form, step }: iFormEventHandler<T>): void | null => {
    if (!form) return null;
    form.addEventListener('input', (e: Event) => {
        const allFormElements = Array.from(form?.elements as Iterable<TFormElement>) as TFormElement[];
        const stepKey: string = String(step);
        const target = e.target as TFormElement;

        if (!target.name) return;

        const fieldName = target.name as TFieldName; // NAME DEL CAMPO
        const value = target.value; // VALOR DEL CAMPO

        const vectorType: string[] = ['checkbox', 'radio'];
        const listSectionBasic: string[] = ['fullName', 'userName', 'email', 'password', 'confirmPassword'];

        // SI ES UN CAMPO DE TEXTO / TEXTAREA
        if (!vectorType.includes(target.type)) {
            const containerMessage = form.querySelector(`[data-message="${fieldName}"]`) as HTMLDivElement;
            const messageError = containerMessage?.querySelector('.has-error') as HTMLSpanElement | null;
            if (!messageError) return; // SI NO HAY ELEMENTO REFERENCIADO RETORNAR

            const result: iFieldState | null | undefined = validateFieldsWithErrorsUI({ fieldName, value, values: [], file: null, files: null });

            if (!result) return; // ASEGURARSE DE QUE RESULT NO SEA NULL

            let isValidFinal: boolean = result.isValid; // GUARDAR VALOR POR DEFECTO
            let errorFinal: string = result.error; // GUARDAR VALOR POR DEFECTO

            // VALIDACION EXTRA PARA PRESUPUESTO
            if (fieldName === 'amountBudge' && step === 4) {
                cbEvent({
                    step,
                    e,
                    form,
                } as unknown as T); //CONFIA EN MI, YO ME ENCARGO DEL TIPO

                isValidFinal = result.isValid && globalStateValidationStep.isValidBudgeAmount;
                errorFinal = !result.isValid ? result.error : (!globalStateValidationStep.isValidBudgeAmount ? globalStateValidationStep.errorAmount : '');

                target.classList.toggle('is-valid', isValidFinal);
                target.classList.toggle('is-invalid', !isValidFinal);
                messageError.textContent = isValidFinal ? '' : errorFinal;

                saveDataStep({ step: stepKey, elements: allFormElements });
            }

            // SECCION BASICA
            if (listSectionBasic.includes(fieldName) && (step === 1 || step === 0)) {
                cbEvent({ step, e, form } as unknown as T); //CONFIA EN MI, YO ME ENCARGO DEL TIPO

                target.classList.toggle('is-valid', isValidFinal);
                target.classList.toggle('is-invalid', !isValidFinal);
                messageError.textContent = isValidFinal ? '' : errorFinal;

                saveDataStep({ step: stepKey, elements: allFormElements });
            }

            // SECCION PERFIL
            if (fieldName === 'description' && (step === 4 || step === 5)) {
                cbEvent({
                    step,
                    e,
                    form
                } as unknown as T); //CONFIA EN MI, YO ME ENCARGO DEL TIPO

                target.classList.toggle('is-valid', isValidFinal);
                target.classList.toggle('is-invalid', !isValidFinal);
                messageError.textContent = isValidFinal ? '' : errorFinal;

                saveDataStep({ step: stepKey, elements: allFormElements });
            }
        }
    });
};

export default eventTypeInput;
