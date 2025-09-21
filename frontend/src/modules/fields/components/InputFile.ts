// IMPORTACIONES
import {iChange} from '../../../interfaces/interfaces';
import InputFileDto from '../dto/InputFileDto';
import FieldBase from '../entities/FieldBase.js';
import InputFileUI from '../ui/InputFileUI.js';

export default class InputFile extends FieldBase<FileList> implements iChange<FileList> {
  constructor(
    options: InputFileDto,
    private inputFileUI: InputFileUI,
  ) {
    super(options);
    this.attachEvents();
  }

  //REGISTRAR LISTENER EN ELEMENTO
  private attachEvents() {
    this.inputFileUI._inputFileElement.addEventListener('change', () => this.triggerEvent('change'));
  }

  public getValue(): FileList | null {
    return this.inputFileUI._inputFileElement.files;
  }

  public setValue(): void {
    this.inputFileUI.setEmptyValue();
  }

  public setValueAndTrigger(files: FileList | null): void {
    // this.inputFileUI.setFiles(files);  // SETEA EL INPUT
    this.triggerEvent('change'); // DISPARA EL EVENTO CON EL NUEVO VALOR
  }

  public render(): HTMLElement {
    return this.inputFileUI._inputFileElement;
  }
}
