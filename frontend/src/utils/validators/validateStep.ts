import { formState, formStateValidField } from "../../config/constant.js";
import { TFieldName, TInputs } from "../../types/types.js";
import { globalStateValidationStep } from "../../config/constant.js";

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
        isValidBudgeAmount,
        isValidExperiences,
        isValidProfile,
        isValidDescription
    } = globalStateValidationStep;


    const strategy: TInputs = formState.validationTypesByStep[step]; //OBJETO QUE OBTIENE LA CLAVE DEL PASO Y VERIFICA EL VALOR

    const descriptionText = form?.querySelector('[name="descriptionUser"]') as HTMLTextAreaElement | null;
    const profileInput = form?.querySelector('[name="imageProfile"]') as HTMLInputElement | null;
    const experiencesInput = form?.querySelector('[name="imageExperiences"]') as HTMLInputElement | null;

    //DETECTAR SI EL USUARIO INGRESO ALGO
    const isDescriptionTouched = Boolean(descriptionText?.value.trim());
    const isProfileTouched = Boolean(profileInput?.files?.length);
    const isExperiencesTouched = Boolean(experiencesInput?.files?.length);

    // VALIDAR SOLO LOS CAMPOS TOCADOS
    const allOptionalsValid =
        //SI TOCA EL CAMPO DESCRPCION DEBE VALIDAR SINO POR DEFECTO TRUE =>  ADEMAS
        // SI TOCA EL INPUT DE PERFIL VALIDAR O TRUE => ADEMAS
        // SI TOCA EL INPUT DE EXPERIENCIAS VALIDAR SINO TRUE => TODO DEBE SER TRUE POR DEFAULT SIEMPRE ES TRUE
        (isDescriptionTouched ? isValidDescription : true) && (isProfileTouched ? isValidProfile : true) && (isExperiencesTouched ? isValidExperiences : true);


    //ESTRATEGIA FINAL PARA ESTE PASO
    const filesAndDescriptionValid =(
        // SI NO TOCO DESCRIPCION NI TOCO INPUT PERFIL NI TOCO EXPERIENCIAS => ES TRUE DE LO CONTRARIO ES FALSE
        // O SI TODAS LAS OPCIONES SON VALIDAS, SI ESTAN EN TRUE: SI UNA DE ESTAS DOS ES VERDAD PERMITIR SEGUIR.
        (!isDescriptionTouched && !isProfileTouched && !isExperiencesTouched) || allOptionalsValid
    );
    
    // ESTRATEGIA DE VALIDACION POR PASOS
    const strategies: Record<TInputs, boolean> = {
        client: isValidBasic && isSelected && isTerms, //TODOS LOS CAMPOS Y EL CHECK DE TERMINOS (REGISTRO CLIENTE)
        selectedCategoryAndCheckBoxes: isSelected && isValidCheckBoxesDetailsProfession,
        filesAndDescription: filesAndDescriptionValid,
        radioBudgetFull: isBudgeNo || (isBudgeYes && isValidBudgeAmount),
        text: isValidBasic && isSelected && isTerms,
    };

    const strategyValid: boolean = strategies[strategy]; //VALIDA EL PASO ACTUAL SEGUN EL VALOR DE ESTRATEGIA

    //CONVERTIR A ARRAY DE NODOS O ARRAY VACIO
    const inputsInStep = Array.from(form?.querySelectorAll(`[data-step="${step}"] input[name], [data-step="${step}"] textarea[name]`) || []) as HTMLInputElement[];

    // CREA UNA LISTA  DONDE SU NAME ESTE EN formStateValidate 
    const fieldsToValidate = inputsInStep.filter(el =>
        el.name &&
        Object.prototype.hasOwnProperty.call(formStateValidField, el.name) //QUE EL NAME ESTE EN ESE OBJETO
    );

    // SE AGREGA VALIDACIONES A LOS CAMPOS CON MENSAJES DE ERROR
    const allFieldsValid = fieldsToValidate.every(el => {
        //MAPEAR DEL OBJETO  "formStateValid" LA CLAVE QUE ES EQUIVALENTE AL NAME DEL INPUT Y ACCEDER A SUS VALORES ACTUALES
        const field = formStateValidField[el.name as TFieldName];

        // SI EL CAMPO ES OPCIONAL Y ESTA VACIO LO CONSIDERAMOS VALIDO
        const isEmptyOptional =
            (el.name === "descriptionUser" && (!el.value.trim())) || //SI EL NAME ES "descriptionUser" Y ESTA VACIO ES VALIDO
            (el.name === "imageProfile" && (!(el as HTMLInputElement).files?.length)) || // O SI EL NAME ES "imageProfile" Y ESTA VACIO ES VALIDO
            (el.name === "imageExperiences" && (!(el as HTMLInputElement).files?.length)); // O SI EL NAME ES "imageExperiences" Y ESTA VACIO ES VALIDO

        const isValidOverride = el.name === "amountBudge" ? isValidBudgeAmount : field?.isValid;


        // DEVUELVE TRUE SI:
        // - EL CAMPO ES OPCIONAL Y ESTA VACIO (POR LO TANTO VALIDO)
        // - O EL CAMPO ES VALIDO (isValidOverride)
        // - O EL PRESUPUESTO ES NO
        // - O EL PRESUPUESTO ES SI Y ES VALIDO

        return isEmptyOptional || isBudgeNo || (isBudgeYes && isValidBudgeAmount) || isValidOverride === true;
    });

    const isValid = (strategyValid && allFieldsValid);  //SI DE LA ESTRATEGIA Y LOS CAMPOS VERIFICADOS ESTAN OK SEGUIR

    console.log('ES VALIDO ESTE PASO?: ', isValid);
    

    formState.stepStatus = { ...formState.stepStatus, [step]: isValid };

    if (isValid) {
        $BUTTON?.removeAttribute("disabled");
    } else {
        $BUTTON?.setAttribute("disabled", "true");
    }
}

export default validateStep;