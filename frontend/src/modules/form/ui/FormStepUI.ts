// IMPORTACIONES
import { StepFormFactory } from "../../../patterns/factory/StepFormFactory.js";
import FormRegister from "../controller/FormRegister.js";
import FormBaseDto from "../dto/FormBaseDto.js";
import FormBaseUI from "./FormBaseUI.js";
import FormRegisterUI from "./FormRegisterUI.js";

// MODULO QUE SE ENCARGA DE CAMBIOS DE ESTADO EN UI EN TIEMPO DE INTERACCION
export default class FormStepUI extends FormBaseUI {
  constructor(formBaseOptions: FormBaseDto) {
    super(formBaseOptions);
  }

  // LLAMA A LA CREACION DEL PASO 1
  public async buildStepOne({ formRegister, formRegisterUI}: { formRegister: FormRegister; formRegisterUI: FormRegisterUI }): Promise<HTMLDivElement> {
    return await StepFormFactory.createStep("stepRegister", "stepOne", formRegisterUI, formRegister);
  }

  // LLAMA A LA CREACION DEL PASO 2
  public async buildStepTwo({ formRegister, formRegisterUI }: { formRegister: FormRegister; formRegisterUI: FormRegisterUI; }): Promise<HTMLDivElement> {
    return await StepFormFactory.createStep("stepRegister", "stepTwo", formRegisterUI, formRegister);
  }

  // LLAMA A LA CREACIOON DE ULTIMO PASO
  public async buildStepLast({ formRegister, formRegisterUI }: { formRegister: FormRegister; formRegisterUI: FormRegisterUI; }): Promise<HTMLDivElement> {
    return await StepFormFactory.createStep("stepRegister", "stepLast", formRegisterUI, formRegister);
  }

  // LLAMA A LA CREACIOON DE ULTIMO PASO
  public async buildStepBudgeThree({ formRegister, formRegisterUI }: { formRegister: FormRegister; formRegisterUI: FormRegisterUI }): Promise<HTMLDivElement> {
    return await StepFormFactory.createStep("stepRegister", "stepBudgeThree", formRegisterUI, formRegister);
  }

  // METODO PARA DESTRUIR PASO
  public destroyStep({ stepSectionElement }: { stepSectionElement: HTMLDivElement }): void {
    stepSectionElement.remove();
  }

  // METODO PARA ACTUALIZAR
  public async updateStep({ formRegister, buildNewStep }: { formRegister: FormRegister; buildNewStep: ({ formRegister, }: { formRegister: FormRegister; }) => Promise<HTMLDivElement> }): Promise<HTMLDivElement | null> {
    formRegister.decrementStep(); //DECREMENTAR PARA ENCONTRAR VIEJA REFERENCIA
    
    const oldStep:HTMLDivElement | null = document.querySelector(`[data-step="${formRegister.getStepForm()}"]`);
    console.log(oldStep);
    
    if(!oldStep) return null;

    this.destroyStep({ stepSectionElement: oldStep });
    return await buildNewStep({ formRegister }); // ==>EJECUTAR METODO DE PASO DINAMICAMENTE
  }
}