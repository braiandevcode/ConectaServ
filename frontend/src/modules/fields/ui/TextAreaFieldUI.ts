//IMPORTACIONES
import {iEnableAndDisabledAutocomplete, iAriaLabel, iIdentifier, iName, iPlaceHolder, iSpellcheckAndLang, isRequired, iTextContent, iAutocomplete} from 'interfaces/interfaces.js';
import TextAreaFieldDto from '../dto/TextAreaFieldDto.js';

// CLASE PARA CAMPOS
export default class TextAreaFieldUI implements iAriaLabel, iName, iPlaceHolder, iSpellcheckAndLang, iIdentifier, isRequired, iAutocomplete, iTextContent, iEnableAndDisabledAutocomplete {
  private inputField: HTMLTextAreaElement;
  constructor(private readonly fieldTextAreaDto: TextAreaFieldDto) {
    this.inputField = document.createElement('textarea');
    this.buildInputFieldUI();
  }
  // LEER DATOS DE CONFIGURACION Y CONTRUIR CAMPO
  public buildInputFieldUI(): void {
    // ESTABLECER TIPO DE INPUT
    this.setName(this.fieldTextAreaDto._name);
    this.isOnFocus(this.fieldTextAreaDto._autoFocus);
    // APLICAR ATRIBUTOS SOLO SI SON TRUE O TIENEN VALOR
    if (this.fieldTextAreaDto._arialabel) this.setAriaLabel(this.fieldTextAreaDto._arialabel);
    if (this.fieldTextAreaDto._cols > 0) this.setCols(this.fieldTextAreaDto._cols);
    if (this.fieldTextAreaDto._placeholder) this.setPlaceholder(this.fieldTextAreaDto._placeholder);
    if (this.fieldTextAreaDto._rows > 0) this.setRows(this.fieldTextAreaDto._rows);
    if (this.fieldTextAreaDto._lang) this.setLang(this.fieldTextAreaDto._lang);
    if (this.fieldTextAreaDto._spellcheck) this.setSpellcheck(this.fieldTextAreaDto._spellcheck);
    if (this.fieldTextAreaDto._id) this.setId(this.fieldTextAreaDto._id);
    if (this.fieldTextAreaDto._currentDisabled) this.disabled(); // DESHABILITAR INPUT
    if (this.fieldTextAreaDto._isRequired) this.required();
    if (this.fieldTextAreaDto._value) this.setValue(this.fieldTextAreaDto._value as string);
    if (this.fieldTextAreaDto._textContent) this.addTextContent(this.fieldTextAreaDto._textContent);
    if (this.fieldTextAreaDto._isautocomplete) this.setAutocomplete(this.fieldTextAreaDto._isautocomplete);
    if (this.fieldTextAreaDto._autocompleteValue) this.setAutocompleteValue(this.fieldTextAreaDto._autocompleteValue);
  }

  // AÑADIR VALOR AL DOM
  public setValue(value: string): void {
    this.fieldTextAreaDto.setValue(value); // SETEAR EL DTO UNICA FUENTE DE LA VERDAD
    this.inputField.value = this.fieldTextAreaDto._value as string; //ASIGNAR EL VALOR AL ELEMENTO
  }

  // MODIFICAR COLUMNAS
  public setCols(cols: number) {
    this.fieldTextAreaDto.setCols(cols); // SETEAR EL DTO UNICA FUENTE DE LA VERDAD
    this.inputField.setAttribute('cols', String(cols)); //ASIGNAR EL VALOR AL ELEMENTO
  }

  // MODIFICAR FILAS
  public setRows(rows: number): void {
    this.fieldTextAreaDto.setRows(rows); // SETEAR EL DTO UNICA FUENTE DE LA VERDAD
    this.inputField.setAttribute('rows', String(rows)); //ASIGNAR EL VALOR AL ELEMENTO
  }

  // ----------IMPLEMENTACIONES DE CONTRATOS DE INTERFACES--------------------//
  // MODIFICAR NAME DE ELEMENTO
  public setName(name: string) {
    this.fieldTextAreaDto.setName(name); // SETEAR EL DTO UNICA FUENTE DE LA VERDAD
    this.inputField.setAttribute('name', name); //ASIGNAR EL VALOR AL ELEMENTO
  }

  // MODIFICAR ID
  public setId(id: string): void {
    this.fieldTextAreaDto.setId(id); // SETEAR EL DTO UNICA FUENTE DE LA VERDAD
    this.inputField.setAttribute('id', id); //ASIGNAR EL VALOR AL ELEMENTO
  }

  // AGREGAR NUEVO AREA LABEL
  public setAriaLabel(labelArea: string): void {
    this.fieldTextAreaDto.setAariaLabel(labelArea); // SETEAR EL DTO UNICA FUENTE DE LA VERDAD
    this.inputField.setAttribute('aria-label', labelArea); //ASIGNAR EL VALOR AL ELEMENTO
  }

  // SETEAR EL PLACEHOLDER
  public setPlaceholder(placeholder: string): void {
    this.fieldTextAreaDto.setPlaceholder(placeholder); // SETEAR EL DTO UNICA FUENTE DE LA VERDAD
    this.inputField.setAttribute('placeholder', placeholder);
  }

  // SETEAR EL LANG
  public setLang(lang: string): void {
    this.fieldTextAreaDto.setLang(lang); // SETEAR EL DTO UNICA FUENTE DE LA VERDAD
    this.inputField.setAttribute('lang', lang);
  }

  // SETEAR EL SPELLCHECK
  public setSpellcheck(spellcheck: boolean): void {
    this.fieldTextAreaDto.setSpellcheck(spellcheck); // SETEAR EL DTO UNICA FUENTE DE LA VERDAD
    spellcheck ? this.inputField.setAttribute('spellcheck', '') : this.inputField.removeAttribute('spellcheck');
  }

  // DESHABILITAR CAMPO
  public disabled(): void {
    this.fieldTextAreaDto.disabled(); // => DESHABILITAR EN DTO UNICA FUENTE DE LA VERDAD
    this.inputField.setAttribute('disabled', ''); // => ACTUALIZAMOS ATRIBUTO
  }

  // HABILITAR CAMPO
  public enable(): void {
    this.fieldTextAreaDto.enabled(); // => HABILITAR EN DTO UNICA FUENTE DE LA VERDAD
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

  // AGREGAR TEXTO A ELEMENTO
  public addTextContent(text: string): void {
    this.fieldTextAreaDto.addTextContent(text); //PRIMERO SETEAR DTO
    this.inputField.textContent = text;
  }

  //---------------------------------------------- METODOS PRIVADOS---------------------------------------------//
  // SETEAR BOOLEAN AUTOCOMPLETE
  public setAutocomplete(autocomplete: boolean): void {
    this.fieldTextAreaDto.setAutocomplete(autocomplete); // ==> SETEA EL AUTOCOMPLETE BOOLEAN EN DTO
    this.setAutocompleteValue(this.fieldTextAreaDto._autocompleteValue); //==> SETEA EL AUTOCOMPLETE VALOR EN DTO
    this.inputField.setAttribute('autocomplete', this.fieldTextAreaDto._autocompleteValue); // ==> APLICCAR VALOR DEL DTO AL ELEMENTO
  }

  // SETEAR VALOR EN ATRIBUTO AUTOCOMPLETE
  public setAutocompleteValue(value: string): void {
    if (this.fieldTextAreaDto._isautocomplete) {
      if (value !== '' && value !== 'off') this.fieldTextAreaDto.setAutocompleteValue(value);
      else {
        console.error('El autocomplete debe tener un valor'); // EN CASO DE ERROR
        return;
      }
    } else this.fieldTextAreaDto.setAutocompleteValue('off');
  }

  // PRIVADO PARA AJUSTAR REQUIRED
  private setRequired(required: boolean): void {
    this.fieldTextAreaDto.setRequired(required); // ==> SETEAR DTO UNICA FUENTE DE VERDAD
    // TERNARIO SI ES TRUE O FALSE
    this.fieldTextAreaDto._isRequired ? this.inputField.setAttribute('required', '') : this.inputField.removeAttribute('required'); // REQUERIR VALOR O NO
  }

  // SETEO DE FOCUS
  private isOnFocus(focus: boolean) {
    this.fieldTextAreaDto.setFocus(focus); // ==> SETEAR DTO UNICA FUENTE DE VERDAD
    // TERNARIO SI FOCUS ES TRUE O FALSE
    this.fieldTextAreaDto._autoFocus ? this.inputField.setAttribute('autofocus', '') : this.inputField.removeAttribute('autofocus');
  }

  //------------------------------ PROPIEDADES DE ACCESO-----------------------------//
  public get _inputElement(): HTMLTextAreaElement {
    return this.inputField;
  }
}
