import type { IValidator } from '../../interfaces/iValidator.js';
import type { TFieldState } from '../../types/typeStateFields.js';
import { isLengthValid, isValueField, validateWithRegex } from '../../utils/validateFieldUtils';

// VALIDACION PARA NOMBRE DE USUARIO
export default class UserNameValidator implements IValidator {
  public validate(value: string): TFieldState {
    const valueNoSpaces: string = value.trim(); //QUITAR ESPACIOS EN BLANCO AL INICIO Y FINAL

    //SI EL CAMPO ESTA VACIO
    if (!isValueField({ text: valueNoSpaces })) {
      return {
        error: 'El campo no puede estar vacío',
        value: valueNoSpaces,
        isValid: false,
      };
    }

    // VALIDAR QUE NO SEA MENOR A 4 CARACTERES EN TOTAL
    if (!isLengthValid({ text: valueNoSpaces, num: 4 })) {
      return {
        error: 'Debe tener al menos 4 caracteres',
        value: valueNoSpaces,
        isValid: false,
      };
    }

    // SI EN TODA LA CADENA DEL NOMBRE DE USUARIO CONTIENE ALGUN ESPACIADO/TAB => ERROR
    if (validateWithRegex({ pattern: /\s/, text: valueNoSpaces })) {
      return {
        error: 'El nombre de usuario no puede contener espacios',
        value: valueNoSpaces,
        isValid: false,
      };
    }

    // SOLO LETRAS mayusculas/minusculas, NUMEROS, PUNTOS(.),Y GUIONES BAJOS (_), 
    if (!validateWithRegex({ pattern: /^[a-zA-Z0-9._]+$/, text: valueNoSpaces })) {
      return {
        error: 'Solo letras, números, puntos y guiones bajos permitidos.',
        value: valueNoSpaces,
        isValid: false,
      };
    }

    // QUE NO COMIENCE CON PUNTO(.) O UN GUION BAJO (_).
    if (validateWithRegex({ pattern: /^(\.|_)/, text: valueNoSpaces })) {
      return {
        error: 'No puede comenzar ni terminar con "." o "_"',
        value: valueNoSpaces,
        isValid: false,
      };
    }

    // QUE NO CONTENGA DOS PUNTOS CONSECUTIVOS(..)
    if (validateWithRegex({ pattern: /(\.\.)/, text: valueNoSpaces })) {
      return {
        error: 'No puede contener puntos ".." consecutivos',
        value: valueNoSpaces,
        isValid: false,
      };
    }

    // QUE NO CONTENGA TRES GUIONES BAJOS CONSECUTIVOS (___) AL FINAL
    if (validateWithRegex({ pattern: /(___)$/, text: valueNoSpaces })) {
      return {
        error: 'No puede contener mas de 2 guiones bajos "__" consecutivos al final',
        value: valueNoSpaces,
        isValid: false,
      };
    }

    return { error: '', value: valueNoSpaces, isValid: true };
  }
}
