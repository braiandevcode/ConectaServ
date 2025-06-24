import { TFieldName, TFormElement } from "../types/types";
import { formatMontoOnlyNumber } from "./auxiliars.js";
import validateStep from "../utils/validators/validateStep.js"
import { UIStepBudgeRadioButtons } from "./fieldsValidateUI.js";

export let isValidBudgeAmount: boolean = false;
export let errorAmount: string = '';

const stepFourAmountBudge = ({ step, e, budgeSelect, form, btn }: { step: number, e: Event, budgeSelect: HTMLInputElement | null | undefined, form: HTMLFormElement, btn?: HTMLButtonElement | null | undefined }):void => {
    const $MONT_BUDGET = document.querySelector<HTMLInputElement>(`.form-professional-groupBudget__field`);
    const $RADIO_REINSERT = document.querySelectorAll<HTMLInputElement>('.form-professional-groupBudget__radioOption input[name="reinsert"]');
    const target = e.target as TFormElement;
    
    if (!target.name) return;

    const fieldName = target.name as TFieldName;
    const currentIsBudgeYes = budgeSelect?.checked as boolean;

    const resultBudge = UIStepBudgeRadioButtons({
        isBudgeYes: currentIsBudgeYes,
        elementRadioReinsert: $RADIO_REINSERT,
        elementInputAmount: $MONT_BUDGET,
        elementBtn: btn,
        fieldName
    });

    isValidBudgeAmount = resultBudge.isValid;
    errorAmount= resultBudge.error

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