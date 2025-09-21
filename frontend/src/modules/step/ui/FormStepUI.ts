// IMPORTACIONES
import { EKeyDataByStep } from '../../../types/enums.js';
import { StepFormFactory } from '../../../patterns/factory/StepFormFactory.js';
import FormBaseUI from '../../../modules/form/ui/FormBaseUI.js';
import FormBaseDto from '../../../modules/form/dto/FormBaseDto.js';
import FormRegister from '../../../modules/form/controller/FormRegister.js';
import FormRegisterUI from '../../../modules/form/ui/FormRegisterUI.js';
import FormStep from '../entities/FormStep.js';

// MODULO QUE SE ENCARGA DE CAMBIOS DE ESTADO EN UI EN TIEMPO DE INTERACCION
export default class FormStepUI extends FormBaseUI {
  constructor(
    private formStep: FormStep,
    formBaseOptions: FormBaseDto,
  ) {
    super(formBaseOptions);
  }

  // METODO DONDE EL VALOR DEBE SER SI O SI DEL TIPO EKeyDataByStep
  private isEKeyDataByStep(value: any): value is EKeyDataByStep {
    return Object.values(EKeyDataByStep).includes(value);
  }

  //LLAMA A LA CREACION DEL PASO
  public async buildStep({ formRegister, formRegisterUI }: { formRegister: FormRegister; formRegisterUI: FormRegisterUI }): Promise<HTMLDivElement> {
    return await StepFormFactory.createStep('stepRegister', this.getStepByString(), formRegisterUI, formRegister);
  }

  // MOSTRAR VALOR DEL PASO
  public getStep(): number {
    return this.formStep.getStep();
  }

  // VER PASO ACTUAL TIPADO A "EKeyDataByStep"
  public getStepByString(): EKeyDataByStep {
    // OBTIENE EL PASO ACTUAL COMO STRING DESDE formStep
    const rawStep = String(this.formStep.getStep());

    // VALIDA SI EL VALOR OBTENIDO ES UN PASO DEFINIDO EN EKeyDataByStep
    if (!this.isEKeyDataByStep(rawStep)) {
      throw new Error(`Invalid step: ${rawStep}`); // SI NO ES VALIDO, LANZA ERROR
    }

    // RETORNA EL PASO YA VALIDADO Y TIPADO COMO EKeyDataByStep
    return rawStep;
  }

  public setStep(step: number): void {
    this.formStep.setStep(step);
  }

  // METODO PARA INCREMENTAR PASO
  public incrementStep(): void {
    this.formStep.incrementStep();
  }

  // METODO PARA BAJAR PASO
  public decrementStep(): void {
    this.formStep.decrementStep();
  }

  // METODO PARA DESTRUIR PASO
  public destroyStep({ stepSectionElement }: { stepSectionElement: HTMLDivElement }): void {
    stepSectionElement.remove();
  }

  // METODO PARA ACTUALIZAR PASO EN UI
  public async updateCurrentStep({ step, formRegister, formRegisterUI }: { step: number; formRegister: FormRegister; formRegisterUI: FormRegisterUI }): Promise<HTMLDivElement | void> {
    const currentStep: HTMLDivElement | null = document.querySelector(`[data-step="${step}"]`); //GUARDA EN MEMORIA REFERENCIA AL PASO ACTUAL

    if (!currentStep) return; // RETORNAR NULL

    this.destroyStep({ stepSectionElement: currentStep }); // ==> DESTRUIR EL PASO ACTUAL
    return await this.buildStep({ formRegister, formRegisterUI }); // ==> EJECUTAR METODO DE PASO DINAMICAMENTE ES ASYNCRONO
  }
}
