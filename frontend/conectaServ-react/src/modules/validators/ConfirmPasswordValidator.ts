import type { IValidator } from "../../interfaces/interfaces";
import type { TFieldState } from "../../types/types";
import { isValueField } from "../../utils/validateFieldUtils";

// VALIDAR CONFIRMACION
export default class ConfirmPasswordValidator implements IValidator {
   public validate(value: string): TFieldState {
    const valueNoSpaces: string = value.trim();

    if (!isValueField({text: valueNoSpaces})) {
      return {
        error: 'El campo no puede estar vacío',
        value: '*',
        isValid: false,
      };
    }
    
    return {error: '', value: '**', isValid: true};
  }
}
