// IMPORTACIONES
import { TTypeBtn } from "../../../types/types";
import { iAriaLabel, iBtn } from "../../../interfaces/interfaces";

// CLASE  DE OPCIONES PARA UN BOTON
// DTO (Data Transfer Object)
export default class ButtonBaseDto implements iAriaLabel{
  private disabled: boolean;
  private ariaLabel?: string;
  private attrs?: Record<string, string | number | boolean>;
  private iconBtnClasses?: string;
  private classesBtn?: string;
  private btnText?: string;
  private type: TTypeBtn;
  private _customContentHtml?: string;
  private _customContentFragment?: HTMLElement | DocumentFragment;
  private eventName: keyof HTMLElementEventMap;
  private handler: EventListenerOrEventListenerObject;
  private isLoading: boolean;

  /** 
   * CONSTRUCTOR QUE SE EJECUTA NI BIEN SE INSTANCIA,
   * LO CUAL HACE QUE LOS VALORES QUE SE LE PASEN LOS GARDARÁ EL DTO
  **/
  constructor(options: iBtn) {
    this.disabled = options.disabled ?? false;
    this.type = options.type ?? "button";
    this.iconBtnClasses = options.iconBtnClasses;
    this.classesBtn = options.classesBtn;
    this.btnText = options.btnText;
    this.attrs = options.attrs;
    this.ariaLabel = options["aria-label"];
    this.eventName = options.eventName || "click";
    this.handler = options.handler;
    this.isLoading = options.isLoading || false
  }

  // --- SETTERS ---//

  // MODIFICAR ATRIBUTO DE BOTON
  public setAttribute(attrs: Record<string, string | number | boolean>): void {
    this.attrs = attrs;
  }

  // MODIFICAR TEXTO EN SPAN HIJO DEL BOTON
  public setBtnSpanText(text: string): void {
    this.btnText = text;
  }

  // MODIFICAR EL DISABLED DEL BOTON
  public setDisabled(disabled: boolean): void {
    this.disabled = disabled;
  }

  // HABILITAR BOTON
   public enabledBtn():void{
    this.setDisabled(false);
  }
  // DESHABITAR BOTON
  public disabledBtn():void{
    this.setDisabled(true);
  }

  // MODIFICAR CLASES DE ICONOS
  public setIcon(iconClass: string): void {
    this.iconBtnClasses =iconClass;
  }

  // MODIFICAR CLASES DE BOTON
  public setClassBtn(classBtn: string): void {
    this.classesBtn = classBtn;
  }

  // MODIFICAR TIPO DE BOTON
  public setType(typeBtn: TTypeBtn): void {
    this.type = typeBtn;
  }

  // MODIFICAR ARIA LABEL
  public setAriaLabel(aria: string): void {
    this.ariaLabel = aria;
  }

  // AGREGAR AL BOTON UN INNERHTML
  public setCustomContentHtml(html: string): void {
    this._customContentHtml = html;
  }

  // AGREGAR AL BOTON UN FRAGMENTO DEL DOM
  public setCustomContentFragment(fragment: HTMLElement | DocumentFragment): void {
    this._customContentFragment = fragment;
  }

  // SETEAR EL EVENTO
  public setEventName(eventName:keyof HTMLElementEventMap):void{
    this.eventName = eventName;
  }

  public setHandler(handler:EventListenerOrEventListenerObject):void{
    this.handler = handler;
  }

  public setLoading(isLoading:boolean):void{
    this.isLoading = isLoading;
  }

  // --- GETTERS ACCESORES ---

  public get _ariaLabel(): string | undefined {
    return this.ariaLabel;
  }

  public get _customHtml(): string | undefined {
    return this._customContentHtml;
  }

  public get _customFragment(): HTMLElement | DocumentFragment | undefined {
    return this._customContentFragment;
  }

  public get _btnSpanText(): string | undefined {
    return this.btnText;
  }

  public get _iconClass(): string | undefined {
    return this.iconBtnClasses;
  }

  public get _btnClass(): string | undefined {
    return this.classesBtn;
  }

  public get _type(): TTypeBtn {
    return this.type;
  }

  public get _disabled(): boolean {
    return this.disabled;
  }

  public get _attrs(): Record<string, string | number | boolean> {
    return this.attrs ?? {};
  }

  public get _eventName(): keyof HTMLElementEventMap{
    return this.eventName;
  }

  public get _handler(): EventListenerOrEventListenerObject{
    return this.handler;
  }

  public get _isLoading():boolean{
    return this.isLoading;
  }
}