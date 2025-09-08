//IMPORTACIONES
import FieldBaseOptions from "../../dto/FieldBaseOptions.js";
import { iTextAreaFieldOptions } from "../../../interfaces/interfaces.js";

// CLASE PARA CAMPOS
export default class TextAreaFieldUI {
  private inputField: HTMLTextAreaElement;
  constructor(private readonly options: FieldBaseOptions<string, iTextAreaFieldOptions>) {
    this.inputField = document.createElement("textarea");
    this.buildInputFieldUI();
  }

  public buildInputFieldUI(): void {
    // ESTABLECER TIPO DE INPUT
    this.inputField.setAttribute("name", this.options._name);
    // APLICAR ATRIBUTOS SOLO SI SON TRUE O TIENEN VALOR
    if (this.options._options["aria-label"]) this.inputField.setAttribute("aria-label", this.options._options["aria-label"]); // ACEPTAR TIPOS DE
    if (this.options._options.cols > 0) this.inputField.setAttribute("cols", String(this.options._options.cols));
    if (this.options._options.placeholder) this.inputField.setAttribute("placeholder", this.options._options.placeholder);
    if (this.options._options.rows > 0) this.inputField.setAttribute("rows", String(this.options._options.rows));
    if (this.options._options.lang) this.inputField.setAttribute("lang", this.options._options.lang);
    if (this.options._options.spellcheck) this.inputField.setAttribute("spellcheck", String(this.options._options.spellcheck));
    if (this.options._options.autofocus) this.inputField.setAttribute("autofocus", "");
    if (this.options._options.id) this.inputField.setAttribute("id", this.options._options.id);
    if (this.options._currentDisabled) this.inputField.setAttribute("disabled", "true"); // DESHABILITAR INPUT
    if (this.options._isRequired) this.inputField.setAttribute("required", ""); // REQUERIR SELECCIÓN
    if (this.options._value) this.inputField.value = this.options._value;
    if (this.options._options.textContent) this.inputField.textContent;
  }

  // AÑADIR VALOR AL DOM
  public setValue(): void {
    // SI EXISTE ELEMENTO Y SI EL VALOR NO ES NULL
    if (this.inputField && this.options._value) {
      this.inputField.value = this.options._value; //ASIGNAR EL VALOR AL ELEMENTO
    }
  }

  // AGREGAR AUTOFOCUS
  public addAutoFocus(): void {
    // SI EXISTE ELEMENTO Y SI EL VALOR NO ES NULL
    if (this.inputField) {
      this.setFocus(true); //TRUE
    }
  }

  // REMOVER AUTOFOCUS
  public removeAutoFocus(): void {
    // SI EXISTE ELEMENTO Y SI EL VALOR NO ES NULL
    if (this.inputField && this.inputField.hasAttribute("autofocus")) {
      this.setFocus(false); //FALSO
    }
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

  // SETEAR EL PLACEHOLDER
  public required(): void {
    this.setRequired(true);
  }

  public disRequired(): void {
    this.setRequired(false);
  }

  //---------------------------------------------- METODOS PRIVADOS---------------------------------------------//
  // SETEAR BOOLEAN AUTOCOMPLETE
  private setAutocomplete(state: boolean): void {
    this.options._options.autocomplete = state;
    this.inputField.setAttribute("autocomplete", state ? "on" : "off");
  }

  private setRequired(required: boolean): void {
    this.options.setRequired(required);
    this.options._isRequired ? this.inputField.setAttribute("required", "") : this.inputField.removeAttribute("required"); // REQUERIR VALOR O NO
  }

  // SETEO DE FOCUS
  private setFocus(focus: boolean) {
    focus ? this.inputField.setAttribute("autofocus", "") : this.inputField.removeAttribute("autofocus");
  }

  //------------------------------ PROPIEDADES DE ACCESO-----------------------------//
  public get _inputElement(): HTMLTextAreaElement {
    return this.inputField;
  }
}