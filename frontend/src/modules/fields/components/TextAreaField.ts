//IMPORTACIONES
import { iTextAreaFieldOptions } from "../../../interfaces/interfaces";
import FieldBaseDto from "../dto/FieldBaseDto.js";
import FieldBase from "../entities/FieldBase.js";
import TextAreaFieldUI from "../ui/TextAreaFieldUI.js";

// CLASE PARA CAMPOS
export default class TextAreaField extends FieldBase<string> {
  private cols: number;
  private rows: number;
  constructor(options: FieldBaseDto<string, iTextAreaFieldOptions>, private readonly textAreaFieldUI: TextAreaFieldUI) {
    super(options);
    this.cols = 0;
    this.rows = 0;
    this.attachEvents(); //  TAN PRONTO SE CREA => EL LISTENER YA ESTA ACTIVO
  }

  //REGISTRAR LISTENER EN ELEMENTO
  private attachEvents() {
    this.textAreaFieldUI._inputElement.addEventListener("input", () => this.triggerEvent("input"));
  }

  // VER VALOR DE INPUT
  public getValue(): string | null {
    return this.textAreaFieldUI._inputElement.value;
  }

  // AGREAGAR COLUMNAS
  public setCols(cols: number): void {
    this.cols = cols;
  }

  // AGREGAR FILAS
  public setRows(rows: number): void {
    this.rows = rows;
  }

  // SETEO EL VALOR Y LO ACTUALIZO EN EL DOM
  public setValue(value: string): void {
    this.options._setValue = value;
    this.textAreaFieldUI.setValue(); //=> NO ME IMPORTA COMO AÑADELO AL DOM
  }

  public setValueAndTrigger(value: string): void {
    this.setValue(value);
    this.triggerEvent("input");
  }

  // -------------------------PROPIEDADES DE ACCESO--------------------------//
  //VER CANTIDAD DE COLUMNAS TEXTAREA
  get _cols(): number {
    return this.cols;
  }

  //VER CANTIDAD DE FILAS TEXTAREA
  get _rows(): number {
    return this.rows;
  }

  // RENDER DEL ELEMENTO EN UI
  public render(): HTMLElement {
    return this.textAreaFieldUI._inputElement;
  }
}