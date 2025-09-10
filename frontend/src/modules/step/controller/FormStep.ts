// IMPORTACIONES
import { formState } from "../../../config/constant.js";
import { TInputs } from "../../../types/types.js";
import FormRegister from "../../form/controller/FormRegister.js";
import FormStepUI from "../../form/ui/FormStepUI.js";

// import FormValidationCurrentStep from "../register/validators/FormValidationCurrentStep.js";

// MODULO DE CLASE RESPONSABLE PARA LOS PASOS DEL FORMULARIO
export default class FormStep {
  private step: number;
  constructor(private readonly formStepUI: FormStepUI) {
    this.step = 1;
  }

  //LEER PASO
  public getStep(): number {
    return this.step;
  }

  public setStep(step: number): void {
    this.step = step;
  }

  // METODO PARA INCREMENTAR PASO
  public incrementStep(): void {
    this.step++;
  }

  // METODO PARA BAJAR PASO
  public decrementStep(): void {
    this.step--;
  }

  // --------------------ESTO SE PODRIA CORREGIR A FUTURO -------------------------------//
  public setValidationStrategiesMap({ map }: { map: Record<number, TInputs> }): Record<number, TInputs> {
    formState.validationTypesByStep = map; //SIEMPRE EN CADA LLAMADA SE SOBREESCRIBE CREANDO UN NUEVO OBJETO MUTABLE
    return formState.validationTypesByStep;
  }
  //--------------------------------------------------------------------------------//

  // METODO DE CONFIGURACION QUE DECIDE QUE OBJETO SE MAPEA SEGUN REGISTRO => DIFERENCIA ENTRE SI ESTA PRESUPUESTO O NO
  public getStepValidationMap({ formRegister }: { formRegister: FormRegister }): Record<number, TInputs> {
    return formRegister._hasBudge //BANDERA PARA DEFINIR SI CONTIENE PRESUPUESTO O NO
      ? {
          0: "client",
          1: "selectedCategoryAndCheckBoxes",
          2: "filesAndDescription",
          3: "radioBudgetFull",
          4: "text",
        }
      : {
          0: "client",
          1: "selectedCategoryAndCheckBoxes",
          2: "filesAndDescription",
          3: "text",
        };
  }

  public formCurrentStepUI():FormStepUI{
    return this.formStepUI;
  }
}
