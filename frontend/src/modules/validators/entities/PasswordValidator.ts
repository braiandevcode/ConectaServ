import {IValidator} from '../../../interfaces/interfaces';
import {TFieldState} from '../../../types/types';
import {isLengthValid, isValueField, validateWithRegex} from '../../../utils/domUtils.js';

// VALIDACION PARA CONTRASEÑA
export default class PasswordValidator implements IValidator {
  validate(value: string): TFieldState {
    const valueNoSpaces: string = value.trim(); //QUITAR ESPACIOS EN BLANCO AL INICIO Y FINAL

    //SI EL CAMPO ESTA VACIO
    if (!isValueField({text: valueNoSpaces})) {
      return {
        error: 'El campo no puede estar vacío',
        value: valueNoSpaces,
        isValid: false,
      };
    }

    // MINIMO 8 CARACTERES
    if (!isLengthValid({text: valueNoSpaces, num: 8})) {
      return {
        error: 'Debe tener al menos 8 caracteres',
        value: valueNoSpaces,
        isValid: false,
      };
    }

    // MINIMO UNA LETRA MAYUSCULA
    if (!validateWithRegex({pattern: /[A-Z]/, text: valueNoSpaces})) {
      return {
        error: 'Debe contener al menos una letra mayúscula',
        value: valueNoSpaces,
        isValid: false,
      };
    }

    // MINIMO UNA LETRA MINUSCULA
    if (!validateWithRegex({pattern: /[a-z]/, text: valueNoSpaces})) {
      return {
        error: 'Debe contener al menos una letra minúscula',
        value: valueNoSpaces,
        isValid: false,
      };
    }

    // AL MENOS UN NUMERO
    if (!validateWithRegex({pattern: /\d/, text: valueNoSpaces})) {
      return {
        error: 'Debe incluir al menos un número',
        value: valueNoSpaces,
        isValid: false,
      };
    }

    // AL MENOS UN SIMBOLO (CARACTER ESPECIAL)
    if (!validateWithRegex({pattern: /[!@#$%^&*(),.?":{}|<>_\-+=~`\[\]\\;]/, text: valueNoSpaces})) {
      return {
        error: 'Debe incluir al menos un símbolo',
        value: valueNoSpaces,
        isValid: false,
      };
    }

    return {error: '', value: valueNoSpaces, isValid: true};
  }
}
