import type { IValidator } from '../../interfaces/iValidator.js';
import type { TFieldState } from '../../types/typeStateFields.js';
import { parseMontoToNumber } from '../../utils/parsedAndFormatValuesUtils.js';
import { isValueField, validateWithRegex } from '../../utils/validateFieldUtils.js';

// VALIDACION EN CAMPO PRESUPUESTO
export default class BudgeValidator implements IValidator {
  // METODO PARA VALIDAR CAMPO PRESUPUESTO
  public validate(value: string): TFieldState {
    const trimed: string = value.trim(); //QUITAR ESPACIOS INICIO Y FINAL

    // SI EL CAMPO ESTA VACIO
    if (!isValueField({ text: value })) {
      return {
        error: 'Se requiere un monto de presupuesto',
        value: trimed,
        isValid: false,
      };
    }

    const numericValue: number = parseMontoToNumber(trimed); //PARSEAR VALOR

    // SI NO ES UN NUMERO Y ES MENOR O IGUAL A CERO
    if (numericValue <= 0) {
      return {
        error: 'El valor debe ser un numero y mayor a cero.',
        value: trimed,
        isValid: false,
      };
    }

    //VALIDAR SOLO FORMATO DECIMAL
    if (!validateWithRegex({ pattern: /^\d+([.,]\d{0,3})?$/, text: trimed })) {
      return {
        error: 'El valor debe contener solo números válidos',
        value: trimed,
        isValid: false,
      };
    }

    return {
      error: '',
      value,
      isValid: true,
    };
  }
}
