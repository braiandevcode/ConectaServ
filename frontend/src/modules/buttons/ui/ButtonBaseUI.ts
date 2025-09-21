// IMPORTACIONES
import { attrFilled } from '../../../utils/domUtils.js';
import { actionClassString } from '../../../ui/auxiliars.js';
import { TCustomAttributes, TTypeBtn } from '../../../types/types.js';
import ButtonBase from '../entities/ButtonBase.js';

export default class ButtonBaseUI {
  protected readonly buttonElement: HTMLButtonElement;
  constructor(private readonly buttonBase: ButtonBase) {
    this.buttonElement = document.createElement('button');
  }

  // AGREGAR TIPO AL BOTON
  public setType(typeBtn: TTypeBtn): void {
    this.buttonBase.setType(typeBtn); // ==> SETEAR EN DTO FUENTE DE LA VERDAD
    this.buttonElement.setAttribute('type', typeBtn); //==> LEER ESE NUEVO VALOR
  }

  // AGREGAR ARIA LABEL
  protected setAriaLabel(aria: string): void {
    this.buttonBase.setAriaLabel(aria); // ==> SETEAR EN DTO FUENTE DE LA VERDAD
    this.buttonElement.setAttribute('aria-label', aria); //==> LEER Y ASIGNAR AL ELEMENTO UI ESE NUEVO VALOR
  }

  // HABILITAR EL BOTON
  public enable(): void {
    this.buttonBase.enabledBtn(); // ==> SETEAR EN DTO FUENTE DE LA VERDAD
    this.buttonElement.removeAttribute('disabled'); //==> LEER Y ASIGNAR AL ELEMENTO UI ESE NUEVO VALOR
  }

  // DESHABIITAR BOTON
  public disable(): void {
    this.buttonBase.disabledBtn(); // ==> SETEAR EN DTO FUENTE DE LA VERDAD
    this.buttonElement.setAttribute('disabled', ''); //==> LEER Y ASIGNAR AL ELEMENTO UI ESE NUEVO VALOR
  }

  // MODIFICAR ISLOADING
  public setLoading(isLoading: boolean): void {
    this.buttonBase.setLoading(isLoading); // ==> SETEAR EN DTO FUENTE DE LA VERDAD
    this.buttonBase._isLoading ? this.disable() : this.enable(); // TERNARIO ==> SI ES TRUE EN DISABLED SINO HABILITAR
  }

  // METODO PARA APLICAR ATRIBUTOS AL BOTON
  public setAttribute(attrs: TCustomAttributes): void {
    this.buttonBase.setAttribute(attrs); // ==> SETEAR EL DTO FUENTE DE VERDAD
    attrFilled(this.buttonElement, attrs); // ==> CONFIAMOS EN DATO NUEVO Y ASIGNAMOS AL DOM
  }

  // METODO PARA APLICAR CLASES AL BOTON
  public setClassBtn(classBtn: string): void {
    this.buttonBase.setClassBtn(classBtn); // ==> SETEAR EN DTO FUENTE DE LA VERDAD
    actionClassString(classBtn, 'add', this.buttonElement); //==> LEER Y ASIGNAR AL ELEMENTO UI ESE NUEVO VALOR
  }

  // METODO PARA APLICAR CLASES AL ICONO
  public setIcon(iconClass: string): void {
    const prevIcon = this.buttonElement.querySelector('i');
    if (prevIcon) prevIcon.remove();
    const icon: HTMLElement = document.createElement('i');
    this.buttonBase.setIcon(iconClass);
    actionClassString(iconClass, 'add', icon);
    this.buttonElement.append(icon);
  }

  // METODO PARA APLICAR EL TEXTO AL SPAN EN BOTONES COMUNES
  public setBtnText(btnSpanText: string): void {
    this.buttonBase.setBtnSpanText(btnSpanText);
    const prevSpan = this.buttonElement.querySelector('span');
    if (prevSpan) prevSpan.remove();
    const span: HTMLElement = document.createElement('span');
    span.textContent = btnSpanText;
    this.buttonElement.append(span);
  }

  // RENDERIZAR DATOS DEL DTO A LOS ELEMENTOS DE LA UI
  public renderConfigBtn(): void {
    this.setType(this.buttonBase._type);
    if (this.buttonBase._disabled) this.disable();
    if (Object.keys(this.buttonBase._attrs).length > 0) this.setAttribute(this.buttonBase._attrs);
    if (this.buttonBase._ariaLabel) this.setAriaLabel(this.buttonBase._ariaLabel);
    if (this.buttonBase._btnClass) this.setClassBtn(this.buttonBase._btnClass);
  }

  public setCustomContentHtml(innerHtml: string): void {
    this.buttonBase.setCustomContentHtml(innerHtml); // => SETEAR EL DTO
    this.buttonElement.innerHTML = innerHtml; // ==> ASIGNAR A ELEMENTO
  }

  public setCustomContentFragment(fragment: HTMLElement | DocumentFragment): void {
    this.buttonBase.setCustomContentFragment(fragment); // => SETEAR EL DTO
    this.buttonElement.appendChild(fragment); // ==> ASIGNAR A ELEMENTO
  }

  // CONSTRUIR BOTON
  private buildButton(): void {
    // ==> SI SE LE AÑADE UN FRAGMENTO DE INNERHTML
    if (this.buttonBase._customHtml) {
      this.setCustomContentHtml(this.buttonBase._customHtml); // => SETEAR EL DTO
    } else if (this.buttonBase._customFragment) {
      // ==> SI SE LE AÑADE UN FRAGMENTO CON DOM
      this.setCustomContentFragment(this.buttonBase._customFragment);
    } else {
      // ==> SINO SOLO TEXTO + ICONO
      if (this.buttonBase._btnSpanText) {
        this.setBtnText(this.buttonBase._btnSpanText);
      }

      if (this.buttonBase._iconClass) {
        this.setIcon(this.buttonBase._iconClass);
      }
    }
  }

  // METODO PARA MOSTRAR ELEMENTO ACTUAL
  public getBtnElement(): HTMLButtonElement {
    return this.buttonElement;
  }

  public on(): void {
    this.buttonBase.on(this.buttonElement, this.buttonBase._eventName, this.buttonBase._handler);
  }

  public off() {
    this.buttonBase.off(this.buttonElement);
  }

  // --- RENDER / FINALIZAR CONFIG ---
  public render(): this {
    this.renderConfigBtn(); //RENDERIZAR LOS VALORES QUE SE PASAN EN CONFIGURACION
    this.buildButton();
    return this; // DEVOLVEMOS LA PROPIA INSTANCIA YA PREPARADA
  }
}
