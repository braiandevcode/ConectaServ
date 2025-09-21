// IMPORTACIONES
import { TFieldType } from "../../../types/types.js";
import { iFile, iInputType, iName, isRequired } from "../../../interfaces/interfaces.js";
import InputFileDto from "../dto/InputFileDto.js";


export default class InputFileUI implements iName, iInputType, iFile, isRequired {
  private inputFile: HTMLInputElement;

  constructor(private readonly fieldFileInputDto: InputFileDto) {
    this.inputFile = document.createElement("input");
    this.buildInputFile();
  }

  public buildInputFile() {
    // ESTABLECER TIPO DE INPUT
   this.setType(this.fieldFileInputDto._type);

    // APLICAR ATRIBUTOS SOLO SI SON TRUE O TIENEN VALOR
    if (this.fieldFileInputDto._accept) this.fieldFileInputDto.setAccept(this.fieldFileInputDto._accept) // ACEPTAR TIPOS DE ARCHIVO
    if (this.fieldFileInputDto._multiple) this.fieldFileInputDto.setMultiple(this.fieldFileInputDto._multiple)
    if (this.fieldFileInputDto._currentDisabled) this.inputFile.setAttribute("disabled", ""); // DESHABILITAR INPUT
    if (this.fieldFileInputDto._isRequired) this.inputFile.setAttribute("required", ""); // REQUERIR SELECCIÓN
    if (this.fieldFileInputDto._name) this.setName(this.fieldFileInputDto._name);
  }

  // SETEAR ARCHIVOS EN EL INPUT SIN TOCAR PREVIEW NI LOCALSTORAGE
  public setFiles(files: FileList | null): void {
    // GUARDAR REFERENCIA
    this.fieldFileInputDto.setFiles(files); //==> SETEAR AL DTO UNICA FUENTE DE LA VERDAD

    if (this.inputFile) {
      this.setEmptyValue(); // RESETEAR INPUT ANTES
      if (files) {
        const dataTransfer = new DataTransfer();
        Array.from(files).forEach((f) => dataTransfer.items.add(f)); // AGREGAR CADA FILE
        this.inputFile.files = dataTransfer.files; // ASIGNAR FILES AL INPUT
      }
    }
  }

  // REQUERIR
  public required(): void {
    this.setRequired(true);
  }

  // NO REQUERIR
  public disRequired(): void {
    this.setRequired(false);
  }

  // PRIVADO PARA AJUSTAR REQUIRED
  private setRequired(required: boolean): void {
    this.fieldFileInputDto.setRequired(required);
    this.fieldFileInputDto._isRequired
      ? this.inputFile.setAttribute("required", "")
      : this.inputFile.removeAttribute("required"); // REQUERIR VALOR O NO
  }

  public disabled(): void {
    this.fieldFileInputDto.disabled(); // => DESHABILITAR EN DTO UNICA FUENTE DE LA VERDAD
    this.inputFile.setAttribute('disabled', ''); // => ACTUALIZAMOS ATRIBUTO
  }

  // HABILITAR CAMPO
  public enable(): void {
    this.fieldFileInputDto.enabled(); // => HABILITAR EN DTO UNICA FUENTE DE LA VERDAD
    this.inputFile.removeAttribute('disabled'); // => REMOVEMOS EL ATRIBUTO EN ELEMENTO
  }
  
  // MODIFICAR TIPO
  public setType(type: TFieldType): void {
    this.fieldFileInputDto.setType(type); //==> SETEAR AL DTO UNICA FUENTE DE LA VERDAD
    this.inputFile.setAttribute("type", type); //AGREGAR VALOR AL ELEMENTO
  }

  // MODIFICAR  ATRIBUTO ACCEPT
  public setAccept(value: string): void {
    this.fieldFileInputDto.setAccept(value); //==> SETEAR AL DTO UNICA FUENTE DE LA VERDAD
    this.inputFile.setAttribute("accept", value); // ==> AGREGAR VALOR AL ELEMENTO
  }

  public setMultiple(multiple: boolean): void {
    this.fieldFileInputDto.setMultiple(multiple);
    this.fieldFileInputDto._multiple ? this.inputFile.setAttribute("multiple", "") // PERMITIR MULTIPLE SELECCIÓN
    : this.inputFile.removeAttribute("multiple"); // REMOVER ATRIBUTO
  }

  // OBTENER FILES INTERNAMENTE
  public getFiles(): FileList | null {
    return this.fieldFileInputDto._files;
  }

  // MODIFICAR NAME DEL ELEMENTO
  public setName(name: string): void {
    this.fieldFileInputDto.setName(name); // ==> SETEAR EN DTO PRIMERO
    this.inputFile.setAttribute("name", name); // ==> ASIGNAR AL NAME DEL ELEMENTO
  }

  // VACIAR VALUE POR DEFECTO EN FILE
  public setEmptyValue(): void {
    this.fieldFileInputDto.setEmptyValue(); // VACIAR VALOR EN DTO
    this.inputFile.value = this.fieldFileInputDto._value as string; //LUEGO PASARLO AL ELEMENTO
  }

  // OBTENER ELEMENTO
  public get _inputFileElement(): HTMLInputElement {
    return this.inputFile;
  }
}
