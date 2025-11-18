import type { IValidator } from '../../interfaces/iValidator.js';
import type { TFieldState } from '../../types/typeStateFields.js';
import { isLengthValid, isValueField, validateWithRegex } from "../../utils/validateFieldUtils";

// VALIDACION PARA CONTRASEÑA
export default class PasswordValidator implements IValidator {
  validate(value: string): TFieldState {
    const valueNoSpaces: string = value.trim(); //QUITAR ESPACIOS EN BLANCO AL INICIO Y FINAL

    //SI EL CAMPO ESTA VACIO
    if (!isValueField({text: valueNoSpaces})) {
      return {
        error: 'El campo no puede estar vacío',
        value: '*',
        isValid: false,
      };
    }

    // MINIMO 8 CARACTERES
    if (!isLengthValid({text: valueNoSpaces, num: 8})) {
      return {
        error: 'Debe tener al menos 8 caracteres',
        value: '*',
        isValid: false,
      };
    }

    // MINIMO UNA LETRA MAYUSCULA
    if (!validateWithRegex({pattern: /[A-Z]/, text: valueNoSpaces})) {
      return {
        error: 'Debe contener al menos una letra mayúscula',
        value: '*',
        isValid: false,
      };
    }

    // MINIMO UNA LETRA MINUSCULA
    if (!validateWithRegex({pattern: /[a-z]/, text: valueNoSpaces})) {
      return {
        error: 'Debe contener al menos una letra minúscula',
        value: '*',
        isValid: false,
      };
    }

    // AL MENOS UN NUMERO
    if (!validateWithRegex({pattern: /\d/, text: valueNoSpaces})) {
      return {
        error: 'Debe incluir al menos un número',
        value: '*',
        isValid: false,
      };
    }

    // AL MENOS UN SIMBOLO (CARACTER ESPECIAL)
    if (!validateWithRegex({pattern: /[!@#$%^&*(),.?":{}|<>_\-+=~`\[\]\\;]/, text: valueNoSpaces})) {
      return {
        error: 'Debe incluir al menos un símbolo',
        value: '*',
        isValid: false,
      };
    }
       

    return {error: '', value: '**', isValid: true};
  }
}
