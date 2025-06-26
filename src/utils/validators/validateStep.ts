import { formState, formStateValidField } from "../../config/constant.js";
import { TFieldName, TInputs } from "../../types/types";
import { globalStateValidationStep } from "../../config/constant.js";
import { isLengthValid } from "../../ui/auxiliars.js";

// VALIDAR CAMPOS DE CADA PASO
const validateStep = ({ step, form }: { step: number; form: HTMLFormElement | null | undefined; listSectionProfile?: string[] }): void => {
    const $BUTTON = document.querySelector(`.container-btn__next[data-step="${step}"]`) as HTMLButtonElement | undefined; // REFERENCIAR BOTO DE PASOS SIGUIENTE

    if (!$BUTTON) return; //ASEGURAR QUE EXISTA ELEMENTO DE BOTON

    const {
        isTerms,
        isSelected,
        isValidCheckBoxesDetailsProfession,
        isBudgeNo,
        isBudgeYes,
        isValidBasic,
        isValidBudgeAmount
    } = globalStateValidationStep;


    const strategy: TInputs = formState.validationTypesByStep[step]; //OBJETO QUE OBTIENE LA CLAVE DEL PASO Y VERIFICA EL VALOR

    // ESTRATEGIA DE VALIDACION POR PASOS
    const strategies: Record<TInputs, boolean> = {
        client: isValidBasic && isTerms, //TODOS LOS CAMPOS Y EL CHECK DE TERMINOS (REGISTRO CLIENTE)
        text: isValidBasic,
        selectedCategoryAndCheckBoxes: isSelected && isValidCheckBoxesDetailsProfession,
        checkbox: isValidCheckBoxesDetailsProfession,
        radioBudgetFull: isBudgeNo || (isBudgeYes && isValidBudgeAmount),
        filesTextareaTerms: isTerms,
    };

    const strategyValid: boolean = strategies[strategy]; //VALIDA EL PASO ACTUAL SEGUN EL VALOR DE ESTRATEGIA

    //CONVERTIR A ARREY DE NODOS O ARRAY VACIO
    const inputsInStep = Array.from(form?.querySelectorAll(`[data-step="${step}"] input[name], [data-step="${step}"] textarea[name]`) || []) as HTMLInputElement[];

    // CREA UNA LISTA  DONDE SU NAME ESTE EN formStateValidate Y QUE NO INCLUYA LA DE LA LISTA(SECCION PERFIL)
    const fieldsToValidate = inputsInStep.filter(el =>
        el.name &&
        Object.prototype.hasOwnProperty.call(formStateValidField, el.name) //QUE EL NAME ESTE EN ESE OBJETO
    );

    // SE AGREGA VALIDACIONES A LOS CAMPOS CON MENSAJES DE ERROR
    const allFieldsValid = fieldsToValidate.every(el => {
        const field = formStateValidField[el.name as TFieldName];
        // SI EL CAMPO ES OPCIONAL Y ESTA VACIO LO CONSIDERAMOS VALIDO
        const isEmptyOptional =
            (el.name === "description" && !el.value.trim()) ||
            (el.name === "imageProfile" && !(el as HTMLInputElement).files?.length) ||
            (el.name === "imageExperiences" && !(el as HTMLInputElement).files?.length);

        const isValidOverride = el.name === "amountBudge" ? isValidBudgeAmount : field?.isValid;

        return isEmptyOptional || isValidOverride === true;
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