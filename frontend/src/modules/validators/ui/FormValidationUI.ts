import { TFormElement } from "../../../types/types";

// MODULO RESPONSABLE DE ESTADOS Y COMPORTAMIENTOS EN UI MEDIANTE VALIDACIONES
export default class FormValidationUI {
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

  public clearErrorToggle(element: TFormElement, isValid: boolean, messageError: HTMLSpanElement, error: string): void {
    element.classList.toggle("is-valid", isValid);
    element.classList.toggle("is-invalid", !isValid);
    messageError.textContent = isValid ? "" : error;
  }

  public clearErrorToggleEmptyMessage(element: TFormElement, isValid: boolean): void {
    element.classList.toggle("is-valid", isValid);
    element.classList.toggle("is-invalid", !isValid);
  }
}