import { actionClassString } from "../../../../../ui/auxiliars.js";
import { TFormElement } from "../../../../../types/types";

// MODULO RESPONSABLE DE ESTADOS Y COMPORTAMIENTOS EN UI MEDIANTE VALIDACIONES
export default class FormFieldValidationUI {
  constructor() {}

  // HABILITAR
  public enableField(element: TFormElement): void {
    element.removeAttribute("disabled");
  }

  // DESHABILITAR
  public disableField(element: TFormElement): void {
    element.setAttribute("disabled", "true");
  }

  public disabledBtn(element: HTMLButtonElement): void {
    if (!(element instanceof HTMLButtonElement)) return;
    element.setAttribute("disabled", "true");
  }

  public enabledBtn(element: HTMLButtonElement): void {
    if (!(element instanceof HTMLButtonElement)) return;
    element.removeAttribute("disabled");
  }

  // MOSTRAR ERROR EN CAMPOS
  public showError(element: TFormElement, message: string): void {
    element.classList.add("is-invalid");
    const parent = element.closest("[data-message]");
    const span = parent?.querySelector(".containerMsgError .has-error") as HTMLSpanElement;
    if (span) span.textContent = message;
  }

  // QUITAR ERROR EN CAMPOS
  public clearError(element: TFormElement): void {
    element.classList.remove("is-invalid", "is-valid");
    const parent = element.closest("[data-message]");
    const span = parent?.querySelector(".containerMsgError .has-error") as HTMLSpanElement;
    if (span) span.textContent = "";
  }

  public errorToggle(element: TFormElement, isValid: boolean, messageError: HTMLSpanElement, error: string): void {
    this.errorBorderStyleToggle(element, isValid);
    messageError.textContent = isValid ? "" : error;
  }

  // APLICAR O NO EL ESTILO DEL BORDE A INPUT ELEMENTO
  public errorBorderStyleToggle(element: TFormElement, isValid: boolean): void {
    element.classList.toggle("is-valid", isValid);
    element.classList.toggle("is-invalid", !isValid);
  }

  // METODO QUE AÑADE ESTILO DE FOCO A INPUT
  public focusStyleBorder(element: TFormElement): void {
    actionClassString("is-focus", "add", element);
  }

  // REMOVER CLASES
  public resetBorder(element: TFormElement): void {
    actionClassString("is-valid", "remove", element); //==> APROVECHO HELPER
    actionClassString("is-invalid", "remove", element); //==> APROVECHO HELPER
    actionClassString("is-focus", "remove", element);
  }
}
