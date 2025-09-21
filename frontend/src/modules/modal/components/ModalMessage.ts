// IMPORTACIONES
import ModalBaseDto from '../dto/ModalBaseDto.js';
import ModalBase from '../entities/ModalBase.js';
import ModalBaseUI from '../ui/ModalBaseUI.js';

// CLASE MODAL DE EXITO DE REGISTRO
export default class ModalMessage extends ModalBase {
  constructor(optionsModal: ModalBaseDto, modalBaseUI: ModalBaseUI) {
    super(optionsModal, modalBaseUI);
  }

  // IMPLEMENTACION DEL CONTENIDO BASE MODAL
  public composeBaseContent(): ModalBase {
    const elements: HTMLElement[] = [];

    const titleEl = document.createElement('h2'); // CREAR ELEMENTO
    titleEl.classList.add('modal__title'); //AÑADIR SUS CLASES
    this.options.setTextTitleElement(titleEl, this.options.title);
    elements.push(titleEl); // AGREGAR EL TITULO AL ARRAY DE ELEMENTOS HIJOS DEL MODAL

    // MENSAJE
    const messageEl = document.createElement('p'); //CREAR ETIQUETA PARRAFO
    messageEl.classList.add('modal__message'); // AÑADIRLE CLASE

    this.options.setTextMessageElement(messageEl, this.options.getMessage()); // AGREGAR EL NODO DE TEXTO DE MENSAJE

    elements.push(messageEl); // AGREGAR EL PARRAFO AL ARRAY DE ELEMENTOS HIJOS DEL MODAL

    const iconWrapper = document.createElement('div'); //CREAR
    iconWrapper.classList.add('modal__icon-wrapper'); //CONTENEDOR DE ICONO
    const icon = document.createElement('i');
    this.options.setClassIcon(this.options.iconClass, icon);

    iconWrapper.appendChild(icon);
    elements.push(iconWrapper); //AGREGAR ELEMENTO AL ARRAY

    // ULTIMO ELEMENTO HIJO SI TIENE BOTONES
    const buttonsEl = this.createButtons();
    if (buttonsEl) elements.push(buttonsEl); //EN ESTE PUNTO AGREGAR EL NUEVO ELEMENTO DE ARRAY DE ELEMENTOS

    // AGREGAR CONTENIDO DE ELEMENTOS AL MODAL
    for (const el of elements) {
      this.appendToModal(el);
    }

    return this;
  }

  public init(): this {
    this.composeBaseContent();
    return this;
  }
}
