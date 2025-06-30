import validateStep from "../utils/validators/validateStep.js";
import { TCbEventPropsRegistro, TFieldName } from "../types/types";
import { UIStepBudgeRadioButtons } from "./fieldsValidateUI.js";
import { globalStateValidationStep } from "../config/constant.js";
const D: Document = document;

//  RADIOS DE PRSUPUESTO
const stepFourBudgeSelected = ({ step, e, form }: TCbEventPropsRegistro) => {
    const $BTN: HTMLButtonElement | null = document.querySelector(`.container-btn__next[data-step="${step}"]`);

    const target = e?.target as HTMLInputElement;

    if (!target.name) return null;

    const isChecked = target.name === 'budgeSelected' && target.checked;

    const isYes = target.value === 'yes';
    const isNo = target.value === 'no';


    globalStateValidationStep.isBudgeYes = isYes && isChecked;
    globalStateValidationStep.isBudgeNo = isNo && isChecked;


    UIStepBudgeRadioButtons({
        isBudgeYes: isYes && isChecked,
        elementRadioReinsert: D.querySelectorAll<HTMLInputElement>(`.form-professional-groupBudget__radioOption input[name="reinsert"]`),
        elementInputAmount: D.querySelector<HTMLInputElement>(`.form-professional-groupBudget__field`),
        elementBtn: $BTN,
        fieldName: target.name as TFieldName
    });

    validateStep({ step, form });

}
export default stepFourBudgeSelected;