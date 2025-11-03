import type { IValidator } from '../../interfaces/iValidator.js';
import type { TFieldState } from '../../types/typeStateFields.js';
import { capitalizeWords, normalizeSpaces } from '../../utils/parsedAndFormatValuesUtils.js';
import { isLengthValid, isValueField, validateWithRegex } from '../../utils/validateFieldUtils.js';

// VALIDADOR DE NOMBRE COMPLETO
export default class FullNameValidator implements IValidator {
  // METODO PARA VALIDAR CAMPO NOMBRE COMPLETO
  public validate(value: string): TFieldState {
    const trimmed: string = value; //QUITAR ESPACIOS EN BLANCO AL INICIO Y FINAL
    const normalized: string = normalizeSpaces(trimmed); //ASEGURAR  QUE PARA EL NOMBRE DE USUARIO SIEMPRE FORZAR UN SOLO TAB DE ESPACIO AUNQUE PONGA VARIOS
    const capitalized: string = capitalizeWords(normalized); // CONVERTIR PRIMERA LETRA A MAYUSCULA PARA EL NOMBRE/S Y APELLIDO

    if (!isValueField({ text: trimmed })) {
      return { error: 'El campo no puede estar vacío', value: trimmed, isValid: false }; //SI ESTA VACIO
    }

    if (!isLengthValid({ text: normalized, num: 6 })) {
      return { error: 'Debe tener al menos 6 caracteres', value: normalized, isValid: false }; // SI NO CUMPLE LA LONGITUD
    }

    //SOLO LETRAS MAYUSCULAS Y MINUSCULAS, ESPACIOS Y TILDES
    if (!validateWithRegex({ pattern: /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, text: normalized })) {
      return { error: 'Solo se permiten letras, espacios y tildes', value: normalized, isValid: false };
    }

    // VERIFICAR QUE HAY DOS PALABRAS Y QUE CADA UNA TIENE 3 O MAS CARACTERES EN LA CADENA
    const isValidFullName = (text: string): boolean => {
      const normalized: string = normalizeSpaces(text);
      const parts: string[] = normalized.split(' '); //POR CADA ESPACIO UNA POSICION DE ARRAY
      
      // VERIFICA SI LA LONGITUD ES MAYOR O IGUAL A 2 Y QUE CADA ELEMENTO DE PALABRA SEA MAYO O IGUAL A 3
      return parts.length >= 2 && parts.every((part) => part.length >= 3);
    };

    // SI LAS PARTES SON MENOR A 2 O DE LAS PARTES SU LONGITUD ES MENOR A 3 CARACTERES
    if (!isValidFullName(trimmed.trim())) {
      return { error: 'Debe tener al menos dos palabras con mínimo 3 letras cada una', value: normalized, isValid: false };
    }

    return { error: '', value: capitalized, isValid: true };
  }
}
