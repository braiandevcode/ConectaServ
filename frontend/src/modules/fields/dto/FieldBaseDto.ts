// IMPORTACIONES
import { iBaseFieldOptions } from '../../../interfaces/interfaces';

// PLANTILLA PARA CREACION DE DIFERENTES CAMPOS
// USAMOS DOS GENERICOS  PARA OPCIONES DINAMICAS Y PARA EL VALUE CON TIPOS PRIMITIVOS
export default abstract class FieldBaseDto<T = string | File | FileList | boolean | number | iBaseFieldOptions<string | File | FileList | boolean | number>, O extends iBaseFieldOptions<T> = iBaseFieldOptions<T>> {
  private name: string;
  private id: string;
  private required: boolean;
  private value: T | null;
  private _disabled: boolean;
  private autoFocus: boolean;

  constructor(options: O) {
    // SOLO LECTURA, CONFIGURACION INICIAL DEL CAMPO
    this.name = options.name;
    this.id = options.id ?? '';
    this.value = options.value || null;
    this.required = options.required || false;
    this._disabled = options.disabled || false;
    this.autoFocus = options.autofocus || false;
  }

  // DESHABILITAR CAMPO
  public disabled(): void {
    this.setDisabled(true);
  }

  public setId(id: string): void {
    this.id = id;
  }

  // HABILITAR CAMPO
  public enabled(): void {
    this.setDisabled(false);
  }

  // HABILITAR CAMPO
  public setName(name: string): void {
    this.name = name;
  }

  // MODIFICAR VALOR DE REQUIRED
  public setRequired(required: boolean): void {
    this.required = required;
  }

  // MODIFICAR FOCUS DE CAMPO
  public setFocus(focus: boolean): void {
    this.autoFocus = focus;
  }

  // MODIFICAR VALOR DE CAMPO
  public setValue(val: T | null): void {
    this.value = val;
  }

  // MODIFICAR DISABLED
  public setDisabled(disabled: boolean): void {
    this._disabled = disabled;
  }

  //--------------------------- PROPIEDADES DE ACCESOS ----------------------------------//

  // VER VALOR DE VALUE
  public get _value(): T | null {
    return this.value;
  }

  // VER VALOR DE VALUE
  public get _autoFocus(): boolean {
    return this.autoFocus;
  }

  // VER VALOR DEL ID
  public get _id(): string {
    return this.id;
  }

  // VER VALOR DE NAME
  public get _name(): string {
    return this.name;
  }

  // VER VALOR DEL DISABLED
  public get _currentDisabled(): boolean {
    return this._disabled;
  }

  // VER VALOR DE REQUIRED
  public get _isRequired(): boolean {
    return this.required;
  }
}
