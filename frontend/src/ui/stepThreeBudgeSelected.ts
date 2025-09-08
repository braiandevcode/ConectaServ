import validateStep from "../utils/validators/validateStep.js";
import { TCbEventPropsRegistro, TFieldName } from "../types/types.js";
import { UIStepBudgeRadioButtons } from "./fieldsValidateUI.js";
import { globalStateValidationStep } from "../config/constant.js";
const D: Document = document;

//  RADIOS DE PRSUPUESTO
const stepThreeBudgeSelected = ({ step, e, form }: TCbEventPropsRegistro): void | null => {
    // REFERENCIA DEL BOTON POR SU NUMERO DE PASO
    const $BTN: HTMLButtonElement | null = document.querySelector(`.container-btn__next[data-step="${step}"]`);

    const target = e?.target as HTMLInputElement; //CASTEAR TIPO DE ELEMENTO AL DE UN INPUT

    if (!target.name) return null; //SI NAME NO EXISTE RETORNAR NULO

    const isChecked = target.name === 'budgeSelected' && target.checked; // SI ES EL NAME ESPECIFICADO Y SE HACE CHEKED

    const isYes = target.value === 'yes'; //SI EL VALOR ES SI
    const isNo = target.value === 'no'; // SI EL VALOR ES NO

    globalStateValidationStep.isBudgeYes = isYes && isChecked; //GUARDAR SI ES SI Y SI ESTA CHECKEADO
    globalStateValidationStep.isBudgeNo = isNo && isChecked; //GUARDAR SI ES NO Y SI ESTA CHECKEADO

    // FUNCION QUE SE ENCARGA EN LA UI DE DESHABILITAR /HABILITAR INPUTS SEGUN ELECCIONES
    UIStepBudgeRadioButtons({
        isBudgeYes: isYes && isChecked,
        elementRadioReinsert: D.querySelectorAll<HTMLInputElement>(`.form-professional-groupBudget__radioOption input[name="reinsert"]`),
        elementInputAmount: D.querySelector<HTMLInputElement>(`.form-professional-groupBudget__field`),
        elementBtn: $BTN,
        fieldName: target.name as TFieldName
    });

    validateStep({ step, form }); // VALIDAR  PASO

}
export default stepThreeBudgeSelected;