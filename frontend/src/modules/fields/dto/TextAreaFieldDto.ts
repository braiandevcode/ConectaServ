import {iAutocomplete, iPlaceHolder, iSpellcheckAndLang, iTextAreaFieldOptions, iTextContent} from '../../../interfaces/interfaces.js';
import FieldBaseDto from './FieldBaseDto.js';

// DTO CONCRETA PARA CONFIGURACION DE TEXTAREA
export default class TextAreaFieldDto extends FieldBaseDto implements iTextContent, iPlaceHolder, iSpellcheckAndLang, iAutocomplete {
  private cols: number;
  private rows: number;
  private placeholder: string;
  private textContent: string;
  private arialabel: string;
  private spellcheck: boolean;
  private lang: string;
  private autocomplete: boolean;
  private autocompleteValue: string;

  constructor(options: iTextAreaFieldOptions) {
    super(options);
    this.cols = options.cols || 0;
    this.rows = options.rows || 0;
    this.placeholder = options.placeholder || '';
    this.textContent = options.textContent || '';
    this.arialabel = options['aria-label'] || '';
    this.autocomplete = options.autocomplete || false;
    this.spellcheck = options.spellcheck || false;
    this.lang = options.lang || '';
    this.autocompleteValue = options.autocompleteValue || '';
  }

  // AGREAGAR COLUMNAS
  public setCols(cols: number): void {
    this.cols = cols;
  }

  // AGREGAR FILAS
  public setRows(rows: number): void {
    this.rows = rows;
  }

  // MODIFICAR TEXTO
  public addTextContent(text: string): void {
    this.textContent = text;
  }

  // MODIFICAR PLACEHOLDER
  public setPlaceholder(placeholder: string): void {
    this.placeholder = placeholder;
  }

  public setAariaLabel(arialabel: string): void {
    this.arialabel = arialabel;
  }

  public setSpellcheck(spellcheck: boolean): void {
    this.spellcheck = spellcheck;
  }

  public setLang(lang: string): void {
    this.lang = lang;
  }

  // AGREGAR VALOR BOOLEAN DE AUTOCOMPLETADO
  public setAutocomplete(autocomplete: boolean): void {
    this.autocomplete = autocomplete;
  }

  // AGREGAR/MODIFICAR VALOR DE ATRIBUTO AUTOCOMPLETADO
  public setAutocompleteValue(value: string): void {
    this.autocompleteValue = value;
  }

  // -------------------------PROPIEDADES DE ACCESO--------------------------//

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

  public get _textContent(): string {
    return this.textContent;
  }

  public get _arialabel(): string {
    return this.arialabel;
  }

  //VER CANTIDAD DE COLUMNAS TEXTAREA
  public get _cols(): number {
    return this.cols;
  }

  //VER CANTIDAD DE FILAS TEXTAREA
  public get _rows(): number {
    return this.rows;
  }
}