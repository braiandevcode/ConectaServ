import FormRegister from '../../modules/form/controller/FormRegister.js';
import InputBuilder from '../../modules/form/ui/builder/InputBuilder.js';
import OptionGroupBuilder from '../../modules/form/ui/builder/OptionGroupBuilder.js';
import FormRegisterUI from '../../modules/form/ui/FormRegisterUI.js';
import FormStepLastUI from '../../modules/form/ui/FormStepLastUI.js';
import { TTypeFormRegisterStep, TTypeStep } from '../../types/types';
import FormStepOneUI from '../../modules/form/ui/FormStepOneUI.js';
import FormStepTwoUI from '../../modules/form/ui/FormStepTwoUI.js';
import FormStepThreeUI from '../../modules/form/ui/FormStepThreeUI.js';
import { EKeyDataByStep } from '../../types/enums.js';

// FABRICA DE PASOS UI
export class StepFormFactory {
  // METODO PARA VERIFICAR NUMERO DE PASOS EN FORMULARIO REGISTRO
  private static switchStep(nunmberStep: TTypeFormRegisterStep, formRegisterUI: FormRegisterUI, formRegister: FormRegister): HTMLDivElement | Promise<HTMLDivElement> {
    switch (nunmberStep) {
      case EKeyDataByStep.ONE:
        const optionGroupBuilderStepOne: OptionGroupBuilder = new OptionGroupBuilder(formRegister);
        return new FormStepOneUI(formRegister, optionGroupBuilderStepOne).buildStep({ formRegisterUI });
      case EKeyDataByStep.TWO:
        return new FormStepTwoUI(formRegister).buildStep({ formRegisterUI });
      case EKeyDataByStep.THREE:
        const optionGroupBuilderStepThree: OptionGroupBuilder = new OptionGroupBuilder(formRegister);
        const inputBuilder: InputBuilder = new InputBuilder(formRegister);
        return new FormStepThreeUI(inputBuilder, optionGroupBuilderStepThree).buildStep({ formRegisterUI });
      case EKeyDataByStep.FOUR:
        const inputLast: InputBuilder = new InputBuilder(formRegister);
        return new FormStepLastUI(formRegister, inputLast).buildStep({ formRegisterUI });
      default:
        throw new Error(`Step type "${nunmberStep}" no soportado`);
    }
  }

  // CREAR PASOas
  static async createStep(type: TTypeStep, numberStep: TTypeFormRegisterStep, formRegisterUI: FormRegisterUI, formRegister: FormRegister): Promise<HTMLDivElement> {
    // SEGUN EL CASO DEL TIPO SE INSTANCIA UNA CLASE DE PASO Y CONSTRUYE
    switch (type) {
      case 'stepRegister':
        return this.switchStep(numberStep, formRegisterUI, formRegister); //EN CASO QUE SEA REGISTRO EJECUTAR EL SWITCH
      default:
        throw new Error(`Modal type "${type}" no soportado`);
    }
  }
}
