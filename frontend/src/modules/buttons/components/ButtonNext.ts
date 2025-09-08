// CLASE CONCRETA => BOTON SIGUIENTE
export class ButtonNext extends ButtonBase implements iBtnText, iBtnIcon {
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

  // ACTUALIZAR DATA DE BOTNO NEXT
  public updateAttributeDataStep({ formRegister }: { formRegister: FormRegister }): void {
    if (this.buttonElement.hasAttribute("data-step")) {
      this.buttonElement.dataset.step = String(formRegister.getStepForm()); //REASIGNAR VALOR DEL PASO
    }
  }
}
