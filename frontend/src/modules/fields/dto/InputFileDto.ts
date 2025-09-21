import {TFieldType} from '../../../types/types.js';
import {iFile, iInputFileOptions, iInputType} from '../../../interfaces/interfaces.js';
import FieldBaseDto from './FieldBaseDto.js';

// DTO CONCRETA PARA CONFIGURACION DE TEXTAREA
export default class InputFileDto extends FieldBaseDto implements iInputType, iFile {
  private files: FileList | null = null; // GUARDAR ARCHIVOS INTERNAMENTE
  private accept: string;
  private multiple: boolean;
  private type: TFieldType;

  constructor(options: iInputFileOptions) {
    super(options);
    this.type = options.type || 'text';
    this.accept = options.accept || '';
    this.multiple = options.multiple || false;
  }

  public setAccept(value: string): void {
    this.accept = value;
  }

  public setMultiple(multiple: boolean): void {
    this.multiple = multiple;
  }

  public setType(type: TFieldType): void {
    this.type = type;
  }

  // SETEAR ARCHIVOS EN EL INPUT SIN TOCAR PREVIEW NI LOCALSTORAGE
  public setFiles(files: FileList | null): void {
    this.files = files;
  }

  // VACIAR VALUE POR DEFECTO EN FILE
  public setEmptyValue(): void {
    this.setValue('');
  }

  // -------------------------PROPIEDADES DE ACCESO--------------------------//
  public get _type(): TFieldType {
    return this.type;
  }

  public get _accept(): string {
    return this.accept;
  }

  public get _multiple(): boolean {
    return this.multiple;
  }

  // OBTENER FILES INTERNAMENTE
  public get _files(): FileList | null {
    return this.files;
  }
}
