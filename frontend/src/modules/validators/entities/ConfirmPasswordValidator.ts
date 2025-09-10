import { formStateValidField } from "../../../config/constant.js";
import { IValidator } from "../../../interfaces/interfaces";
import { TFieldState } from "../../../types/types";
import { isValueField } from "../../../utils/domUtils.js";

// VALIDAR CONFIRMACION
export default class ConfirmPasswordValidator implements IValidator {
  validate(value: string): TFieldState {
    const valueNoSpaces: string = value.trim();

    if (!isValueField({ text: valueNoSpaces })) {
      return {
        error: "El campo no puede estar vacío",
        value: valueNoSpaces,
        isValid: false,
      };
    }

    // FORZAR QUE SEA STRING O VACIO SI ES NULO O INDEFINIDO
    const passwordValueRaw = formStateValidField.password.value;
    const passwordValue: string = (typeof passwordValueRaw === "string" ? passwordValueRaw : "").trim();

    if (valueNoSpaces !== passwordValue) {
      return {
        error: "Las contraseñas no coinciden",
        value: valueNoSpaces,
        isValid: false,
      };
    }

    return { error: "", value: valueNoSpaces, isValid: true };
  }
}