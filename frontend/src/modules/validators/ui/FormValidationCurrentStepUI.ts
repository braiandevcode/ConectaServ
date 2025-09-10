// IMPORTACIONES
import { formState, formStateValidField } from "../../../config/constant";
import { TFieldName, TInputs } from "../../../types/types";
import FormRegister from "../../form/controller/FormRegister.js";
import FormValidationCurrentStepDto from "../dto/FormValidationCurrentStepDto.js";

// MODULO DE LOGICA DE VALIDACION DEL FROMULARIO
export default class FormValidationCurrentStepUI {
  constructor(private readonly formValidationCurrentStepDto: FormValidationCurrentStepDto) {}

//   // VALIDACIONES PASO 1
//   public stepOne(): void {

//   }

//   //   // SELECTECT CATEGORIA PASO UNO
//   //   public stepOneSelectCategory() {}

//   // VALIDACIONES PASO 2
//   public stepTwo(): void | null {}

//   // VALIDACIONES PASO 3 PRESUPUESTO
//   public stepThreeBudge(): void | null {}

//   // VALIDACIONES CAMPOS ULTIMO PASO
//   public stepLast(): void {}

  // VALIDAR CAMPOS DE CADA PASO
  public validateStep({ step, formRegister }: { step: number; formRegister: FormRegister; listSectionProfile?: string[] }): void {
    const $BUTTON = formRegister.getFormElement().querySelector(`.container-btn__next[data-step="${step}"]`) as HTMLButtonElement | undefined; // REFERENCIAR BOTO DE PASOS SIGUIENTE

    if (!$BUTTON) return; //ASEGURAR QUE EXISTA ELEMENTO DE BOTON

    // const { isTerms, isSelected, isSelectedLocation, isValidCheckBoxesDetailsProfession, isBudgeNo, isBudgeYes, isValidBasic, isValidBudgeAmount, isValidExperiences, isValidProfile, isValidDescription } = globalStateValidationStep;

    const strategy: TInputs= formState.validationTypesByStep[step]; //OBJETO QUE OBTIENE LA CLAVE DEL PASO Y VERIFICA EL VALOR

    const descriptionText = formRegister.getFormElement().querySelector('[name="descriptionUser"]') as HTMLTextAreaElement | null;
    const profileInput = formRegister.getFormElement().querySelector('[name="imageProfile"]') as HTMLInputElement | null;
    const experiencesInput = formRegister.getFormElement().querySelector('[name="imageExperiences"]') as HTMLInputElement | null;

    //DETECTAR SI EL USUARIO INGRESO ALGO
    const isDescriptionTouched = Boolean(descriptionText?.value.trim());
    const isProfileTouched = Boolean(profileInput?.files?.length);
    const isExperiencesTouched = Boolean(experiencesInput?.files?.length);

    // VALIDAR SOLO LOS CAMPOS TOCADOS
    const allOptionalsValid =
      //SI TOCA EL CAMPO DESCRPCION DEBE VALIDAR SINO POR DEFECTO TRUE =>  ADEMAS
      // SI TOCA EL INPUT DE PERFIL VALIDAR O TRUE => ADEMAS
      // SI TOCA EL INPUT DE EXPERIENCIAS VALIDAR SINO TRUE => TODO DEBE SER TRUE POR DEFAULT SIEMPRE ES TRUE
      (isDescriptionTouched ?  this.formValidationCurrentStepDto.isIsValidDescription() : true) && (isProfileTouched ? this.formValidationCurrentStepDto.isIsValidProfile() : true) && (isExperiencesTouched ? this.formValidationCurrentStepDto.isIsValidExperiences() : true);

    //ESTRATEGIA FINAL PARA ESTE PASO
    const filesAndDescriptionValid =
      // SI NO TOCO DESCRIPCION NI TOCO INPUT PERFIL NI TOCO EXPERIENCIAS => ES TRUE DE LO CONTRARIO ES FALSE
      // O SI TODAS LAS OPCIONES SON VALIDAS, SI ESTAN EN TRUE: SI UNA DE ESTAS DOS ES VERDAD PERMITIR SEGUIR.
      (!isDescriptionTouched && !isProfileTouched && !isExperiencesTouched) || allOptionalsValid;

    // ESTRATEGIA DE VALIDACION POR PASOS
    const strategies: Record<TInputs, boolean> = {
      client: this.formValidationCurrentStepDto.isIsValidBasic() && this.formValidationCurrentStepDto.isIsSelected() && this.formValidationCurrentStepDto.isIsTerms(), //TODOS LOS CAMPOS Y EL CHECK DE TERMINOS (REGISTRO CLIENTE)
      selectedCategoryAndCheckBoxes: this.formValidationCurrentStepDto.isIsSelected() && this.formValidationCurrentStepDto.isIsValidCheckBoxesDetailsProfession(),
      filesAndDescription: filesAndDescriptionValid,
      radioBudgetFull: this.formValidationCurrentStepDto.isIsBudgeNo() || (this.formValidationCurrentStepDto.isIsBudgeYes() && this.formValidationCurrentStepDto.isIsValidBudgeAmount()),
      text: this.formValidationCurrentStepDto.isIsValidBasic() && this.formValidationCurrentStepDto.isIsSelectedLocation() && this.formValidationCurrentStepDto.isIsTerms(),
    };

    const strategyValid: boolean = strategies[strategy]; //VALIDA EL PASO ACTUAL SEGUN EL VALOR DE ESTRATEGIA

    //CONVERTIR A ARRAY DE NODOS O ARRAY VACIO
    const inputsInStep = Array.from(formRegister.getFormElement().querySelectorAll(`[data-step="${step}"] input[name], [data-step="${step}"] textarea[name]`) || []) as HTMLInputElement[];

    // CREA UNA LISTA  DONDE SU NAME ESTE EN formStateValidate
    const fieldsToValidate = inputsInStep.filter(
      (el) => el.name && Object.prototype.hasOwnProperty.call(formStateValidField, el.name) //QUE EL NAME ESTE EN ESE OBJETO
    );

    // SE AGREGA VALIDACIONES A LOS CAMPOS CON MENSAJES DE ERROR
    const allFieldsValid = fieldsToValidate.every((el) => {
      //MAPEAR DEL OBJETO  "formStateValid" LA CLAVE QUE ES EQUIVALENTE AL NAME DEL INPUT Y ACCEDER A SUS VALORES ACTUALES
      const field = formStateValidField[el.name as TFieldName];

      // SI EL CAMPO ES OPCIONAL Y ESTA VACIO LO CONSIDERAMOS VALIDO
      const isEmptyOptional =
        (el.name === "descriptionUser" && !el.value.trim()) || //SI EL NAME ES "descriptionUser" Y ESTA VACIO ES VALIDO
        (el.name === "imageProfile" && !(el as HTMLInputElement).files?.length) || // O SI EL NAME ES "imageProfile" Y ESTA VACIO ES VALIDO
        (el.name === "imageExperiences" && !(el as HTMLInputElement).files?.length); // O SI EL NAME ES "imageExperiences" Y ESTA VACIO ES VALIDO

      const isValidOverride = el.name === "amountBudge" ? this.formValidationCurrentStepDto.isIsValidBudgeAmount : field?.isValid;
      // DEVUELVE TRUE SI:
      // - EL CAMPO ES OPCIONAL Y ESTA VACIO (POR LO TANTO VALIDO)
      // - O EL CAMPO ES VALIDO (isValidOverride)
      // - O EL PRESUPUESTO ES NO
      // - O EL PRESUPUESTO ES SI Y ES VALIDO

      return isEmptyOptional || this.formValidationCurrentStepDto.isIsBudgeNo() || (this.formValidationCurrentStepDto.isIsBudgeYes() && this.formValidationCurrentStepDto.isIsValidBudgeAmount()) || isValidOverride === true;
    });

    const isValid = strategyValid && allFieldsValid; //SI DE LA ESTRATEGIA Y LOS CAMPOS VERIFICADOS ESTAN OK SEGUIR

    formState.stepStatus = { ...formState.stepStatus, [step]: isValid };

    if (isValid) {
      $BUTTON?.removeAttribute("disabled");
    } else {
      $BUTTON?.setAttribute("disabled", "true");
    }
  }
}