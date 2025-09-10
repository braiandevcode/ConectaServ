
import { ButtonFactory } from "../../../patterns/factory/ButtonFactory.js";
import { hide, show } from "../../../ui/auxiliars.js";
import ButtonBaseDto from "../../buttons/dto/ButtonsBaseDto.js";
import ModalBaseDto from "../dto/ModalBaseDto.js";

export default class ModalBaseUI {
  private wrapper: HTMLDivElement;
  private modal: HTMLDivElement;

  // ATRIBUTO CONFIGURATIVO DE EVENTOS DE BOTONES EN MODALES
  protected event?: {
    on?: (
      eventName: keyof HTMLElementEventMap,
      handler: EventListenerOrEventListenerObject
    ) => void;
    off?: (
      eventName: keyof HTMLElementEventMap,
      handler: EventListenerOrEventListenerObject
    ) => void;
  };

  constructor(private readonly options: ModalBaseDto) {
    this.wrapper = document.createElement("div");
    this.modal = document.createElement("div");
    this.buildModal();
  }

  // CONSTRUCCION DEL MODAL
  private buildModal(): void {
    // SI SE AGREGAN MAS CLASES AÑADIR AL BUILDER
    this.options.setClassContainerModal(this.options.parentModalClass,this.wrapper);
    // SI SE LE AÑADEN MAS CLASES AL MODAL AGREGAR
    this.options.setClassModal(this.options.modalClass, this.modal);
    this.wrapper.appendChild(this.modal); //==> AGREGAR AL WRAPPER EL MODAL
  }

  // AGREGAR TODOS LOS ELEMNTOS AL MODAL
  public appendContent(elements: HTMLElement[]): void {
    this.modal.append(...elements);
  }

  // APPEND DE ELEMENTO AL MODAL
  public appendElement(element: HTMLElement): void {
    this.modal.appendChild(element);
  }

  // AGREGAR AL DOM EL WRAPPER UN CONTENEDOR CREADO O AL BODY
  public addToDOM(): void {
    const parent: HTMLElement = this.options.containerModal ?? document.body;
    parent.appendChild(this.wrapper);
  }

  // REMOVER WRAPPER DEL DOM
  public removeFromDOM(): void {
    if (this.wrapper.parentNode) {
      this.wrapper.parentNode.removeChild(this.wrapper);
    }
  }

  // MOSTRAR
  public show(classRemoveWrapper = "modal-wrapper--hide", classRemoveModal = "modal--hide"): void {
    show({ $el: this.wrapper, cls: classRemoveWrapper });
    show({ $el: this.modal, cls: classRemoveModal });

    console.log(this.wrapper);
    console.log(classRemoveWrapper);
    console.log("************************************************");
    console.log(this.modal);
    console.log(classRemoveModal);
  }

  // OCULTAR
  public hide(classAddWrapper = "modal-wrapper--hide", classAddModal = "modal--hide"): void {
    hide({ $el: this.wrapper, cls: classAddWrapper });
    hide({ $el: this.modal, cls: classAddModal });
  }

  // DELAY PARA APARECER O ESCONDERSE
  public async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // METODO QUE CREA BOTONES EN MODAL
  public createButtons(): HTMLElement | null {
    if (
      !Array.isArray(this.options._btnsBaseDto) ||
      this.options._btnsBaseDto.length === 0
    )
      return null;

    const buttonsWrapper = document.createElement("div");
    buttonsWrapper.classList.add("modal__buttons");

    const fragment = document.createDocumentFragment();

    for (const btn of this.options._btnsBaseDto) {
      const configButton = new ButtonBaseDto({
        type: "button",
        btnText: btn._btnSpanText,
        disabled: btn._disabled,
        "aria-label": btn._ariaLabel,
        attrs: btn._attrs,
        classesBtn: btn._btnClass,
        iconBtnClasses: btn._iconClass,
      });

      const buttonInstance = ButtonFactory.createButton("custom", configButton);

      fragment.appendChild(buttonInstance.getBtnElement());
    }

    buttonsWrapper.appendChild(fragment);
    return buttonsWrapper;
  }

  // CREAR BOTONES EN MODAL CON EVENTO
  public createButtonsWithHandlers(
    btnConfigs: Array<{
      dto: ButtonBaseDto;
      eventName: keyof HTMLElementEventMap;
      handler: EventListenerOrEventListenerObject;
    }>
  ): HTMLElement {
    const buttonsWrapper = document.createElement("div");
    buttonsWrapper.classList.add("modal__buttons");

    for (const { dto, eventName, handler } of btnConfigs) {
      const buttonInstance = ButtonFactory.createButton("custom", dto);
      buttonInstance.on(eventName, handler);
      buttonsWrapper.appendChild(buttonInstance.getBtnElement());
    }

    return buttonsWrapper;
  }

  //-----GETTERS Y SETTERS ACCESOR---//

  // VER ELEMENTO DEL MODAL
  public get _modal(): HTMLDivElement {
    return this.modal;
  }
}
