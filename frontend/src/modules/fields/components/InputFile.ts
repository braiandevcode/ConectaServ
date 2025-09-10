// IMPORTACIONES
import { iInputFileOptions } from "../../../interfaces/interfaces";
import FieldBaseDto from "../dto/FieldBaseDto.js";
import FieldBase from "../entities/FieldBase.js";
import InputFileUI from "../ui/InputFileUI.js";

export default class InputFile extends FieldBase<FileList> {
  constructor(options: FieldBaseDto<FileList, iInputFileOptions>, private inputFileUI:InputFileUI) {
    super(options);
    this.attachEvents();
  }

  //REGISTRAR LISTENER EN ELEMENTO
  private attachEvents() {
    this.inputFileUI._inputFileElement.addEventListener("change", () => this.triggerEvent("change"));
  }

  public getValue(): FileList | null {
    return this.inputFileUI._inputFileElement.files;
  }

  public setValue(): void {
    this.inputFileUI.setEmptyValue();
  }

  public setValueAndTrigger(files: FileList | null): void {
    // this.inputFileUI.setFiles(files);  // SETEA EL INPUT
    this.triggerEvent("change"); // DISPARA EL EVENTO CON EL NUEVO VALOR
}

  public render(): HTMLElement {
    return this.inputFileUI._inputFileElement;
  }
}