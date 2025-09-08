// IMPORTACIONES
import { TTypeBtn } from "../../types/types";
import ButtonsOptions from "../dto/ButtonBaseOptions.js";
import { actionClassString } from "../../ui/auxiliars.js";
import { attrFilled } from "../../utils/domUtils.js";

/*
  SE APLICAN:
  *INYECCION DE DEPENDENCIAS(buttonOptionsBase SE PASA DESDE FUERA, NO SE CREA DENTRO).
  *INMUTABILIDAD (readonly).
  *PATRON PLANTILLA (METODO ABSTRACTO PARA QUE LA SUBCLASE COMPLETE).
  *SEPARACIÓN DE RESPONSABILIDADES(CADA METODO HACE ALGO ESPECIFICO).
  *VALORES SEGUROS POR DEFECTO CON "nullish coalescing" (USO DE ?? '').
*/

// CLASE ABSTRACTA PARA BOTONES, GESTIONA ESTADO Y COMPORTAMIENTO BASE
export default abstract class ButtonBase {
  protected readonly buttonElement: HTMLButtonElement;
  protected state: "IDLE" | "LOADING" | "DISABLED" = "IDLE";

  constructor(protected readonly buttonOptionsBase: ButtonsOptions) {
    this.buttonElement = document.createElement("button");
    this.buttonOptionsBase.render(); // OPCIONES AL INICIO
  }

  // METODO PARA APLICAR ATRIBUTOS AL BOTON
  public applyAttributes(): void {
    if (!this.buttonOptionsBase) return;
    if (this.buttonOptionsBase._attrs) attrFilled(this.buttonElement, this.buttonOptionsBase._attrs);
  }

  // METODO PARA APLICAR CLASES AL BOTON
  public applyClassesBtn(): void {
    if (this.buttonOptionsBase._btnClass) actionClassString(this.buttonOptionsBase._btnClass, "add", this.buttonElement);
  }

  // METODO PARA APLICAR CLASES AL ICONO
  public applyClassesIcon(): void {
    if (this.buttonOptionsBase._iconClass) {
      const icon: HTMLElement = document.createElement("i");
      actionClassString(this.buttonOptionsBase._iconClass, "add", icon);
      this.buttonElement.append(icon);
    }
  }

  // METODO PARA APLICAR EL TEXTO AL SPAN DEL BOTON
  public applyBtnText(): void {
    if (this.buttonOptionsBase._btnSpanText) {
      const span: HTMLElement = document.createElement("span");
      span.textContent = this.buttonOptionsBase._btnSpanText;
      this.buttonElement.append(span);
    }
  }

  // AGREGAR ARIA LABEL
  protected setAriaLabel():void{
    if(this.buttonOptionsBase._ariaLabel){
      this.buttonElement.setAttribute("aria-label", this.buttonOptionsBase._ariaLabel);
    }
  }

  protected setType(type: TTypeBtn): void {
    this.buttonElement.type = type;
  }

  public enable(): void {
    this.state = "IDLE";
    this.buttonElement.disabled = false;
  }

  public disable(): void {
    this.state = "DISABLED";
    this.buttonOptionsBase.setDisabled(true);
    this.buttonElement.setAttribute("disabled", "");
  }

  public setLoading(isLoading: boolean): void {
    this.state = isLoading ? "LOADING" : "IDLE";
    this.buttonElement.disabled = isLoading;
  }

  public on(eventName: keyof HTMLElementEventMap, handler: EventListenerOrEventListenerObject): void {
    this.buttonElement.addEventListener(eventName, handler);
  }

  public off(eventName: keyof HTMLElementEventMap, handler: EventListenerOrEventListenerObject): void {
    this.buttonElement.removeEventListener(eventName, handler);
  }

  public buildButton(): void {
    this.applyClassesBtn();
    this.applyClassesIcon();
    this.applyBtnText();
    this.applyAttributes();
    this.setAriaLabel();
    this.setType(this.buttonOptionsBase._type);

    if (this.buttonOptionsBase._disabled) {
      this.disable();
    }
  }

  protected abstract render(): HTMLButtonElement;

  public getElement(): HTMLButtonElement {
    return this.buttonElement;
  }

  public init(): this {
    this.buildButton();
    return this;
  }
}