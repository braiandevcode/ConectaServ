// CLASE CONCRETA => BOTON SIGUIENTE
export class ButtonPrev extends ButtonBase implements iBtnText, iBtnIcon {
  constructor(buttonOptionsBase: ButtonsOptions) {
    super(buttonOptionsBase);
  }

  protected render(): HTMLButtonElement {
    // SI SE NECESITA ALTERAR EL LAYOUT PODRIA HACERLO EN ESTA PARTE => OK
    return this.buttonElement;
  }

  public setText(text: string): void {
    const prevSpan = this.buttonElement.querySelector("span");
    if (prevSpan) prevSpan.remove();
    this.buttonOptionsBase.setBtnSpanText(text);
    this.applyBtnText();
  }

  public setIcon(iconClass: string): void {
    const prevIcon = this.buttonElement.querySelector("i");
    //REEMPLAZAR CONTENIDO SIN REIMPLEMENTAR => applyClassesIcon
    if (prevIcon) prevIcon.remove();
    this.buttonOptionsBase.setIcon(iconClass);
    this.applyClassesIcon();
  }
}