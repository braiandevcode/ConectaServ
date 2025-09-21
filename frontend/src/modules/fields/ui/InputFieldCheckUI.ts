import { iCheckbox, iName, isRequired } from 'interfaces/interfaces.js';
import InputCheckboxDto from '../dto/InputCheckboxDto.js';

export default class InputFieldCheckUI implements iCheckbox, iName, isRequired {
  private inputFieldCheck: HTMLInputElement;
  constructor(private readonly checkboxFieldDto: InputCheckboxDto) {
    this.inputFieldCheck = document.createElement('input');
    this.buildInputFieldUI();
  }

  // CONSTRUCCION DE INPUT => CHECK/RADIO
  public buildInputFieldUI(): void {
    // ESTABLECER TIPO DE INPUT
    this.setType(this.checkboxFieldDto._type);
    // APLICAR ATRIBUTOS SOLO SI SON TRUE O TIENEN VALOR
    if (this.checkboxFieldDto._currentDisabled) this.disabled();
    if (this.checkboxFieldDto._isRequired) this.required();
    if (this.checkboxFieldDto._checked) this.checked();
    if (this.checkboxFieldDto._value) this.setValue(this.checkboxFieldDto._value as string);
    if (this.checkboxFieldDto._name) this.setName(this.checkboxFieldDto._name);
  }

  public setName(name: string): void {
    this.checkboxFieldDto.setName(name); // ==> UNICA FUENTE DE LA VERDAD
    this.inputFieldCheck.setAttribute('name', name); // ==> PASAR ESE VALOR AL DOM
  }

  // SETEAR EL CHECKED A TRUE
  public checked(): void {
    this.checkboxFieldDto.setChecked(true); // ==> UNICA FUENTE DE LA VERDAD
    this.inputFieldCheck.checked = this.checkboxFieldDto._checked;
  }

  // SETEAR EL CHECKED A FALSE
  public disChecked(): void {
    this.checkboxFieldDto.setChecked(false); // ==> UNICA FUENTE DE LA VERDAD
    this.inputFieldCheck.checked = this.checkboxFieldDto._checked;
  }

  // DESHABILITAR CAMPO
  public disabled(): void {
    this.checkboxFieldDto.disabled(); // => DISABLED A TRUE // ==> UNICA FUENTE DE LA VERDAD
    this.setDisabled(this.checkboxFieldDto._currentDisabled); // => ACTUALIZAMOS ATRIBUTO
  }

  // HABILITAR CAMPO
  public enable(): void {
    this.checkboxFieldDto.enabled(); // => DISABLED A FALSE // ==> UNICA FUENTE DE LA VERDAD
    this.setDisabled(this.checkboxFieldDto._currentDisabled); // => ACTUALIZAMOS ATRIBUTO
  }

  // SETEAR EL REQUIRE
  public required(): void {
    this.setRequired(true);
  }

  public disRequired(): void {
    this.setRequired(false);
  }

  public setValue(value: string): void {
    this.checkboxFieldDto.setValue(value); //SETEO ANTES DTO
    this.inputFieldCheck.value = value;
  }

  public setType(type: string): void {
    this.checkboxFieldDto.setType(type); //SETEO ANTES DTO
    this.inputFieldCheck.setAttribute('type', type);
  }

  //VER VALOR => VALUE DEL ELEMENTO
  public getValue(): string | null {
    return this.inputFieldCheck.checked ? this.inputFieldCheck.value : null;
  }

  //VER VALOR => VALUE DEL ELEMENTO
  public getName(): string {
    return this.checkboxFieldDto._name;
  }

  public setRequired(required: boolean): void {
    this.checkboxFieldDto.setRequired(required); //SETEO ANTES DTO
    required ? this.inputFieldCheck.setAttribute('required', '') : this.inputFieldCheck.removeAttribute('required'); // REQUERIR VALOR O NO
  }
  // ---------------------METODOS PRIVADOS -----------------------//
  // SEGUN VALOR AÑADIR O REMOVER DISABLED
  private setDisabled(disabled: boolean): void {
    this.checkboxFieldDto.setDisabled(disabled); //SETEO ANTES DTO
    disabled ? this.inputFieldCheck.setAttribute('disabled', '') : this.inputFieldCheck.removeAttribute('disabled');
  }

  //--------------------------PROPIEDADES DE ACCESO-------------------------------//

  // ACCESO A ELEMENTO INPUT
  public get _inputElement(): HTMLInputElement {
    return this.inputFieldCheck;
  }
}
