import {iInputFieldCheckOptions} from '../../../interfaces/interfaces';
import FieldBaseDto from './FieldBaseDto.js';

// DTO CONCRETA PARA CONFIGURACION DE SELECT
export default class InputCheckboxDto extends FieldBaseDto {
  private checked: boolean;
  private type: string;
  constructor(options: iInputFieldCheckOptions) {
    super(options);
    this.checked = options.checked || false;
    this.type = options.type || 'radio';
  }

  // -------------------------PROPIEDADES DE ACCESO--------------------------//
  public setChecked(check: boolean): void {
    this.checked = check;
  }

  public setType(type: string): void {
    this.type = type;
  }

  get _type(): string {
    return this.type;
  }

  get _checked(): boolean {
    return this.checked;
  }
}