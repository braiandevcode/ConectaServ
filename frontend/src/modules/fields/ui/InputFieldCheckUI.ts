import { iInputFieldCheckOptions } from "../../../interfaces/interfaces";
import FieldBaseOptions from "../../dto/FieldBaseOptions.js";

export default class InputFieldCheckUI {
  private inputFieldCheck: HTMLInputElement;
  constructor(private readonly options: FieldBaseOptions<string, iInputFieldCheckOptions>) {
    this.inputFieldCheck = document.createElement("input");
    this.buildInputFieldUI();
  }

  // CONSTRUCCION DE INPUT => CHECK/RADIO
  public buildInputFieldUI(): void {
    // ESTABLECER TIPO DE INPUT
    this.inputFieldCheck.setAttribute("type", this.options._options.type);
    // APLICAR ATRIBUTOS SOLO SI SON TRUE O TIENEN VALOR
    if (this.options._options.id) this.inputFieldCheck.setAttribute("id", this.options._options.id);
    if (this.options._currentDisabled) this.inputFieldCheck.setAttribute("disabled", "true"); // DESHABILITAR INPUT
    if (this.options._isRequired) this.inputFieldCheck.setAttribute("required", ""); // REQUERIR VALOR
    if (this.options._options.checked) this.inputFieldCheck.checked = true;
    if (this.options._value) this.inputFieldCheck.value = this.options._value;
    if (this.options._name) this.inputFieldCheck.setAttribute("name", this.options._name);
  }

  // SETEAR EL CHECKED A TRUE
  public checked(): void {
    this.inputFieldCheck.checked = true;
  }

  // SETEAR EL CHECKED A FALSE
  public disChecked(): void {
    this.inputFieldCheck.checked = false;
  }

  // DESHABILITAR CAMPO
  public disabled(): void {
    this.options.disabled(); // => DISABLED A TRUE
    this.inputFieldCheck.setAttribute("disabled", ""); // => ACTUALIZAMOS ATRIBUTO
  }

  // HABILITAR CAMPO
  public enable(): void {
    this.options.enabled(); // => DISABLED A FALSE
    this.setDisabled(this.options._currentDisabled);
  }

  // SETEAR EL REQUIRE
  public required(): void {
    this.setRequired(true);
  }

  public disRequired(): void {
    this.setRequired(false);
  }

   //VER VALOR => VALUE DEL ELEMENTO
  public getValue(): string {
    return this.inputFieldCheck.value;
  }

  
  //VER VALOR => VALUE DEL ELEMENTO
  public getName(): string {
    return this.inputFieldCheck.name;
  }

  // ---------------------METODOS PRIVADOS -----------------------//

  // SEGUN VALOR AÑADIR O REMOVER DISABLED
  private setDisabled(disabled: boolean): void {
    disabled ? this.inputFieldCheck.setAttribute("disabled", "") : this.inputFieldCheck.removeAttribute("disabled");
  }

  private setRequired(required: boolean): void {
    this.options.setRequired(required);
    this.options._isRequired ? this.inputFieldCheck.setAttribute("required", "") : this.inputFieldCheck.removeAttribute("required"); // REQUERIR VALOR O NO
  }

  //--------------------------PROPIEDADES DE ACCESO-------------------------------//

  // ACCESO A ELEMENTO INPUT
  public get _inputElement(): HTMLInputElement {
    return this.inputFieldCheck;
  }
}
