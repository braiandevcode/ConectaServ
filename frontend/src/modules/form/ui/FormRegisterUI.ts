import ButtonBaseOptions from "../../../../modules/dto/ButtonBaseOptions.js";
import FormBaseOptions from "../../../dto/FormBaseOptions.js";
import FormBaseUI from "../../ui/FormBaseUI.js";
import FormRegister from "../FormRegister.js";
import FormStepUI from "./stepsUI/FormStepUI.js";
import { ButtonNext, ButtonPrev } from "../../../../modules/components/Buttons.js";
import { ButtonFactory } from "../../../../patterns/factory/ButtonFactory.js";

export default class FormRegisterUI extends FormBaseUI {
  private formStepUI: FormStepUI;
  constructor(formBaseOptions: FormBaseOptions, formStepUI: FormStepUI) {
    super(formBaseOptions);
    this.formStepUI = formStepUI;
  }

  //-------------------------------------METODOS DE CREACION DE FORMULARIO REGISTRO-------------------------------------------//
  //CREACION DE CABECERA DE FORMULARIO
  public buildHeader(): HTMLDivElement {
    const container = document.createElement("div"); //CONTENEDOR PRINCIPAL HEADER DEL FORM
    container.classList.add("c-flex", "c-flex-column", "c-flex-justify-center", "register-formProfessional__header");

    // H2
    const h2 = document.createElement("h2");
    h2.classList.add("c-flex", "c-flex-wrap", "c-flex-items-center", "gap-1/2", "form-basic__subtitle");

    // <div> DENTRO DEL <h2>
    const titleWrapper = document.createElement("div");
    titleWrapper.classList.add("c-flex", "w-full", "c-flex-items-center", "gap-1/2");

    const iconToolbox = document.createElement("i");
    iconToolbox.classList.add("fas", "fa-solid", "fa-toolbox");

    const spanTitle = document.createElement("span");
    spanTitle.textContent = "Informacion Profesional";

    titleWrapper.append(iconToolbox, spanTitle);
    h2.appendChild(titleWrapper);

    // <div> TEXTO INFORMATIVO
    const infoWrapper = document.createElement("div");
    infoWrapper.classList.add("mb-1", "c-flex", "c-flex-items-center", "gap-1/2", "container-textInfo");

    const iconInfo = document.createElement("i");
    iconInfo.classList.add("fas", "fa-info-circle");

    const small = document.createElement("small");
    small.innerHTML = `Campos con (<span class="span-required">*</span>) son obligatorios`;

    infoWrapper.append(iconInfo, small);

    container.append(h2, infoWrapper);
    return container; //RETORNAR CONTENEDOR
  }

  //CREACION DEL CUERPO DE LOS PASOS
  public buildBody(): HTMLDivElement {
    const body = document.createElement("div"); //CONTENEDOR PRINCIPAL QUE AGRUPA LOS PASOS
    body.classList.add("c-flex", "c-flex-column", "c-flex-justify-center", "form-professional"); //AGREGAMOS SUS CLASES
    body.setAttribute("data-section", "professional"); //ATRIBUTOS
    return body;
  }

  // METODO PARA DESTRUIR
  public destroyStep({ stepSectionElement }: { stepSectionElement: HTMLDivElement }): void {
    this.formStepUI.destroyStep({ stepSectionElement });
  }

  // METODO PARA ACTUALIZAR
  public async updateStep({ formRegister, buildNewStep }: { formRegister: FormRegister; buildNewStep: ({ formRegister }: { formRegister: FormRegister }) => Promise<HTMLDivElement> }): Promise<void> {
    const newSection: HTMLDivElement | null = await this.formStepUI.updateStep({ formRegister, buildNewStep });
    if (!newSection) return;
    const formBody: HTMLDivElement = formRegister.getBodyForm();
    formBody.append(newSection);
  }

  // METODO REPETITIVO PARA CREAR BOTON PREVIO
  public createBtnPrev({ formRegister }: { formRegister: FormRegister }): ButtonPrev {
    const buttonOptions: ButtonBaseOptions = new ButtonBaseOptions({
      disabled: false,
      "aria-label": "Regresar",
      type: "button",
      classesBtn: "c-flex c-flex-self-start c-flex-items-center gap-1/2 cursor-pointer register-userProfessional__arrow-left",
      attrs: { "data-step_prev": `${formRegister.getStepForm()}` },
      iconBtnClasses: "to-left fas fa-arrow-circle-left",
    });

    return ButtonFactory.createButton("prev", buttonOptions) as ButtonPrev;
  }

  // METODO REPETITIVO PARA CREAR BOTON SIGUIENTE
  public createBtnNext({ formRegister }: { formRegister: FormRegister }): ButtonNext {
    //ESTABLECER CONFIGURACION PARA BOTON
    const configOptionNextButton: ButtonBaseOptions = new ButtonBaseOptions({
      type: "button",
      btnText: "Siguiente",
      classesBtn: "btn c-flex c-flex-justify-center c-flex-items-center gap-1/2 cursor-pointer container-btn__next",
      attrs: { "data-step": `${formRegister.getStepForm()}` },
      iconBtnClasses: "fas fa-arrow-circle-right",
      disabled: false,
    });

    // CREAR BOTON Y ESTABLECER CONFIGURACION
    return ButtonFactory.createButton("next", configOptionNextButton) as ButtonNext;
  }

  // SUSCRIBIR EVENTO CLICK A BOTON SIGUIENTE
  public suscribeClickBtnNext({ instanceBtn, buildNewStep, formRegister, formRegisterUI }: { instanceBtn: ButtonNext; formRegister: FormRegister; formRegisterUI: FormRegisterUI, buildNewStep: ({ formRegister, }: { formRegister: FormRegister; }) => Promise<HTMLDivElement> }): void {  
    // SUSCRIBIR EVENTO AL BOTON
    instanceBtn.on("click", () => {

      formRegister.incrementStep(); // ==> INCREMENTAR A 1
      console.log(formRegister.getStepForm());

      // ACTUALIZAR A NUEVO PASO
      formRegisterUI.updateStep({ formRegister, buildNewStep });

      // REFERENCIAR ANCESTRO DEL FORM
      formRegister.setSelectorForClosest(".register-userProfessional__content"); //ASIGNO EL SELECTOR A QUIEN QUIERO REFERENCIAR
      const closestForm = formRegister.getClosest() as HTMLDivElement | null; //==> SE REFERENCIA ANCESTRO
      if (!closestForm) return; // ==> SI ES NULO SOLO RETORNAR

      formRegister.destroyBtnPrev(); // ===>REMOVER ANTES DE VOLVER A CREAR
      const instanceBtnPrev: ButtonPrev = formRegister.createBtnPrev(); // ==> CREAR INSTANCIA

      closestForm.prepend(instanceBtnPrev.getElement()); // ==> ASIGNAR ELEMENTO AL CONTENEDOR ANCESTRO DEL FORMULARIO
    });
  }
  // DESTRUI BOTON PREVIO
  public destroyBtnPrev(): void {
    const btnPrev = document.querySelector<HTMLButtonElement>("[data-step_prev]"); //REFERENCIAR POR SELECTOR
    if (btnPrev) {
      btnPrev.remove();
    }
  }

  // VER PASO UI
  public getStepUI(): FormStepUI {
    return this.formStepUI;
  }
}