//IMPORTACIONES
import { iInput } from "../../../interfaces/interfaces";
import TextAreaFieldDto from "../dto/TextAreaFieldDto.js";
import FieldBase from "../entities/FieldBase.js";
import TextAreaFieldUI from "../ui/TextAreaFieldUI.js";

// CLASE PARA CAMPOS
export default class TextAreaField extends FieldBase<string> implements iInput<string> {
  constructor(private fieldTextAreaDto: TextAreaFieldDto, private readonly textAreaFieldUI: TextAreaFieldUI) {
    super(fieldTextAreaDto);
    this.attachEvents(); //  TAN PRONTO SE CREA => EL LISTENER YA ESTA ACTIVO
  }

  //REGISTRAR LISTENER EN ELEMENTO
  private attachEvents() {
    this.textAreaFieldUI._inputElement.addEventListener("input", () => this.triggerEvent("input"));
  }

  // VER VALOR DE INPUT
  public getValue(): string {
    return this.fieldTextAreaDto._value as string;
  }

  // METODO QUE MODIFICA NUEVO VALUE
  public setValue(value: string): void {
    this.textAreaFieldUI.setValue(value);
  }

  // MODIFICAR NUEVO VALOR Y AUTO EJECUTAR EVENTO
  public setValueAndTrigger(value: string): void {
    this.setValue(value);
    this.triggerEvent("input");
  }

  // RENDER DEL ELEMENTO EN UI
  public render(): HTMLElement {
    return this.textAreaFieldUI._inputElement;
  }
}