import { TFieldType, TTypeField } from '../../../types/types.js';
import { iAutocomplete, iInputFieldOptions, iInputType, iPlaceHolder, iSpellcheckAndLang } from '../../../interfaces/interfaces.js';
import FieldBaseDto from './FieldBaseDto.js';

// DTO CONCRETA PARA CONFIGURACION DE TEXTAREA
export default class InputFieldDto extends FieldBaseDto implements iPlaceHolder, iSpellcheckAndLang, iAutocomplete, iInputType {
  private placeholder: string;
  private arialabel: string;
  private spellcheck: boolean;
  private lang: string;
  private autocomplete: boolean;
  private autocompleteValue: string;
  private type: TFieldType;

  constructor(options: iInputFieldOptions) {
    super(options);
    this.placeholder = options.placeholder || '';
    this.arialabel = options['aria-label'] || '';
    this.autocomplete = options.autocomplete || false;
    this.spellcheck = options.spellcheck || false;
    this.lang = options.lang || '';
    this.type = options.type || 'text';
    this.autocompleteValue = options.autocompleteValue || 'off';
  }

  // MODIFICAR PLACEHOLDER
  public setPlaceholder(placeholder: string): void {
    this.placeholder = placeholder;
  }

  public setAariaLabel(arialabel: string): void {
    this.arialabel = arialabel;
  }

  // MODIFICAR TIPO DE INPUT
  public setType(type: TFieldType): void {
    this.type = type;
  }

  // MODIFICAR BOOLEAN DE spellcheck
  public setSpellcheck(spellcheck: boolean): void {
    this.spellcheck = spellcheck;
  }

  // MODIFICAR IDIOMA
  public setLang(lang: string): void {
    this.lang = lang;
  }

  // MODIFICAR BOOLEAN DE AUTOCOMPLETADO
  public setAutocomplete(autocomplete: boolean): void {
    this.autocomplete = autocomplete;
  }
  // MODIFICAR BOOLEAN DE AUTOCOMPLETADO
  public setAutocompleteValue(value: string): void {
    this.autocompleteValue = value;
  }

  // -------------------------PROPIEDADES DE ACCESO--------------------------//

  public get _type(): TFieldType {
    return this.type;
  }

  public get _lang(): string {
    return this.lang;
  }

  public get _isautocomplete(): boolean {
    return this.autocomplete;
  }

  public get _autocompleteValue(): string {
    return this.autocompleteValue;
  }

  public get _spellcheck(): boolean {
    return this.spellcheck;
  }

  public get _placeholder(): string {
    return this.placeholder;
  }

  public get _arialabel(): string {
    return this.arialabel;
  }

  public set _setValue(value: string) {
    this._setValue = value;
  }
}
