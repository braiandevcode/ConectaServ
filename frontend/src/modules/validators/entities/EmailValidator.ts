import {IValidator} from '../../../interfaces/interfaces';
import {TFieldState} from '../../../types/types';
import {isLengthValid, isValueField, validateWithRegex} from '../../../utils/domUtils.js';

// VALIDADOR DE EMAIL
export default class EmailValidator implements IValidator {
  public validate(value: string): TFieldState {
    const valueNoSpaces: string = value.trim(); //QUITAR ESPACIOS EN BLANCO AL INICIO Y FINAL
    const safeEmailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|hotmail\.com)$/i; //EXPRESION PARA EMAIL FORMA MAS SEGURA DE EMAILS

    //SI EL CAMPO ESTA VACIO
    if (!isValueField({text: valueNoSpaces})) {
      return {
        error: 'El campo no puede estar vacío',
        value: valueNoSpaces,
        isValid: false,
      };
    }

    // VALIDAR LONGITUD MINIMA 6 CARACTERES
    if (!isLengthValid({text: valueNoSpaces, num: 6})) {
      return {
        error: 'Debe tener al menos 6 caracteres',
        value: valueNoSpaces,
        isValid: false,
      };
    }

    // VALIDAR FORMATO DE EMAIL VALIDO
    if (!validateWithRegex({pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, text: valueNoSpaces})) {
      return {
        error: 'Debe ser un correo válido',
        value: valueNoSpaces,
        isValid: false,
      };
    }

    // VALIDAR EMAILS PERMITIDOS
    if (!validateWithRegex({pattern: safeEmailRegex, text: valueNoSpaces.toLowerCase()})) {
      return {
        error: 'Solo se permiten correos de gmail, outlook o hotmail',
        value: valueNoSpaces,
        isValid: false,
      };
    }

    return {error: '', value: valueNoSpaces.toLocaleLowerCase(), isValid: true};
  }
}
