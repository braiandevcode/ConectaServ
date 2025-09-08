import FormStepTwoUI from "../../modules/form/register/ui/stepsUI/FormStepTwoUI.js";
import FormStepOneUI from "../../modules/form/register/ui/stepsUI/FormStepOneUI.js";
import { TTypeFormRegisterStep, TTypeStep } from "../../types/types";
import FormStepLastUI from "../../modules/form/register/ui/stepsUI/FormStepLastUI.js";
import FormStepBudgeThreeUI from "../../modules/form/register/ui/stepsUI/FormStepBudgeThreeUI.js";
import FormRegister from "../../modules/form/register/FormRegister.js";
import InputBuilder from "../../modules/form/register/builders/InputBuilder.js";
import OptionGroupBuilder from "../../modules/form/register/builders/OptionGroupBuilder.js";
import FormRegisterUI from "../../modules/form/register/ui/FormRegisterUI.js";
import FormStepUI from "modules/form/register/ui/stepsUI/FormStepUI.js";

// FABRICA DE PASOS UI
export class StepFormFactory {
  // METODO PARA VERIFICAR NUMERO DE PASOS EN FORMULARIO REGISTRO
  private static switchStep(nunmberStep: TTypeFormRegisterStep, formRegisterUI:FormRegisterUI, formRegister: FormRegister): HTMLDivElement | Promise<HTMLDivElement> {
    switch (nunmberStep) {
      case "stepOne":
        const optionGroupBuilderStepOne: OptionGroupBuilder = new OptionGroupBuilder(formRegister);
        return new FormStepOneUI(formRegister, optionGroupBuilderStepOne).buildStep({ formRegisterUI });
      case "stepTwo":
        return new FormStepTwoUI(formRegister).buildStep({ formRegisterUI });
      case "stepLast":
        const inputLast: InputBuilder = new InputBuilder(formRegister);
        return new FormStepLastUI(formRegister, inputLast).buildStep({ formRegisterUI })
      case "stepBudgeThree":
        const optionGroupBuilderStepThree: OptionGroupBuilder = new OptionGroupBuilder(formRegister);
        const inputBuilder: InputBuilder = new InputBuilder(formRegister);
        return new FormStepBudgeThreeUI(inputBuilder, optionGroupBuilderStepThree).buildStep({ formRegisterUI });
      default:
        throw new Error(`Modal type "${nunmberStep}" no soportado`);
    }
  }

  // CREAR PASOas
  static async createStep(type: TTypeStep, numberStep: TTypeFormRegisterStep, formRegisterUI:FormRegisterUI, formRegister:FormRegister): Promise<HTMLDivElement> {
    // SEGUN EL CASO DEL TIPO SE INSTANCIA UNA CLASE DE PASO Y CONSTRUYE
    switch (type) {
      case "stepRegister":
        return this.switchStep(numberStep, formRegisterUI, formRegister); //EN CASO QUE SEA REGISTRO EJECUTAR EL SWITCH
      default:
        throw new Error(`Modal type "${type}" no soportado`);
    }
  }
}