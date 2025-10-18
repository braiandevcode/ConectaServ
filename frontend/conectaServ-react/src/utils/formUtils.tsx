import type React from 'react';
import { ECategoryKey, ELocationKey } from '../types/enums';
import type { iFormStateValidationPro } from '../interfaces/iFormStateValidationPro';
import type { iFormStateValidationClient } from '../interfaces/iFormStateValidationClient';
import type { TFieldState } from '../types/typeStateFields';
import type { iFormStateLogin } from '../interfaces/iFormStateLogin';


// FUNCION QUE, DADO EL NOMBRE DE UN CAMPO, DEVUELVE LA CLASE CSS DEL BORDE DEL INPUT
export const styleBorderFieldError = <T extends iFormStateLogin | iFormStateValidationPro | iFormStateValidationClient>(formState: T, fieldName: keyof T): string => {
  // OBTIENE EL ESTADO DEL CAMPO DESDE FORMSTATE (CASTEA EL NOMBRE PARA QUE TYPESCRIPT ACEPTE LA INDEXACIÓN)

  // FUERZO A  TS A ENTENDER QUE CADA VALOR DEL formState SIGUE LA FORMA BASE
  const fieldState = formState[fieldName] as TFieldState;

  // SI NO EXISTE EL ESTADO DEL CAMPO, DEVUELVE CADENA VACÍA
  if (!fieldState) return '';
  /*
  - SI EL CAMPO ES  password o confirmPassword Y SU VALOR ESTA VACIO retorna VACIO.
  - O SIE EL VALOR DEL CAMPO ES ECategoryKey.NONE O ELocationKey.NONE, retorna VACIO.

  ((fieldName === 'password' || fieldName === 'confirmPassword') && !(fieldState.value as string)?.trim())
  */
  if (fieldState.value === ECategoryKey.NONE || fieldState.value === ELocationKey.NONE) return '';

  // CASO GENERAL
  //   - DEVUELVE 'IS-VALID' => SI EL CAMPO ES VALIDO
  //   - DEVUELVE 'IS-INVALID' => SI EL CAMPO NO ES VÁLIDO
  // SI EL CAMPO ESTÁ VACÍO, DEVUELVE CADENA VACIA
  return fieldState.value ? (fieldState.isValid ? 'is-valid' : 'is-invalid') : '';
};

// FUNCION QUE, DADO EL NOMBRE DE UN CAMPO, DEVUELVE EL MENSAJE DE ERROR SI EL CAMPO ES INVALIDO
export const renderFieldError = <T extends iFormStateLogin | iFormStateValidationPro | iFormStateValidationClient>(formState: T, fieldName: keyof T): React.ReactNode | null => {
  // OBTIENE EL ESTADO DEL CAMPO DESDE FORMSTATE

  // FUERZO A  TS A ENTENDER QUE CADA VALOR DEL formState SIGUE LA FORMA BASE
  const fieldState = formState[fieldName] as TFieldState;

  // SI NO EXISTE EL ESTADO DEL CAMPO, NO RENDERIZA NADA
  if (!fieldState) return null;

  // CASO GENERAL: SI EL CAMPO ES VALIDO O ESTA VACIO => NO RENDERIZA NADA
  if (fieldState.isValid || fieldState.value === '') return null;

  // SI EL CAMPO ES INVALIDO, DEVUELVE EL CONTENEDOR CON EL MENSAJE DE ERROR
  return (
    <div>
      <span className='has-error'>{fieldState.error}</span>
    </div>
  );
};
