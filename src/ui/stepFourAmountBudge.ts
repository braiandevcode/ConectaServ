import { TCbEventPropsRegistro, TFieldName, TFormElement } from "../types/types";
import { formatMontoOnlyNumber } from "./auxiliars.js";
import validateStep from "../utils/validators/validateStep.js"
import { UIStepBudgeRadioButtons } from "./fieldsValidateUI.js";
import { globalStateValidationStep } from "../config/constant.js";

const stepFourAmountBudge = ({ step, e, form }: TCbEventPropsRegistro): void => {
    const $MONT_BUDGET = document.querySelector<HTMLInputElement>(`.form-professional-groupBudget__field`);
    const $RADIO_REINSERT = document.querySelectorAll<HTMLInputElement>('.form-professional-groupBudget__radioOption input[name="reinsert"]');
     const $BTN: HTMLButtonElement | null = document.querySelector(`.container-btn__next[data-step="${step}"]`);
    const $RADIO_BUTTON_SELECTED = form?.querySelector('[name="budgeSelected"]') as HTMLInputElement;

    const target = e?.target as TFormElement;

    if (!target.name) return;

    const currentIsBudgeYes = $RADIO_BUTTON_SELECTED.checked as boolean;

    const resultBudge = UIStepBudgeRadioButtons({
        isBudgeYes: currentIsBudgeYes,
        elementRadioReinsert: $RADIO_REINSERT,
        elementInputAmount: $MONT_BUDGET,
        elementBtn: $BTN,
        fieldName: $MONT_BUDGET?.name as TFieldName
    });

    console.log('¿COBRA PRESUPUESTO? isBudgeYes:', currentIsBudgeYes);

    globalStateValidationStep.isValidBudgeAmount = resultBudge.isValid;
    globalStateValidationStep.errorAmount = resultBudge.error;

    // BLUR PARA FORMATO DE MONTO PRESUPUESTO
    $MONT_BUDGET?.addEventListener("blur", () => {
        const rawValue: string = $MONT_BUDGET.value;
        const numericRaw: string = rawValue.replace(/\D/g, '');
        if (numericRaw && numericRaw.length <= 10) {
            $MONT_BUDGET.value = formatMontoOnlyNumber(rawValue);
        }
    });
    validateStep({ step, form });
}

export default stepFourAmountBudge;