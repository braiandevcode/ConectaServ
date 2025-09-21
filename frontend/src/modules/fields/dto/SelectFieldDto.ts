import { iOptionsItems, iSelectFieldOptions } from '../../../interfaces/interfaces.js';
import FieldBaseDto from './FieldBaseDto.js';

// DTO CONCRETA PARA CONFIGURACION DE SELECT
export default class SelectFieldDto extends FieldBaseDto<string> {
  private arialabel: string;
  private items: iOptionsItems[];

  constructor(options: iSelectFieldOptions) {
    super(options);
    this.arialabel = options['aria-label'] || '';
    this.items = options.items || [];
  }

  // MODIFICAR ARIA LABEL
  public setAariaLabel(arialabel: string): void {
    this.arialabel = arialabel;
  }

  // AGREGAR OPTION DEL SELECT
  public addItemOption(item: iOptionsItems): void {
    this.items.push(item);
  }

  // -------------------------PROPIEDADES DE ACCESO--------------------------//
  public get itemsOption(): iOptionsItems[] {
    return this.items;
  }

  public get _arialabel(): string {
    return this.arialabel;
  }
}
