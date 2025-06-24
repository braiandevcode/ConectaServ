import { errorAmount, isValidBudgeAmount } from "../ui/stepFourAmountBudge.js";
import { TFieldName, TFormElement } from "../types/types";
import { validateFieldsWithErrorsUI } from "../ui/fieldsValidateUI.js";
import { iEventInput, iFieldState } from "../interfaces/interfaces";
import saveDataStep from "../utils/saveDataStep.js";

// DELEGACION DE EVENTOS TIPO CHANGE
const eventTypeInput = ({ cbStep, form, step }: iEventInput): void | null => {
    if (!form) return null;
    const allFormElements = Array.from(form?.elements as Iterable<TFormElement>) as TFormElement[];
    const stepKey: string = String(step);
    form.addEventListener('input', (e: Event) => {
        const target = e.target as TFormElement;

        if (!target.name) return;

        const fieldName = target.name as TFieldName; // NAME DEL CAMPO
        const value = target.value; // VALOR DEL CAMPO

        const vectorType: string[] = ['checkbox', 'radio'];
        const listSectionBasic: string[] = ['fullName', 'userName', 'email', 'location', 'password', 'confirmPassword'];

        // SI ES UN CAMPO DE TEXTO / TEXTAREA
        if (!vectorType.includes(target.type)) {
            const containerMessage = form.querySelector(`[data-message="${fieldName}"]`) as HTMLDivElement;
            const messageError = containerMessage?.querySelector('.has-error') as HTMLSpanElement | null;
            if (!messageError) return; // SI NO HAY ELEMENTO REFERENCIADO RETORNAR

            const result: iFieldState | null = validateFieldsWithErrorsUI({ fieldName, value, file: null, files: null });

            if (!result) return; // ASEGURARSE DE QUE RESULT NO SEA NULL

            let isValidFinal: boolean = result.isValid; // GUARDAR VALOR POR DEFECTO
            let errorFinal: string = result.error; // GUARDAR VALOR POR DEFECTO

            // VALIDACION EXTRA PARA PRESUPUESTO
            if (fieldName === 'amountBudge' && step === 4) {
                const budgeSelectedYes = form.querySelector('[name="budgeSelected"][value="yes"]') as HTMLInputElement;
                cbStep({ step, e, form, budgeSelect: budgeSelectedYes });

                isValidFinal = result.isValid && isValidBudgeAmount;
                errorFinal = !result.isValid ? result.error : (!isValidBudgeAmount ? errorAmount : '');

                target.classList.toggle('is-valid', isValidFinal);
                target.classList.toggle('is-invalid', !isValidFinal);
                messageError.textContent = isValidFinal ? '' : errorFinal;

                saveDataStep({ step: stepKey, elements: allFormElements });
            }

            // SECCION BASICA
            if (listSectionBasic.includes(fieldName) && step === 1) {
                cbStep({ step, e, form });

                target.classList.toggle('is-valid', isValidFinal);
                target.classList.toggle('is-invalid', !isValidFinal);
                messageError.textContent = isValidFinal ? '' : errorFinal;

                saveDataStep({ step: stepKey, elements: allFormElements });
            }

            // SECCION PERFIL
            if (fieldName === 'description' && (step === 4 || step === 5)) {
                cbStep({ step, e, form });

                target.classList.toggle('is-valid', isValidFinal);
                target.classList.toggle('is-invalid', !isValidFinal);
                messageError.textContent = isValidFinal ? '' : errorFinal;

                saveDataStep({ step: stepKey, elements: allFormElements });
            }
        }
    });
};

export default eventTypeInput;
