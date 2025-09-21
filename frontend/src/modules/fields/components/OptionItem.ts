// CLASE DE COMPONENTE OPTIONS
export default class OptionItem {
  private element: HTMLOptionElement;

  constructor(
    private value: string = '',
    private text: string = '',
    private disabled: boolean = false,
    private selected: boolean = false,
  ) {
    this.element = document.createElement('option');
    this.render();
  }

  private render(): void {
    this.element.value = this.value;
    this.element.textContent = this.text;
    this.element.disabled = this.disabled;
    this.element.selected = this.selected;
  }

  public setSelected(selected: boolean): void {
    this.selected = selected;
    this.element.selected = selected;
  }

  public getSelected(): boolean {
    return this.element.selected;
  }

  public setDisabled(disabled: boolean): void {
    this.disabled = disabled;
    this.element.disabled = disabled;
  }

  public getDisabled(): boolean {
    return this.element.disabled;
  }

  public setText(text: string): void {
    this.text = text;
    this.element.textContent = text;
  }

  public getText(): string {
    return this.element.textContent ?? '';
  }

  public setValue(value: string): void {
    this.value = value;
    this.element.value = value;
  }

  public getValue(): string {
    return this.element.value;
  }

  public getElement(): HTMLOptionElement {
    return this.element;
  }
}
