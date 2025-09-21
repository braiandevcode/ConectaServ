import { iIdentifier, iName, isRequired } from 'interfaces/interfaces.js';
import OptionItem from '../components/OptionItem.js';
import SelectFieldDto from '../dto/SelectFieldDto.js';

// CAMPO SELECT QUE HEREDA DE BASE
export default class SelectFieldUI implements iName, iIdentifier, isRequired {
  private element: HTMLSelectElement;
  constructor(private readonly fieldSelectDto: SelectFieldDto) {
    this.element = document.createElement('select');
    this.buildSelect();
  }

  // CONSTRUIR EL DOM DEL SELECT
  public buildSelect(): void {
    this.setId(this.fieldSelectDto._id);
    this.setName(this.fieldSelectDto._name);
    this.isOnFocus(this.fieldSelectDto._autoFocus);
    if (this.fieldSelectDto._currentDisabled) this.disabled();
    if (this.fieldSelectDto._isRequired) this.required();

    // CREAR LAS OPCIONES SEGUN CONFIGURACION
    this.renderOptions();
    this.setValue(this.fieldSelectDto._value as string);
  }

  public setId(id: string): void {
    this.fieldSelectDto.setId(id); // ==> UNICA FUENTE DE LA VERDAD DTO
    this.element.setAttribute('id', id); // APLICAR VALOR DE ID A ELEMENTO
  }

  public setName(name: string): void {
    this.fieldSelectDto.setName(name); // ==> UNICA FUENTE DE LA VERDAD DTO
    this.element.setAttribute('name', name);
  }

  private renderOptions(): void {
    // CREAR LAS OPCIONES SEGUN CONFIGURACION
    this.fieldSelectDto.itemsOption.forEach((opt) => {
      const option: OptionItem = new OptionItem(opt.value, opt.text, opt.disabled, opt.selected);
      const optioEl: HTMLOptionElement = option.getElement();
      this.element.appendChild(optioEl);
    });
  }

  // AÑADIR VALOR AL DOM
  public setValue(value: string): void {
    this.fieldSelectDto.setValue(value); //SETEAR EL DTO
    this.element.value = value; //ASIGNAR EL VALOR AL ELEMENTO
  }

  // SETEO DE FOCUS
  private isOnFocus(focus: boolean) {
    this.fieldSelectDto.setFocus(focus); //SETEAR EL DTO
    this.fieldSelectDto._autoFocus ? this.element.setAttribute('autofocus', '') : this.element.removeAttribute('autofocus');
  }

  public required(): void {
    this.setRequired(true);
  }

  public disRequired(): void {
    this.setRequired(false);
  }

  // DESHABILITAR CAMPO
  public disabled(): void {
    this.fieldSelectDto.disabled(); // => DESHABILITAR EN DTO UNICA FUENTE DE LA VERDAD
    this.element.setAttribute('disabled', ''); // => ACTUALIZAMOS ATRIBUTO
  }

  // HABILITAR CAMPO
  public enable(): void {
    this.fieldSelectDto.enabled(); // => HABILITAR EN DTO UNICA FUENTE DE LA VERDAD
    this.element.removeAttribute('disabled'); // => REMOVEMOS EL ATRIBUTO EN ELEMENTO
  }

  private setRequired(required: boolean): void {
    this.fieldSelectDto.setRequired(required); // ==> SETEAR DTO FUENTE DE LA VERDAD
    required ? this.element.setAttribute('required', '') : this.element.removeAttribute('required'); // REQUERIR VALOR O NO
  }

  // VER VALOR ACTUAL DEL SELECT
  public getValue(): string {
    return this.fieldSelectDto._value as string;
  }

  // ACCESOR DE PROPIEDAD PARA VER ELEMENTO
  public get _element(): HTMLSelectElement {
    return this.element;
  }
}
