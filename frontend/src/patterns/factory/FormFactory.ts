import { TFormType } from "../../types/types";
import FormRegister from "../../modules/form/register/FormRegister.js";
import FormRegisterUI from "../../modules/form/register/ui/FormRegisterUI.js";
import FormBase from "../../modules/entities/FormBase.js";
import VerifyCodeForm from "../../modules/form/verifyCode/VerifyCodeForm.js";
import FormBaseOptions from "../../modules/dto/FormBaseOptions.js";
import VerifyCodeFormUI from "../../modules/form/ui/VerifyCodeFormUI.js";
import FormStep from "../../modules/form/entities/FormStep.js";
import FormStepUI from "../../modules/form/register/ui/stepsUI/FormStepUI.js";

// FABRICA DE MODALES
export class FormFactory {
  // CREAR MODAL
  static async createForm(type: TFormType, optionsForm: FormBaseOptions): Promise<FormBase> {
    // SEGUN EL CASO DEL TIPO SE  INSTANCIA UNA CLASE DE MODAL
    switch (type) {
      case "register":
        const formStepUI:FormStepUI =new FormStepUI(optionsForm); //==> INSTANCIA DE UI DEL STEP
        const formStep:FormStep = new FormStep(formStepUI); // ==> INSTANCIA DE LOGICA DE STEP 
        const uiRegister: FormRegisterUI = new FormRegisterUI(optionsForm, formStepUI);
        return new FormRegister(optionsForm, formStep, uiRegister).init();
      case "verifyCode": {
        const uiVerifyCode:VerifyCodeFormUI = new VerifyCodeFormUI(optionsForm);
        return new VerifyCodeForm(optionsForm, uiVerifyCode).init();
      }
      default:
        throw new Error(`Modal type "${type}" no soportado`);
    }
  }
}