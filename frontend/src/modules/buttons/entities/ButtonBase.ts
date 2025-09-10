// IMPORTACIONES
import { TTypeBtn } from "../../../types/types.js";
import { actionClassString } from "../../../ui/auxiliars.js";
import { attrFilled } from "../../../utils/domUtils.js";
import ButtonBaseDto from "../dto/ButtonsBaseDto.js";
import ButtonBaseUI from "../ui/ButtonBaseUI.js";

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
  private buttonElement: HTMLButtonElement;
  constructor(private readonly buttonBaseUI: ButtonBaseUI) {
    this.buttonElement = this.getBtnElement(); // OPCIONES AL INICIO
    this.buttonBaseUI.render();
  }

  // METODO PARA APLICAR ATRIBUTOS AL BOTON
  public applyAttributes(): void {
    this.buttonBaseUI.applyAttributes();
  }

  // METODO PARA APLICAR CLASES AL BOTON
  public applyClassesBtn(): void {
    this.buttonBaseUI.applyClassesBtn();
  }

  // METODO PARA APLICAR CLASES AL ICONO
  public applyClassesIcon(): void {
    this.buttonBaseUI.applyClassesIcon();
  }

  // METODO PARA APLICAR EL TEXTO AL SPAN DEL BOTON
  public applyBtnText(): void {
    this.buttonBaseUI.applyBtnText();
  }

  // AGREGAR ARIA LABEL
  protected setAriaLabel(): void {
    this.buttonBaseUI.setAriaLabel();
  }

  protected setType(): void {
    this.buttonBaseUI.setType();
  }
  
  // HABILITAR EL BOTON
  public enable(): void {
    this.buttonBaseUI.enable();
  }

  // DESHABIITAR BOTON
  public disable(): void {
    this.buttonBaseUI.disable();
  }

  // MODIFICAR ISLOADING
  public setLoading(isLoading: boolean): void {
    this.buttonBaseUI.setLoading(isLoading);
  }

  // SUCRIBIR EVENTO AL BOTON
  public on(
    eventName: keyof HTMLElementEventMap,
    handler: EventListenerOrEventListenerObject
  ): void {
    this.buttonElement.addEventListener(eventName, handler);
  }

  // REMOVER EVENTO AL BOTON
  public off(
    eventName: keyof HTMLElementEventMap,
    handler: EventListenerOrEventListenerObject
  ): void {
    this.buttonElement.removeEventListener(eventName, handler);
  }

  // INYECTAR CODIGO HTML AL BOTON
  public setInnerHTML(html: string): void {
    this.buttonElement.innerHTML = html;
  }

  //METODO QUE PERMITE AGREGAR UN NODO DOM O FRAGMENTO AL BOTON
  public appendContent(content: HTMLElement | DocumentFragment): void {
    this.buttonElement.appendChild(content);
  }

  public getBtnElement(): HTMLButtonElement {
    return this.buttonBaseUI.getBtnElement(); // OPCIONES AL INICIO
  }

  public init(): this {
    this.buttonBaseUI.buildButton();
    return this;
  }
}
