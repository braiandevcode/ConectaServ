// IMPORTACIONES
import { iBaseFieldOptions } from "../../../interfaces/interfaces";

// PLANTILLA PARA CREACION DE DIFERENTES CAMPOS
// USAMOS DOS GENERICOS  PARA OPCIONES DINAMICAS Y PARA EL VALUE CON TIPOS PRIMITIVOS
export default class FieldBaseDto<T = string | File | FileList | boolean | number | iBaseFieldOptions, O extends iBaseFieldOptions = iBaseFieldOptions> {
  private readonly name: string; // SOLO LECTURA, NO SE PUEDE MODIFICAR DESPUES DEL CONSTRUCTOR
  private readonly id: string; // SOLO LECTURA, IDENTIFICADOR FIJO DEL CAMPO
  private readonly required: boolean; // SOLO LECTURA, INDICA SI EL CAMPO ES OBLIGATORIO
  private value: T | null; // VARIABLE PRIVADA, SE PUEDE MODIFICAR DURANTE LA VIDA DEL OBJETO
  private _disabled: boolean; // VARIABLE PRIVADA, INDICA SI EL CAMPO ESTÁ DESHABILITADO, PUEDE CAMBIAR

  constructor(private readonly options: O) {
    // SOLO LECTURA, CONFIGURACION INICIAL DEL CAMPO
    this.name = options.name;
    this.id = options.id ?? "";
    (this.value = null), (this.required = options.required);
    this._disabled = options.disabled;
  }

  // DESHABILITAR CAMPO
  public disabled(): void {
    this._disabled = true;
  }

  // HABILITAR CAMPO
  public enabled(): void {
    this._disabled = false;
  }

  public setRequired(required:boolean):void{
    this.options.required = required;
  }

  //--------------------------- PROPIEDADES DE ACCESOS ----------------------------------//

  // VER VALOR DE VALUE
  public get _value(): T | null {
    return this.value;
  }

  public set _setValue(val: T | null) {
    this.value = val;
  }

  public get _options(): O {
    return this.options;
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