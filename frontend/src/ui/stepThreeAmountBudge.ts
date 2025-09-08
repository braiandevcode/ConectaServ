import { TCbEventPropsRegistro, TFieldName, TFormElement } from "../types/types";
import { formatMontoOnlyNumber } from "./auxiliars.js";
import validateStep from "../utils/validators/validateStep.js"
import { UIStepBudgeRadioButtons } from "./fieldsValidateUI.js";
import { globalStateValidationStep } from "../config/constant.js";

const stepThreeAmountBudge = ({ step, e, form }: TCbEventPropsRegistro): void | null => {
    const $MONT_BUDGET = document.querySelector<HTMLInputElement>(`.form-professional-groupBudget__field`);
    const $RADIO_REINSERT = document.querySelectorAll<HTMLInputElement>('.form-professional-groupBudget__radioOption input[name="reinsert"]');
     const $BTN: HTMLButtonElement | null = document.querySelector(`.container-btn__next[data-step="${step}"]`);
    const $RADIO_BUTTON_SELECTED = form?.querySelector('[name="budgeSelected"]') as HTMLInputElement;

    const target = e?.target as TFormElement; //TARGET DEL EVENTO

    if (!target.name) return null; // SI NO HAY NAME RETORNAR NULO

    const currentIsBudgeYes:boolean = $RADIO_BUTTON_SELECTED.checked; //VALOR DEL CHECKED DEL RADIO "cobra presupuesto"
 
    // FUNCION QUE VERIFICA Y ALTERA INTERACCIONES EN INTERFAZ DE LA SECCION DE PRESUPUESTO
    const resultBudge = UIStepBudgeRadioButtons({
        isBudgeYes: currentIsBudgeYes, // ES SI?
        elementRadioReinsert: $RADIO_REINSERT, //ELEMENTO RADIO DE REINSERT
        elementInputAmount: $MONT_BUDGET, //CAMPO DE ENTRADA DE MONTO
        elementBtn: $BTN, //BOTON DE SUIGUIENTE
        fieldName: $MONT_BUDGET?.name as TFieldName //NAME DEL MONTO EN ESTE CASO
    });

    globalStateValidationStep.isValidBudgeAmount = resultBudge.isValid; //SI EL MONTO ES VALIDO
    globalStateValidationStep.errorAmount = resultBudge.error; //SI HAY O NO MENSAJE DE ERROR

    // BLUR PARA FORMATO DE MONTO PRESUPUESTO
    $MONT_BUDGET?.addEventListener("blur", () => {
        const rawValue: string = $MONT_BUDGET.value; //VALOR DEL MONTO
        const numericRaw: string = rawValue.replace(/\D/g, ''); //GUARDAR EN MEMORIA LOS VALORES DEL MONTO Y REEMPLAZAR CARACTERES NO NUMERICOS A VACIO 
        
        // SI HAY VALOR SOLO DE NUMEROS Y SI LA LONGITUD ES MENOR O IGUAL A 10
        if (numericRaw && numericRaw.length <= 10) {
            $MONT_BUDGET.value = formatMontoOnlyNumber(rawValue); //FORMATEAR A NUMERO DE MONTO DE MONEDA VISUALMENTE
        }
    });
    validateStep({ step, form });
}

export default stepThreeAmountBudge;