// IMPORTACIONES
import { TTypeBtn } from "../../../types/types";
import { iBtn } from "../../../interfaces/interfaces";

// CLASE  DE OPCIONES PARA UN BOTON
// DTO (Data Transfer Object)
export default class ButtonBaseDto {
  private disabled: boolean;
  private ariaLabel?: string;
  private attrs?: Record<string, string | number | boolean>;
  private iconBtnClasses?: string;
  private classesBtn?: string;
  private btnText?: string;
  private type: TTypeBtn;
  private _customContentHtml?: string;
  private _customContentFragment?: HTMLElement | DocumentFragment;

  constructor(private readonly options: iBtn) {
    this.disabled = false;
    this.type = "button";
  }

  // --- SETTERS ---
  public setAttribute(attrs: Record<string, string | number | boolean>): void {
    this.attrs = attrs;
  }

  public setBtnSpanText(text: string): void {
    this.btnText = text;
  }

  public setDisabled(disabled: boolean): void {
    this.disabled = disabled;
  }

  public setIcon(iconClass: string): void {
    this.iconBtnClasses = iconClass;
  }

  public setClassBtn(classBtn: string): void {
    this.classesBtn = classBtn;
  }

  public setType(typeBtn: TTypeBtn): void {
    this.type = typeBtn;
  }

  public setAriaLabel(aria: string): void {
    this.ariaLabel = aria;
  }

  public setCustomContentHtml(html: string): void {
    this._customContentHtml = html;
  }

  public setCustomContentFragment(
    fragment: HTMLElement | DocumentFragment
  ): void {
    this._customContentFragment = fragment;
  }

  // --- GETTERS ---

  public get _ariaLabel(): string | undefined {
    return this.ariaLabel;
  }

  get customHtml(): string | undefined {
    return this._customContentHtml;
  }

  get customFragment(): HTMLElement | DocumentFragment | undefined {
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

  public get _renderOptions(): iBtn {
    return this.options;
  }
}
