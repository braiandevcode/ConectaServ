// IMPORTACIONES
import { iInputFileOptions } from "../../../interfaces/interfaces.js";
import FieldBaseDto from "../dto/FieldBaseDto.js";

export default class InputFileUI {
  private inputFile: HTMLInputElement;
  private files: FileList | null = null; // GUARDAR ARCHIVOS INTERNAMENTE

  constructor(private readonly options: FieldBaseDto<FileList, iInputFileOptions>) {
    this.inputFile = document.createElement("input");
    this.buildInputFile();
  }

  public buildInputFile() {
    // ESTABLECER TIPO DE INPUT
    this.inputFile.setAttribute("type", this.options._options.type);

    // APLICAR ATRIBUTOS SOLO SI SON TRUE O TIENEN VALOR
    if (this.options._options.accept) this.inputFile.setAttribute("accept", this.options._options.accept); // ACEPTAR TIPOS DE ARCHIVO
    if (this.options._options.multiple) this.inputFile.setAttribute("multiple", ""); // PERMITIR MULTIPLE SELECCIÓN
    if (this.options._currentDisabled) this.inputFile.setAttribute("disabled", ""); // DESHABILITAR INPUT
    if (this.options._isRequired) this.inputFile.setAttribute("required", ""); // REQUERIR SELECCIÓN
    if (this.options._name) this.inputFile.setAttribute("name", this.options._name);
  }

  // SETEAR ARCHIVOS EN EL INPUT SIN TOCAR PREVIEW NI LOCALSTORAGE
  public setFiles(files: FileList | null): void {
    // GUARDAR REFERENCIA
    this.files = files;

    if (this.inputFile) {
      this.setEmptyValue(); // RESETEAR INPUT ANTES
      if (files) {
        const dataTransfer = new DataTransfer();
        Array.from(files).forEach((f) => dataTransfer.items.add(f)); // AGREGAR CADA FILE
        this.inputFile.files = dataTransfer.files; // ASIGNAR FILES AL INPUT
      }
    }
  }

  // OBTENER FILES INTERNAMENTE
  public getFiles(): FileList | null {
    return this.files;
  }

  // VACIAR VALUE POR DEFECTO EN FILE
  public setEmptyValue(): void {
    this.inputFile.value = ""; //SETEAR A VACIO
  }

  // OBTENER ELEMENTO
  public get _inputFileElement(): HTMLInputElement {
    return this.inputFile;
  }
}
