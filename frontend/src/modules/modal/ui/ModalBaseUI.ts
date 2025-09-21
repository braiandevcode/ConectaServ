import ButtonBaseUI from '../../../modules/buttons/ui/ButtonBaseUI.js';
import {ButtonFactory} from '../../../patterns/factory/ButtonFactory.js';
import {actionClassString} from '../../../ui/auxiliars.js';
import ButtonBaseDto from '../../buttons/dto/ButtonsBaseDto.js';
import ModalBaseDto from '../dto/ModalBaseDto.js';

export default class ModalBaseUI {
  public wrapper: HTMLDivElement;
  public modal: HTMLDivElement;

  constructor(private readonly modalBaseDto: ModalBaseDto) {
    this.wrapper = document.createElement('div');
    this.modal = document.createElement('div');
    this.buildModal();
  }

  // CONSTRUCCION DEL MODAL
  private buildModal(): void {
    // SI SE AGREGAN MAS CLASES AÑADIR AL BUILDER
    this.modalBaseDto.setClassContainerModal(this.modalBaseDto.parentModalClass, this.wrapper);
    // SI SE LE AÑADEN MAS CLASES AL MODAL AGREGAR
    this.modalBaseDto.setClassModal(this.modalBaseDto.modalClass, this.modal);
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
    const parent: HTMLElement = this.modalBaseDto.containerModal ?? document.body;
    parent.appendChild(this.wrapper);
  }

  // REMOVER WRAPPER DEL DOM
  public removeFromDOM(): void {
    if (this.wrapper.parentNode) {
      this.wrapper.parentNode.removeChild(this.wrapper);
    }
  }

  // MOSTRAR
  public show(classRemoveWrapper = 'modal-wrapper--hide', classRemoveModal = 'modal--hide'): void {
    actionClassString(classRemoveWrapper, 'remove', this.wrapper);
    actionClassString(classRemoveModal, 'remove', this.modal);
  }

  // OCULTAR
  public hide(classAddWrapper = 'modal-wrapper--hide', classAddModal = 'modal--hide'): void {
    actionClassString(classAddWrapper, 'add', this.wrapper);
    actionClassString(classAddModal, 'add', this.modal);
  }

  // DELAY PARA APARECER O ESCONDERSE
  public async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // METODO QUE CREA BOTONES EN MODAL
  public createButtons(): HTMLElement | null {
    if (!Array.isArray(this.modalBaseDto._btnsBaseDto) || this.modalBaseDto._btnsBaseDto.length === 0) return null;

    const buttonsWrapper = document.createElement('div');
    buttonsWrapper.classList.add('modal__buttons');

    const fragment = document.createDocumentFragment();

    for (const btn of this.modalBaseDto._btnsBaseDto) {
      const configButton: ButtonBaseDto = new ButtonBaseDto({
        type: 'button',
        btnText: btn._btnSpanText,
        disabled: btn._disabled,
        'aria-label': btn._ariaLabel,
        attrs: btn._attrs,
        classesBtn: btn._btnClass,
        iconBtnClasses: btn._iconClass,
        eventName: btn._eventName,
        handler: btn._handler,
        isLoading: btn._isLoading,
      });

      const buttonInstance: ButtonBaseUI = ButtonFactory.createButton('custom', configButton);

      fragment.appendChild(buttonInstance.getBtnElement());
    }

    buttonsWrapper.appendChild(fragment);
    return buttonsWrapper;
  }

  //-----GETTERS Y SETTERS ACCESOR---//

  // VER ELEMENTO DEL MODAL
  public get _modal(): HTMLDivElement {
    return this.modal;
  }
}
