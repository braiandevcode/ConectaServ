import type { IValidator } from '../../interfaces/iValidator.js';
import type { TFieldState } from '../../types/typeStateFields.js';
import { isLengthValid, isValueField} from '../../utils/validateFieldUtils.js';

// VALIDACION DESCRIPCION (TEXTAREA)
export default class DescriptionValidator implements IValidator {
  public validate(value: string): TFieldState {
    // SI ESTA VACIO PERMITIR SIN VALOR PORQUE ES OPCIONAL
    if (!isValueField({text: value.trim()})) {
      return {error: '', value: '', isValid: true};
    }

    // SI ES MAYOR A 350 CARACTERES
    if (isLengthValid({text: value, num: 351})) {
      return {
        error: 'Has excedido el limite de 350 caracteres.',
        value: value,
        isValid: false,
      };
    }

    return {error: '', value: value, isValid: true};
  }
}
