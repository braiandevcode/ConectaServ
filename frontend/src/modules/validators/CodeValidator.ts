import type { IValidator } from '../../interfaces/iValidator.js';
import type { TFieldState } from '../../types/typeStateFields.js';
import { isValueField, validateWithRegex } from '../../utils/validateFieldUtils';

// VALIDAR CODIGO
export default class CodeValidator implements IValidator {
  public validate(value: string): TFieldState {
    const valueNoSpaces: string = value.trim();

    if (!isValueField({ text: valueNoSpaces })) {
      return {
        value: value,
        error: 'Codigo requerido',
        isValid: false,
      } as TFieldState;
    }

    // SI NO ES UN NUMERO
    if (!validateWithRegex({ pattern: /^[0-9]+$/, text: valueNoSpaces })) {
      return {
        value: value,
        error: 'No valido, Debe ser un número',
        isValid: false,
      } as TFieldState;
    }

    // SI TIENE LA LONGITUD NO ES 6
    if (valueNoSpaces.length !== 6) {
      return {
        value: value,
        error: 'El número debe tener 6 dígitos.',
        isValid: false,
      } as TFieldState;
    }

    // SINO
    return {
      value: valueNoSpaces,
      error: '',
      isValid: true,
    } as TFieldState;
  }
}
