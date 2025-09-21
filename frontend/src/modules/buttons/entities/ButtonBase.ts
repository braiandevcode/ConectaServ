// IMPORTACIONES
import { TTypeBtn } from '../../../types/types.js';
import ButtonBaseDto from '../dto/ButtonsBaseDto.js';

/*
  SE APLICAN:
  *INYECCION DE DEPENDENCIAS(buttonBaseDto SE PASA DESDE FUERA, NO SE CREA DENTRO).
  *INMUTABILIDAD (readonly).
  *PATRON PLANTILLA (METODO ABSTRACTO PARA QUE LA SUBCLASE COMPLETE).
  *SEPARACIÓN DE RESPONSABILIDADES(CADA METODO HACE ALGO ESPECIFICO).
  *VALORES SEGUROS POR DEFECTO CON "nullish coalescing" (USO DE ?? '').
*/

// CLASE ABSTRACTA PARA BOTONES, GESTIONA ESTADO Y COMPORTAMIENTO BASE
export default abstract class ButtonBase {
  constructor(private readonly buttonBaseDto: ButtonBaseDto) {}

  // MODIFICAR ATRIBUTOS
  public setAttribute(attrs: Record<string, string | number | boolean>): void {
    this.buttonBaseDto.setAttribute(attrs);
  }

  // MODIFICAR/AGREGAR ARIA LABEL
  public setAriaLabel(aria: string): void {
    this.buttonBaseDto.setAriaLabel(aria);
  }

  // DESHABILITAR BOTON
  public disabledBtn(): void {
    this.buttonBaseDto.disabledBtn();
  }

  //  HABILITAR BOTON
  public enabledBtn(): void {
    this.buttonBaseDto.enabledBtn();
  }
  // MODIFICAR AGREGAR TEXTO A SPAN DEL BOTON
  public setBtnSpanText(text: string): void {
    this.buttonBaseDto.setBtnSpanText(text);
  }

  // MODIFICAR AGREGAR CLASE AL BOTON
  public setClassBtn(classBtn: string): void {
    this.buttonBaseDto.setClassBtn(classBtn);
  }

  // MODIFICAR FRAGMENTO HIJO DEL BOTON
  public setCustomContentFragment(fragment: HTMLElement | DocumentFragment): void {
    this.buttonBaseDto.setCustomContentFragment(fragment);
  }

  // MODIFICAR INNERHTML HIJO DEL BOTON
  public setCustomContentHtml(html: string): void {
    this.buttonBaseDto.setCustomContentHtml(html);
  }

  // MODIFICAR VALOR DEL DISABLED
  public setDisabled(disabled: boolean): void {
    this.buttonBaseDto.setDisabled(disabled);
  }

  // MODIFICAR CLASES DE ICONO
  public setIcon(iconClass: string): void {
    this.buttonBaseDto.setIcon(iconClass);
  }

  // MODIFICAR EL TIPO DE BOTON
  public setType(type: TTypeBtn): void {
    this.buttonBaseDto.setType(type);
  }

  public setEventName(eventName: keyof HTMLElementEventMap): void {
    this.buttonBaseDto.setEventName(eventName); // SETEAR EL EVENTO
  }

  public setHandler(handler: EventListenerOrEventListenerObject): void {
    this.buttonBaseDto.setHandler(handler);
  }

  public setLoading(isLoading: boolean): void {
    this.buttonBaseDto.setLoading(isLoading);
  }

  // --- GETTERS ACCESORES ---

  public get _ariaLabel(): string | undefined {
    return this.buttonBaseDto._ariaLabel;
  }

  public get _customHtml(): string | undefined {
    return this.buttonBaseDto._customHtml;
  }

  public get _customFragment(): HTMLElement | DocumentFragment | undefined {
    return this.buttonBaseDto._customFragment;
  }

  public get _btnSpanText(): string | undefined {
    return this.buttonBaseDto._btnSpanText;
  }

  public get _iconClass(): string | undefined {
    return this.buttonBaseDto._iconClass;
  }

  public get _btnClass(): string | undefined {
    return this.buttonBaseDto._btnClass;
  }

  public get _type(): TTypeBtn {
    return this.buttonBaseDto._type;
  }

  public get _disabled(): boolean {
    return this.buttonBaseDto._disabled;
  }

  public get _attrs(): Record<string, string | number | boolean> {
    return this.buttonBaseDto._attrs ?? {};
  }

  public get _eventName(): keyof HTMLElementEventMap {
    return this.buttonBaseDto._eventName;
  }

  public get _handler(): EventListenerOrEventListenerObject {
    return this.buttonBaseDto._handler;
  }

  public get _isLoading(): boolean {
    return this.buttonBaseDto._isLoading;
  }

  // SUCRIBIR EVENTO AL BOTON
  public on(btn: HTMLButtonElement, eventName: keyof HTMLElementEventMap, handler: EventListenerOrEventListenerObject): void {
    this.setEventName(eventName);
    this.setHandler(handler);
    btn.addEventListener(eventName, handler);
  }

  // REMOVER EVENTO AL BOTON
  public off(btn: HTMLButtonElement): void {
    btn.removeEventListener(this.buttonBaseDto._eventName, this.buttonBaseDto._handler);
  }

  protected abstract subscribe(btn: HTMLButtonElement): void;
}
