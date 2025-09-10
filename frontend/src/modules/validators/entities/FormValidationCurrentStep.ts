import FormRegister from "../../form/controller/FormRegister.js";
import FormValidationCurrentStepUI from "../ui/FormValidationCurrentStepUI.js";

// CLASE RESPONSABLE PARA VALIDACIONES DE FORMULARIO DE REGISTRO POR PASOS Y PARA DETERMINAR QUE TODO EN GENRAL ES VALIDO
export default class FormValidationCurrentStep {
  private readonly formValidationCurrentStepUI: FormValidationCurrentStepUI;
  private readonly formRegister:FormRegister;
  constructor(formValidationCurrentStepUI: FormValidationCurrentStepUI, formRegister:FormRegister) {
    this.formValidationCurrentStepUI = formValidationCurrentStepUI;
    this.formRegister = formRegister;
  }

  // ----------------GETTERS Y SETTERS------------------------------------------//
  public getFormValidationCurrentStepUI(): FormValidationCurrentStepUI {
    return this.formValidationCurrentStepUI;
  }

  public getCurrentStep():number{
    return this.formRegister.getStepForm()
  }
}