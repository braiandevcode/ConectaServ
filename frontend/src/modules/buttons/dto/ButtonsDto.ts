// IMPORTACIONES
import { TTypeBtn } from "../../../types/types";
import { iBtn } from "../../../interfaces/interfaces";

export default class ButtonsOptions {
  constructor(private readonly options: iBtn) {}

  // METODOS GETTERS Y SETTERS
  public setAttribute(attrs: Record<string, string | number | boolean>): void {
    this.options.attrs = attrs;
  }

  // CAMBIA EL TEXTO VISIBLE DEL BOTON (IDEALMENTE SOBRE EL <SPAN>)
  public setBtnSpanText(text: string): void {
    this.options.btnText = text;
  }

  // HABILITA EL BOTON (QUITANDO ATRIBUTO DISABLED)
  public setDisabled(disabled: boolean): void {
    this.options.disabled = disabled;
  }

  // CAMBIA EL ICONO DEL BOTON (SEGUN IMPLEMENTACION)
  public setIcon(iconClass: string): void {
    this.options.iconBtnClasses = iconClass;
  }

  //AGREGAR STRING DE CLASE
  public setClassBtn(classBtn: string): void {
    this.options.classesBtn = classBtn;
  }

  public setClassContainerBtn(classContainerBtn: string): void {
    this.options.classContainerBtn = classContainerBtn;
  }

  // AGREGAR TIPO
  public setType(typeBtn: TTypeBtn): void {
    this.options.type = typeBtn;
  }

  // VER PROPIEDAD DE TEXTO DEL BOTON
  public get _btnSpanText(): string | undefined {
    return this.options.btnText;
  }

  public get _iconClass(): string | undefined {
    return this.options.iconBtnClasses;
  }

  public get _btnClass(): string | undefined {
    return this.options.classesBtn;
  }

  public get _containerBtnClass(): string | undefined {
    return this.options.classContainerBtn;
  }

  public get _type(): TTypeBtn {
    return this.options.type;
  }

  public get _disabled(): boolean {
    return this.options.disabled;
  }

  public get _attrs(): Record<string, string | number | boolean> {
    return this.options.attrs ?? {};
  }
}