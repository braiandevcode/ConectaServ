import { formState, formStateValidField } from "../../config/constant.js";
import { TFieldName, TInputs } from "../../types/types";
import { isValidBudgeAmount } from "../../ui/stepFourAmountBudge.js";
import { isBudgeNo, isBudgeYes } from "../../ui/stepFourBudgeSelected.js";
// import { isInvalidProfile } from "../../ui/stepFourOrFive.js";
import { isValidBasic } from "../../ui/stepOne.js";
import { isValidCheckBoxesDetailsProfession } from "../../ui/stepThree.js";
import { isSelected } from "../../ui/stepTwoSelectCategory.js";

// VALIDAR CAMPOS DE CADA PASO
const validateStep = ({ step, listSectionProfile, form }: { step: number; form: HTMLFormElement | null | undefined; listSectionProfile?: string[] }): void=> {
    const $BUTTON = document.querySelector(`.container-btn__next[data-step="${step}"]`) as HTMLButtonElement | undefined; // REFERENCIAR BOTO DE PASOS SIGUIENTE

    if (!$BUTTON) return; //ASEGURAR QUE EXISTA ELEMENTO DE BOTON

    const strategy: TInputs = formState.validationTypesByStep[step];

    const strategies: Record<TInputs, boolean> = {
        text: isValidBasic,
        selectedCategoryAndCheckBoxes: isSelected && isValidCheckBoxesDetailsProfession,
        checkbox: isValidCheckBoxesDetailsProfession,
        radioBudgetFull: isBudgeNo || (isBudgeYes && isValidBudgeAmount),
        filesTextareaTerms:true,
        // filesTextareaTerms: !isInvalidProfile
    };

    const strategyValid:boolean = strategies[strategy];

    //CONVERTIR A ARREY DE NODOS O ARRAY VACIO
    const inputsInStep = Array.from(form?.querySelectorAll(`[data-step="${step}"] input[name], [data-step="${step}"] textarea[name]`) || []) as HTMLInputElement[];

    // CREA UNA LISTA  DONDE SU NAME ESTE EN formStateValidate Y QUE NO INCLUYA LA DE LA LISTA(SECCION PERFIL)
    const fieldsToValidate = inputsInStep
        .filter(el =>
            el.name &&
            !listSectionProfile?.includes(el.name) &&
            Object.prototype.hasOwnProperty.call(formStateValidField, el.name) //QUE EL NAME ESTE EN ESE OBJETO
        );

    // SE AGREGA VALIDACIONES A LOS CAMPOS CON MENSAJES DE ERROR
    const allFieldsValid = fieldsToValidate.every(el => {
        const field = formStateValidField[el.name as TFieldName];
        return field?.isValid === true;
    });

    const isValid = strategyValid && allFieldsValid;  //SI DE LA ESTRATEGIA Y LOS CAMPOS VERIFICADOS ESTAN OK SEGUIR

    formState.stepStatus = { ...formState.stepStatus, [step]: isValid };

    if (isValid) {
        $BUTTON?.removeAttribute("disabled");
    } else {
        $BUTTON?.setAttribute("disabled", "true");
    }
}

export default validateStep;