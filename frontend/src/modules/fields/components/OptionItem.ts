// CLASE DE COMPONENTE OPTIONS
export default class OptionItem {
  public element: HTMLOptionElement;

  constructor(value: string, text: string, disabled = false, selected = false) {
    this.element = document.createElement("option");
    this.element.value = value;
    this.element.textContent = text;
    if (disabled) this.element.disabled = true;
    if (selected) this.element.selected = true;
  }

  public getElement(): HTMLOptionElement {
    return this.element;
  }
}