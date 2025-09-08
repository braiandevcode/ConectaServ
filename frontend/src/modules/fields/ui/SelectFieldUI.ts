import { iSelectFieldOptions } from "../../../interfaces/interfaces";
import FieldBaseOptions from "../../dto/FieldBaseOptions.js";
import OptionItem from "../../form/components/OptionItem.js";

// CAMPO SELECT QUE HEREDA DE BASE
export default class SelectFieldUI {
  private element: HTMLSelectElement;
  // EN this.options AL TIPO FieldBaseOptions LE AGREGAMOS EL TIPO ESPECIFICO DEL GENERICO "T" Y EL SEGUNDO DE "O"
  constructor(private readonly options: FieldBaseOptions<string, iSelectFieldOptions>) {
    this.element = document.createElement("select");
    this.buidSelect();
  }

  // CONSTRUIR EL DOM DEL SELECT
  public buidSelect(): void {
    this.element.setAttribute("id", this.options._id);
    this.element.setAttribute("name", this.options._name);
    if (this.options._currentDisabled) this.element.setAttribute("disabled", "true");
    if (this.options._isRequired) this.element.setAttribute("required", "");
    if (this.options._options.autofocus) this.element.setAttribute("autofocus", "");
    if (this.options._value) this.element.value = this.options._value;

    // CREAR LAS OPCIONES SEGUN CONFIGURACION
    this.renderOptions();
  }

  private renderOptions(): void {
    // CREAR LAS OPCIONES SEGUN CONFIGURACION
    this.options._options.items.forEach((opt) => {
      const option: OptionItem = new OptionItem(opt.value, opt.text, opt.disabled, opt.selected);
      const optioEl: HTMLOptionElement = option.getElement();
      this.element.appendChild(optioEl);
    });
  }

  // AÑADIR VALOR AL DOM
  public setValue(): void {
    // SI EXISTE ELEMENTO Y SI EL VALOR NO ES NULL
    if (this.element && this.options._value) {
      this.element.value = this.options._value; //ASIGNAR EL VALOR AL ELEMENTO
    }
  }

  // AGREGAR AUTOFOCUS
  public addAutoFocus(): void {
    // SI EXISTE ELEMENTO Y SI EL VALOR NO ES NULL
    if (this.element && this.options._options.autofocus) {
      this.element.setAttribute("autofocus", "");
    }
  }

  // REMOVER AUTOFOCUS
  public removeAutoFocus(): void {
    // SI EXISTE ELEMENTO Y SI EL VALOR NO ES NULL
    if (this.element && this.element.hasAttribute("autofocus")) {
      this.element.removeAttribute("autofocus");
    }
  }

    // VER VALOR ACTUAL DEL SELECT
  public getValue(): string {
    return this.element.value;
  }

  // ACCESOR DE PROPIEDAD PARA VER ELEMENTO
  public get _element(): HTMLSelectElement {
    return this.element;
  }
}
