import FieldBaseOptions from "../dto/FieldBaseOptions.js";

// PLANTILLA PARA CREACION DE DIFERENTES CAMPOS
export default abstract class FormFieldBase<T extends string | FileList | null = string> {
  protected eventHandlers: {
    change?: (value: T) => void;
    blur?: (value: T) => void;
    focus?: () => void;
    input?: (value: T) => void;
  } = {};

  constructor(protected readonly options: FieldBaseOptions) {}

  protected abstract render(): HTMLElement;
  protected abstract getValue(): T | null;
  protected abstract setValue(value: T): void;

  // =========================
  // REGISTRO DE EVENTOS
  // =========================
  public onChange(handler: (value: T) => void) {
    this.eventHandlers.change = handler;
  }

  public onBlur(handler: (value: T) => void) {
    this.eventHandlers.blur = handler;
  }

  public onFocus(handler: () => void) {
    this.eventHandlers.focus = handler;
  }

  public onInput(handler: (value: T) => void) {
    this.eventHandlers.input = handler;
  }

  // MÉTODO PARA EJECUTAR EL HANDLER DE INPUTS
  protected triggerEvent(event: keyof typeof this.eventHandlers) {
    const handler = this.eventHandlers[event];
    if (!handler) return; // SI NO HAY HANDLER NO SEGUIR

    // SI EL EVENTO ES FOCUS
    if (event === "focus") {
      (handler as () => void)(); // => HANDLER SIN ARGUMENTO
    } else {
      // handler(this.getValue() as T | null) as T | null
      (handler as (value: T | null) => void)(this.getValue() as T | null); //=> SINO PASAR EL VALUE DE TIPO => T O NULL
    }
  }

  // protected validate(): boolean {
  //   if (this.options._isRequired) {
  //     if (this.options._value === null) return false;

  //     if (typeof this.options._value === "string" && (this.options._value as string).trim() === "") {
  //       return false;
  //     }

  //     if (this.options._value instanceof FileList && this.options._value.length === 0) {
  //       return false;
  //     }
  //   }
  //   return true;
  // }

  // protected abstract validate():void;
}