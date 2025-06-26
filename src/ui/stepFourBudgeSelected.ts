import validateStep from "../utils/validators/validateStep.js";
import { TFieldName } from "../types/types";
import { UIStepBudgeRadioButtons } from "./fieldsValidateUI.js";
import { globalStateValidationStep } from "../config/constant.js";
const D: Document = document;

//  RADIOS DE PRSUPUESTO Y REINSERT
const stepFourBudgeSelected = ({ step, form, btn }: { step: number; form: HTMLFormElement | null, btn: HTMLButtonElement | null | undefined }) => {

    const $RADIO_REINSERT = D.querySelectorAll<HTMLInputElement>('.form-professional-groupBudget__radioOption input[name="reinsert"]');
    const $MONT_BUDGET = D.querySelector<HTMLInputElement>(`.form-professional-groupBudget__field`);

    const budgeSelectedYes = form?.querySelector<HTMLInputElement>('[name="budgeSelected"][value="yes"]');
    const budgeSelectedNo = form?.querySelector<HTMLInputElement>('[name="budgeSelected"][value="no"]');

    if (!budgeSelectedNo || !budgeSelectedNo) return;

    const currentIsBudgeNo = budgeSelectedNo?.checked as boolean;
    const currentIsBudgeYes = budgeSelectedYes?.checked as boolean;

    UIStepBudgeRadioButtons({
        isBudgeYes: currentIsBudgeYes,
        elementRadioReinsert: $RADIO_REINSERT,
        elementInputAmount: $MONT_BUDGET,
        elementBtn: btn,
        fieldName: $MONT_BUDGET?.name as TFieldName
    });

    globalStateValidationStep.isBudgeYes = currentIsBudgeYes;
    globalStateValidationStep.isBudgeNo = currentIsBudgeNo;

    validateStep({ step, form });
}
export default stepFourBudgeSelected;