//IMPORTACIONES
import FormFieldValidationUI from '../../validators/ui/FormFieldValidationUI.js';
import { TFieldType } from '../../../types/types';
import { iAriaLabel, iAutocomplete, iEnableAndDisabledAutocomplete, iIdentifier, iInputType, iName, iPlaceHolder, iSpellcheckAndLang, isRequired } from '../../../interfaces/interfaces';
import InputFieldDto from '../dto/InputFieldDto';

// CLASE PARA CAMPOS RESPONSABLE DE UI ATADO A CLASE DE VALIDACION RESPONSABLE DE UI
export default class InputFieldUI extends FormFieldValidationUI implements iAriaLabel, iName, iInputType, iPlaceHolder, iSpellcheckAndLang, iIdentifier, isRequired, iAutocomplete, iEnableAndDisabledAutocomplete {
  private inputField: HTMLInputElement;
  constructor(private readonly fieldInputDto: InputFieldDto) {
    super();
    this.inputField = document.createElement('input');
    this.buildInputFieldUI();
  }

  // CONSTRUCCION CAMPO
  public buildInputFieldUI(): void {
    // ESTABLECER TIPO DE INPUT
    this.setType(this.fieldInputDto._type);
    if (this.fieldInputDto._placeholder) this.setPlaceholder(this.fieldInputDto._placeholder);
    // APLICAR ATRIBUTOS SOLO SI SON TRUE O TIENEN VALOR
    if (this.fieldInputDto._arialabel) this.setAriaLabel(this.fieldInputDto._arialabel);
    if (this.fieldInputDto._lang) this.setLang(this.fieldInputDto._lang);
    if (this.fieldInputDto._autoFocus) this.isOnFocus(this.fieldInputDto._autoFocus);
    if (this.fieldInputDto._spellcheck) this.setSpellcheck(this.fieldInputDto._spellcheck);
    this.setAutocomplete(this.fieldInputDto._isautocomplete);
    this.setAutocompleteValue(this.fieldInputDto._autocompleteValue);
    if (this.fieldInputDto._id) this.setId(this.fieldInputDto._id);
    if (this.fieldInputDto._currentDisabled) this.disabled();
    if (this.fieldInputDto._isRequired) this.setRequired(this.fieldInputDto._isRequired);
    if (this.fieldInputDto._name) this.setName(this.fieldInputDto._name);
    if (this.fieldInputDto._value) this.setValue(this.fieldInputDto._value as string);
  }

  // AGREGAR VALOR AL INPUT
  public setValue(value: string): void {
    this.fieldInputDto.setValue(value); // ==> PRIMERO SETEAR DTO
    this.inputField.value = this.fieldInputDto._value as string; //ASIGNAR EL VALOR AL ELEMENTO
  }

  // ----------IMPLEMENTACIONES DE CONTRATOS DE INTERFACES--------------------//
  // MODIFICAR NAME DE ELEMENTO
  public setName(name: string) {
    this.fieldInputDto.setName(name); // ==> PRIMERO SETEAR DTO
    this.inputField.setAttribute('name', name); // PASAR EL VALOR AL ELEMENTO
  }

  // MODIFICAR ID
  public setId(id: string): void {
    this.fieldInputDto.setId(id); // ==> PRIMERO SETEAR DTO
    this.inputField.setAttribute('id', id); // PASAR EL VALOR AL ELEMENTO
  }

  public setType(type: TFieldType): void {
    this.fieldInputDto.setType(type); // ==> PRIMERO SETEAR DTO
    this.inputField.setAttribute('type', type); // PASAR EL VALOR AL ELEMENTO
  }

  // AGREGAR NUEVO AREA LABEL
  public setAriaLabel(labelArea: string): void {
    this.fieldInputDto.setAariaLabel(labelArea); // ==> PRIMERO SETEAR DTO FUENTE DE VERDAD
    this.inputField.setAttribute('aria-label', labelArea); // PASAR EL VALOR AL ELEMENTO
  }

  // SETEAR EL PLACEHOLDER
  public setPlaceholder(placeholder: string): void {
    this.fieldInputDto.setPlaceholder(placeholder); // ==> PRIMERO SETEAR DTO
    this.inputField.setAttribute('placeholder', placeholder); // PASAR EL VALOR AL ELEMENTO
  }

  // SETEAR EL LANG
  public setLang(lang: string): void {
    this.fieldInputDto.setLang(lang); // ==> PRIMERO SETEAR DTO
    this.inputField.setAttribute('lang', lang);
  }

  public getValue(): string {
    return this.fieldInputDto._value as string;
  }

  public getName(): string {
    return this.fieldInputDto._name;
  }

  // SETEAR EL SPELLCHECK
  public setSpellcheck(spellcheck: boolean): void {
    this.fieldInputDto.setSpellcheck(spellcheck); // ==> PRIMERO SETEAR DTO
    spellcheck ? this.inputField.setAttribute('spellcheck', '') : this.inputField.removeAttribute('spellcheck');
  }

  // DESHABILITAR CAMPO
  public disabled(): void {
    this.fieldInputDto.disabled(); // => DISABLED A TRUE
    this.inputField.setAttribute('disabled', ''); // => ACTUALIZAMOS ATRIBUTO
  }

  // HABILITAR CAMPO
  public enable(): void {
    this.fieldInputDto.enabled(); // => DISABLED A FALSE
    this.inputField.removeAttribute('disabled'); // => REMOVEMOS EL ATRIBUTO EN ELEMENTO
  }

  //HABILITAR AUTOCOMPLETO
  public enableAutocomplete(): void {
    this.setAutocomplete(true);
  }

  // DESHABILITAR AUTOCOMPLETE
  public disabledAutocomplete(): void {
    this.setAutocomplete(false);
  }

  // REQUERIR
  public required(): void {
    this.setRequired(true);
  }

  // NO REQUERIR
  public disRequired(): void {
    this.setRequired(false);
  }
  // SETEAR BOOLEAN AUTOCOMPLETE
  public setAutocomplete(autocomplete: boolean): void {
    this.fieldInputDto.setAutocomplete(autocomplete);
    this.inputField.setAttribute('autocomplete', this.fieldInputDto._autocompleteValue);
  }

  // SETEAR VALOR EN ATRIBUTO AUTOCOMPLETE
  public setAutocompleteValue(value: string): void {
    if (this.fieldInputDto._isautocomplete) {
      if (value !== '' && value !== 'off') this.fieldInputDto.setAutocompleteValue(value);
      else {
        console.error('El autocomplete debe tener un valor');
        return;
      }
    } else this.fieldInputDto.setAutocompleteValue('off');
  }

  //---------------------------------------------- METODOS PRIVADOS---------------------------------------------//

  // PRIVADO PARA AJUSTAR REQUIRED
  private setRequired(required: boolean): void {
    this.fieldInputDto.setRequired(required);
    this.fieldInputDto._isRequired ? this.inputField.setAttribute('required', '') : this.inputField.removeAttribute('required'); // REQUERIR VALOR O NO
  }

  // SETEO DE FOCUS
  public isOnFocus(focus: boolean) {
    if (focus) {
      this.inputField.focus(); // FOCO INMEDIATO
      this.inputField.setAttribute('autofocus', ''); // PARA PROXIMA RECARGA
    } else {
      this.inputField.removeAttribute('autofocus'); // SI NECESITO LIMPIAR
    }
  }

  //------------------------PROPIEDADES ACCESORIAS--------------------------------------//
  // VER EL INPUT ELEMENTO
  public get _inputElement(): HTMLInputElement {
    return this.inputField;
  }
}
