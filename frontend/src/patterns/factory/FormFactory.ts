import FormStepUI from '../../modules/step/ui/FormStepUI.js';
import FormRegister from '../../modules/form/controller/FormRegister.js';
import VerifyCodeForm from '../../modules/form/controller/VerifyCodeForm.js';
import FormBaseDto from '../../modules/form/dto/FormBaseDto.js';
import FormBase from '../../modules/form/entities/FormBase.js';
import FormRegisterUI from '../../modules/form/ui/FormRegisterUI.js';
import VerifyCodeFormUI from '../../modules/form/ui/VerifyCodeFormUI.js';
import FormStep from '../../modules/step/entities/FormStep.js';
import { TFormType } from '../../types/types.js';

// FABRICA DE MODALES
export class FormFactory {
  // CREAR MODAL
  static async createForm(type: TFormType, optionsForm: FormBaseDto): Promise<FormBase> {
    // SEGUN EL CASO DEL TIPO SE  INSTANCIA UNA CLASE DE MODAL
    switch (type) {
      case 'register':
        const formStep: FormStep = new FormStep(); // ==> INSTANCIA DE LOGICA DE STEP
        const formStepUI: FormStepUI = new FormStepUI(formStep, optionsForm); //==> INSTANCIA DE UI DEL STEP
        const uiRegister: FormRegisterUI = new FormRegisterUI(optionsForm, formStepUI);
        return new FormRegister(optionsForm, uiRegister).init();
      case 'verifyCode': {
        const uiVerifyCode: VerifyCodeFormUI = new VerifyCodeFormUI(optionsForm);
        return new VerifyCodeForm(optionsForm, uiVerifyCode).init();
      }
      default:
        throw new Error(`Modal type "${type}" no soportado`);
    }
  }
}
