//IMPORTACIONES

import { iInputFieldOptions } from "../../../interfaces/interfaces";
import FormFieldValidationUI from "../../validators/ui/FormFieldValidationUI.js";
import FieldBaseDto from "../dto/FieldBaseDto.js";


// CLASE PARA CAMPOS RESPONSABLE DE UI ATADO A CLASE DE VALIDACION RESPONSABLE DE UI
export default class InputFieldUI extends FormFieldValidationUI {
  private inputField: HTMLInputElement;
  constructor(private readonly options: FieldBaseDto<string, iInputFieldOptions>) {
    super();
    this.inputField = document.createElement("input");
    this.buildInputFieldUI();
  }

  public buildInputFieldUI(): void {
    // ESTABLECER TIPO DE INPUT
    this.inputField.setAttribute("type", this.options._options.type);
    if (this.options._options.placeholder) this.inputField.setAttribute("placeholder", this.options._options.placeholder);

    // APLICAR ATRIBUTOS SOLO SI SON TRUE O TIENEN VALOR
    if (this.options._options["aria-label"]) this.inputField.setAttribute("aria-label", this.options._options["aria-label"]);
    if (this.options._options.lang) this.inputField.setAttribute("lang", this.options._options.lang);
    if (this.options._options.autofocus) this.inputField.setAttribute("autofocus", "");
    if (this.options._options.spellcheck) this.inputField.setAttribute("spellcheck", String(this.options._options.spellcheck));
    this.options._options.autocomplete  ? this.inputField.setAttribute("autocomplete", "on") : this.inputField.setAttribute("autocomplete", "off");
    if (this.options._id) this.inputField.setAttribute("id", this.options._id);
    if (this.options._currentDisabled) this.inputField.setAttribute("disabled", "true"); // DESHABILITAR INPUT
    if (this.options._isRequired) this.inputField.setAttribute("required", ""); // REQUERIR VALOR
    if(this.options._name) this.inputField.setAttribute("name", this.options._options.name)
    if (this.options._value) this.inputField.value = this.options._options.value;
  }

  // SETEAR EL PLACEHOLDER
  public setPlaceHolder(placeholder: string): void {
    this.inputField.setAttribute("placeholder", placeholder);
  }

  // SETEAR EL LANG
  public setLang(lang: string): void {
    this.inputField.setAttribute("lang", lang);
  }

  // SETEAR EL SPELLCHECK
  public setSpellcheck(spellcheck: string): void {
    this.inputField.setAttribute("spellcheck", spellcheck);
  }

  // DESHABILITAR CAMPO
  public disabled(): void {
    this.options.disabled(); // => DISABLED A TRUE
    this.inputField.setAttribute("disabled", ""); // => ACTUALIZAMOS ATRIBUTO
  }

  // HABILITAR CAMPO
  public enable(): void {
    this.options.enabled(); // => DISABLED A FALSE
    this.inputField.removeAttribute("disabled"); // => REMOVEMOS EL ATRIBUTO EN ELEMENTO
  }

  public enableAutocomplete(): void {
    this.setAutocomplete(true);
  }

  public disableAutocomplete(): void {
    this.setAutocomplete(false);
  }

  // SETEAR EL REQUIRED A TRUE
  public required(): void {
    this.setRequired(true);
  }

  // SETEAR EL REQUIRED A FALSE
  public disRequired(): void {
    this.setRequired(false);
  }

  // SETEAR EL PLACEHOLDER
  public setValue(value: string | null): void {
    this.options._setValue = value;
    if (this.options._value) this.inputField.value = this.options._value;
  }

  // AGREGAR AUTOFOCUS
  public addAutoFocus(): void {
    // SI EXISTE ELEMENTO Y SI EL VALOR NO ES NULL
    if (this.inputField && this.options._options.autofocus) {
      this.setFocus(true);
    }
  }

  // REMOVER AUTOFOCUS
  public removeAutoFocus(): void {
    // SI EXISTE ELEMENTO Y SI EL VALOR NO ES NULL
    if (this.inputField && this.inputField.hasAttribute("autofocus")) {
      this.setFocus(false);
    }
  }
  //VER VALOR => VALUE DEL ELEMENTO
  public getValue(): string {
    return this.inputField.value;
  }

   //VER VALOR => VALUE DEL ELEMENTO
  public getName(): string {
    return this.inputField.name;
  }

  //---------------------------------------------- METODOS PRIVADOS---------------------------------------------//

  // SETEO DE FOCUS
  private setFocus(focus: boolean) {
    focus ? this.inputField.setAttribute("autofocus", "") : this.inputField.removeAttribute("autofocus");
  }

  // SETEAR BOOLEAN AUTOCOMPLETE
  private setAutocomplete(state: boolean): void {
    this.options._options.autocomplete = state;
    this.inputField.setAttribute("autocomplete", this._autocomplete ? "on" : "off");
  }

  // SETEAR REQUIRED SI EL VALOR ES TRUE AGREGAR SINO REMOVER
  private setRequired(required: boolean): void {
    this.options.setRequired(required);
    this.options._isRequired ? this.inputField.setAttribute("required", "") : this.inputField.removeAttribute("required"); // REQUERIR VALOR O NO
  }

  //------------------------PROPIEDADES ACCESORIAS--------------------------------------//
  // VER BOOLEAN AUTOCOMPLETE
  public get _autocomplete(): boolean {
    return this.options._options.autocomplete;
  }

  // VER EL INPUT ELEMENTO
  public get _inputElement(): HTMLInputElement {
    return this.inputField;
  }
}