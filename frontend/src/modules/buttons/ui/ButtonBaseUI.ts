// IMPORTACIONES
import { attrFilled } from "../../../utils/domUtils.js";
import ButtonBaseDto from "../dto/ButtonsBaseDto.js";
import { actionClassString } from "../../../ui/auxiliars.js";
// import { TTypeBtn } from "../../../types/types.js";

export default class ButtonBaseUI {
  protected readonly buttonElement: HTMLButtonElement;
  protected state: "IDLE" | "LOADING" | "DISABLED" = "IDLE";
  constructor(private readonly buttonBaseDto: ButtonBaseDto) {
    this.buttonElement = document.createElement("button");
  }

  public setType(): void {
    this.buttonElement.setAttribute("type", this.buttonBaseDto._type);
  }

  // METODO PARA APLICAR ATRIBUTOS AL BOTON
  public applyAttributes(): void {
    if (!this.buttonBaseDto) return;
    if (this.buttonBaseDto._attrs)
      attrFilled(this.buttonElement, this.buttonBaseDto._attrs);
  }

  // METODO PARA APLICAR CLASES AL BOTON
  public applyClassesBtn(): void {
    if (this.buttonBaseDto._btnClass)
      actionClassString(
        this.buttonBaseDto._btnClass,
        "add",
        this.buttonElement
      );
  }

  // METODO PARA APLICAR CLASES AL ICONO
  public applyClassesIcon(): void {
    if (this.buttonBaseDto._iconClass) {
      const prevIcon = this.buttonElement.querySelector("i");
      if (prevIcon) prevIcon.remove();
      const icon: HTMLElement = document.createElement("i");
      this.buttonBaseDto.setIcon(this.buttonBaseDto._iconClass);
      this.buttonElement.append(icon);
    }
  }

  // METODO PARA APLICAR EL TEXTO AL SPAN DEL BOTON
  public applyBtnText(): void {
    if (this.buttonBaseDto._btnSpanText) {
      const prevSpan = this.buttonElement.querySelector("span");
      if (prevSpan) prevSpan.remove();
      const span: HTMLElement = document.createElement("span");
      span.textContent = this.buttonBaseDto._btnSpanText;
      this.buttonElement.append(span);
    }
  }

  // AGREGAR ARIA LABEL
  public setAriaLabel(): void {
    if (this.buttonBaseDto._ariaLabel) {
      this.buttonElement.setAttribute(
        "aria-label",
        this.buttonBaseDto._ariaLabel
      );
    }
  }

  public disable(): void {
    this.state = "DISABLED";
    this.buttonBaseDto.setDisabled(true);
    this.buttonElement.setAttribute("disabled", "");
  }

  public setLoading(isLoading: boolean): void {
    this.state = isLoading ? "LOADING" : "IDLE";
    this.buttonElement.disabled = isLoading;
  }

  public enable(): void {
    this.state = "IDLE";
    this.buttonBaseDto.setDisabled(false);
    this.buttonElement.removeAttribute("disabled");
  }

  public getBtnElement(): HTMLButtonElement {
    return this.buttonElement;
  }

  public createOptions(): void {
    this.setType();
    if(this.buttonBaseDto._disabled){
        this.disable();
    }
    if (this.buttonBaseDto._renderOptions.attrs)
      this.buttonBaseDto.setAttribute(this.buttonBaseDto._renderOptions.attrs);
    if (this.buttonBaseDto._renderOptions["aria-label"]) this.setAriaLabel();
    if (this.buttonBaseDto._renderOptions.iconBtnClasses)
      this.buttonBaseDto.setIcon(this.buttonBaseDto._renderOptions.iconBtnClasses);
    if (this.buttonBaseDto._renderOptions.classesBtn)
      this.buttonBaseDto.setClassBtn(this.buttonBaseDto._renderOptions.classesBtn);
    if (this.buttonBaseDto._renderOptions.btnText)
      this.buttonBaseDto.setBtnSpanText(this.buttonBaseDto._renderOptions.btnText);
  }

  public buildButton(): void {
    this.applyClassesBtn();
    this.applyAttributes();
    this.setAriaLabel();
    this.buttonBaseDto.setType(this.buttonBaseDto._type);

    if (this.buttonBaseDto.customHtml) {
      // ==> SI SE LE AÑADE UN FRAGMENTO DE INNERHTML
      this.buttonBaseDto.setCustomContentHtml(this.buttonBaseDto.customHtml);
    } else if (this.buttonBaseDto.customFragment) {
      // ==> SI SE LE AÑADE UN FRAGMENTO CON DOM
      this.buttonBaseDto.setCustomContentFragment(
        this.buttonBaseDto.customFragment
      );
    } else {
      // ==> SINO SOLO TEXTO + ICONO
      this.applyClassesIcon();
      this.applyBtnText();
    }
  }

  // --- RENDER / FINALIZAR CONFIG ---
  public render(): ButtonBaseDto {
    this.createOptions(); //SETEAR LOS VALORES QUE SE PASAN EN CONFIGURACION
    return this.buttonBaseDto; // DEVOLVEMOS LA PROPIA INSTANCIA YA PREPARADA
  }
}