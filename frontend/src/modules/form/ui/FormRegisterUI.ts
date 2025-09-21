import FormStepUI from 'modules/step/ui/FormStepUI.js';
import ButtonBaseUI from '../../../modules/buttons/ui/ButtonBaseUI.js';
import { ButtonFactory } from '../../../patterns/factory/ButtonFactory.js';
import ButtonBaseDto from '../../buttons/dto/ButtonsBaseDto.js';
import FormRegister from '../controller/FormRegister.js';
import FormBaseDto from '../dto/FormBaseDto.js';
import FormBaseUI from './FormBaseUI.js';

export default class FormRegisterUI extends FormBaseUI {
  private formStepUI: FormStepUI;
  constructor(formBaseOptions: FormBaseDto, formStepUI: FormStepUI) {
    super(formBaseOptions);
    this.formStepUI = formStepUI;
  }

  //-------------------------------------METODOS DE CREACION DE FORMULARIO REGISTRO-------------------------------------------//
  //CREACION DE CABECERA DE FORMULARIO
  public buildHeader(): HTMLDivElement {
    const container = document.createElement('div'); //CONTENEDOR PRINCIPAL HEADER DEL FORM
    container.classList.add('c-flex', 'c-flex-column', 'c-flex-justify-center', 'register-formProfessional__header');

    // H2
    const h2 = document.createElement('h2');
    h2.classList.add('c-flex', 'c-flex-wrap', 'c-flex-items-center', 'gap-1/2', 'form-basic__subtitle');

    // <div> DENTRO DEL <h2>
    const titleWrapper = document.createElement('div');
    titleWrapper.classList.add('c-flex', 'w-full', 'c-flex-items-center', 'gap-1/2');

    const iconToolbox = document.createElement('i');
    iconToolbox.classList.add('fas', 'fa-solid', 'fa-toolbox');

    const spanTitle = document.createElement('span');
    spanTitle.textContent = 'Informacion Profesional';

    titleWrapper.append(iconToolbox, spanTitle);
    h2.appendChild(titleWrapper);

    // <div> TEXTO INFORMATIVO
    const infoWrapper = document.createElement('div');
    infoWrapper.classList.add('mb-1', 'c-flex', 'c-flex-items-center', 'gap-1/2', 'container-textInfo');

    const iconInfo = document.createElement('i');
    iconInfo.classList.add('fas', 'fa-info-circle');

    const small = document.createElement('small');
    small.innerHTML = `Campos con (<span class="span-required">*</span>) son obligatorios`;

    infoWrapper.append(iconInfo, small);

    container.append(h2, infoWrapper);
    return container; //RETORNAR CONTENEDOR
  }

  //CREACION DEL CUERPO DE LOS PASOS
  public buildBody(): HTMLDivElement {
    const body = document.createElement('div'); //CONTENEDOR PRINCIPAL QUE AGRUPA LOS PASOS
    body.classList.add('c-flex', 'c-flex-column', 'c-flex-justify-center', 'form-professional'); //AGREGAMOS SUS CLASES
    body.setAttribute('data-section', 'professional'); //ATRIBUTOS
    return body;
  }

  // METODO PARA DESTRUIR
  public destroyStep({ stepSectionElement }: { stepSectionElement: HTMLDivElement }): void {
    this.formStepUI.destroyStep({ stepSectionElement });
  }

  // METODO PARA ACTUALIZAR PASO
  public async updateStep({ step, formRegister }: { step: number; formRegister: FormRegister }): Promise<void> {
    // GUARDAR SECCION NUEVA
    const newSection: HTMLDivElement | void = await this.formStepUI.updateCurrentStep({
      step,
      formRegister,
      formRegisterUI: this,
    });

    if (!newSection) return; //SI NO HAY NUEVA SECCION RETORNAR Y NO SEGUIR
    const formBody: HTMLDivElement = formRegister.getBodyForm(); //CUERPO DEL BODY
    formBody.append(newSection); // GUARDAR SECCION NUEVA EN BODY
  }

  // METODO REPETITIVO PARA CREAR BOTON SIGUIENTE
  public createBtnNext({ formRegister, formRegisterUI }: { formRegister: FormRegister; formRegisterUI: FormRegisterUI }): ButtonBaseUI {
    //ESTABLECER CONFIGURACION PARA BOTON
    const configOptionNextButton: ButtonBaseDto = new ButtonBaseDto({
      type: 'button',
      btnText: 'Siguiente',
      classesBtn: 'btn c-flex c-flex-justify-center c-flex-items-center gap-1/2 cursor-pointer container-btn__next',
      attrs: { 'data-step': `${formRegister.getStepForm()}` },
      iconBtnClasses: 'fas fa-arrow-circle-right',
      disabled: false,
      'aria-label': 'Siguiente',
      eventName: 'click',
      handler: async () => this.handlerClickNext({ formRegister, formRegisterUI }),
      isLoading: false, //UN LOADER QUE NO APLICA SI ES FALSE
    });

    // CREAR BOTON Y ESTABLECER CONFIGURACION
    const btnNextInstanceUI: ButtonBaseUI = ButtonFactory.createButton('next', configOptionNextButton);
    btnNextInstanceUI.on(); // ==> ESCUCHAR EVENTO
    return btnNextInstanceUI;
  }

  // METODO REUTILIZABLEPARA CREAR BOTON PREVIO
  public createBtnPrev({ formRegister, formRegisterUI }: { formRegister: FormRegister; formRegisterUI: FormRegisterUI }): ButtonBaseUI {
    const buttonOptions: ButtonBaseDto = new ButtonBaseDto({
      'aria-label': 'Regresar',
      type: 'button',
      disabled: false,
      classesBtn: 'c-flex c-flex-self-start c-flex-items-center gap-1/2 cursor-pointer register-userProfessional__arrow-left',
      attrs: { 'data-step_prev': `${formRegister.getStepForm()}` }, //MANTIENE VALOR GLOBAL ACTUAL
      iconBtnClasses: 'to-left fas fa-arrow-circle-left',
      eventName: 'click',
      handler: () => this.handlerClickPrev({ formRegister, formRegisterUI }),
      isLoading: false,
    });

    const btnPrevInstanceUI: ButtonBaseUI = ButtonFactory.createButton('prev', buttonOptions);
    btnPrevInstanceUI.on(); // ESCUCHAR EVENTO
    return btnPrevInstanceUI;
  }

  // DESTRUIr BOTON PREVIO
  public destroyBtnPrev(): void {
    const btnPrev = document.querySelector<HTMLButtonElement>('[data-step_prev]'); //REFERENCIAR POR SELECTOR
    if (btnPrev) {
      btnPrev.remove();
    }
  }

  // VER PASO UI
  public getStepUI(): FormStepUI {
    return this.formStepUI;
  }

  //----------------- METODOS PRIVADOS----------------------------//
  // METODO PRIVADO DE ENCAPSULAMIENTO PARA HANDLER CLICK DE BOTON SIGUIENTE
  private async handlerClickNext({ formRegister, formRegisterUI }: { formRegister: FormRegister; formRegisterUI: FormRegisterUI }): Promise<void> {
    // ==> NO PERMITIR RETROCEDER SI EL PASO ES 5
    if (formRegister.getStepForm() >= 4) return;

    // EJECUTAR UN SCROLL HACIA EL TOP EN CADA EVENTO
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    });

    const clearStep: number = formRegister.getStepForm(); //GUARDA EN VARIABLE LOCALMENTE NUMERO DE PASO REFERENTE A ELIMINAR DE UI

    formRegister.incrementStep(); // INCREMENTAR VALOR GLOBAL DEL PASO
    await formRegisterUI.updateStep({ step: clearStep, formRegister }); // => ATUALIZAR UI DE PASO

    formRegister.setSelectorForClosest('.register-userProfessional__content'); //PASAMOS EL SELECTOR A REFERENCIAR
    const closestForm: HTMLElement | null = formRegister.getClosest(); //REFERENCIAR AL CONTENEDOR DEL FORMULARIO

    // SI ES NULO
    if (!closestForm) return; // ==> RETORNAR Y NO SEGUIR
    formRegister.destroyBtnPrev(); //DESTRUIR BOTON PREVIO ANTES

    // INSTANCIAR Y CREAR
    const instanceBtnPrev: ButtonBaseUI = formRegister.createBtnPrev();
    // GUARDAR BOTON PREVIO EN ELEMENTO REFERENCIADO
    closestForm.prepend(instanceBtnPrev.getBtnElement());
  }

  // METODO PRIVADO DE ENCAPSULAMIENTO PARA HANDLER CLICK DE BOTON PREVIO
  private async handlerClickPrev({ formRegister, formRegisterUI }: { formRegister: FormRegister; formRegisterUI: FormRegisterUI }): Promise<void> {
    if (formRegister.getStepForm() <= 1) return; // ==> NO PERMITIR RETROCEDER SI EL PASO ES 1

    // EJECUTAR UN SCROLL HACIA EL TOP EN CADA EVENTO
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    });

    formRegister.decrementStep(); // PRIMERO BAJO

    const clearStep: number = formRegister.getStepForm() + 1; //GUARDA EN VARIABLE LOCALMENTE NUMERO DE PASO REFERENTE A ELIMINAR DE UI
    await formRegisterUI.updateStep({ step: clearStep, formRegister }); //PASAR EL NUEVO PASO

    // SI ES 1 DESTRUIR BOTON
    if (formRegister.getStepForm() === 1) {
      formRegister.destroyBtnPrev();
      return; // ==> NO SEGUIR
    }

    formRegister.setSelectorForClosest('.register-userProfessional__content'); //PASAMOS EL SELECTOR A REFERENCIAR
    const closestForm: HTMLElement | null = formRegister.getClosest(); //REFERENCIAR AL CONTENEDOR DEL FORMULARIO

    // SI ES NULO
    if (!closestForm) return; // ==> RETORNAR Y NO SEGUIR

    formRegister.destroyBtnPrev(); //DESTRUIR BOTON PREVIO ANTES
    // INSTANCIAR Y CREAR
    const instanceBtnPrev: ButtonBaseUI = formRegister.createBtnPrev();

    //GUARDAR BOTON PREVIO EN ELEMENTO REFERENCIADO
    closestForm.prepend(instanceBtnPrev.getBtnElement());
  }
}
