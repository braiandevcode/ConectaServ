import { ECategoryKey, ELocationKey } from '../types/enums';
import type { iFormStateValidationClient } from '../interfaces/iFormStateValidationClient';
import type { TFieldState } from '../types/typeStateFields';
import type { iFormStateLogin } from '../interfaces/iFormStateLogin';
import type { ReactNode } from 'react';
import type { iFomrValidationVerifyEmail } from '../interfaces/iFormValidationVerifyEmail';
import type { iFormStateValidationTask } from '../interfaces/iFormStateValidationTask';


// FUNCION QUE, DADO EL NOMBRE DE UN CAMPO, DEVUELVE LA CLASE CSS DEL BORDE DEL INPUT
export const styleBorderFieldError = <T extends iFormStateLogin | iFomrValidationVerifyEmail | iFormStateValidationTask | iFormStateValidationClient>(formState: T, fieldName: keyof T): string => {
  // OBTIENE EL ESTADO DEL CAMPO DESDE FORMSTATE (CASTEA EL NOMBRE PARA QUE TYPESCRIPT ACEPTE LA INDEXACIÓN)

  // FUERZO A  TS A ENTENDER QUE CADA VALOR DEL formState SIGUE LA FORMA BASE
  const fieldState = formState[fieldName] as TFieldState;
  
  // SI NO EXISTE EL ESTADO DEL CAMPO, DEVUELVE CADENA VACÍA
  if (!fieldState) return '';
  /*
  - O SIE EL VALOR DEL CAMPO ES ECategoryKey.NONE O ELocationKey.NONE, retorna VACIO.
  */
  if (fieldState.value === ECategoryKey.NONE || fieldState.value === ELocationKey.NONE) return '';

  // CASO GENERAL
  //   - DEVUELVE 'IS-VALID' => SI EL CAMPO ES VALIDO
  //   - DEVUELVE 'IS-INVALID' => SI EL CAMPO NO ES VÁLIDO
  // SI EL CAMPO ESTÁ VACÍO, DEVUELVE CADENA VACIA
  return fieldState.value ? (fieldState.isValid ? 'is-valid' : 'is-invalid') : '';
};

// FUNCION QUE, DADO EL NOMBRE DE UN CAMPO, DEVUELVE EL MENSAJE DE ERROR SI EL CAMPO ES INVALIDO
export const renderFieldError = <T extends iFormStateLogin | iFomrValidationVerifyEmail | iFormStateValidationTask | iFormStateValidationClient>(formState: T, fieldName: keyof T): ReactNode | null => {
  // OBTIENE EL ESTADO DEL CAMPO DESDE FORMSTATE

  // FUERZO A  TS A ENTENDER QUE CADA VALOR DEL formState SIGUE LA FORMA BASE
  const fieldState = formState[fieldName] as TFieldState;

  // SI NO EXISTE EL ESTADO DEL CAMPO, NO RENDERIZA NADA
  if (!fieldState) return null;

  // CASO GENERAL: SI EL CAMPO ES VALIDO O ESTA VACIO => NO RENDERIZA NADA
  if (fieldState.isValid || fieldState.value === '') return null;

  // SI EL CAMPO ES INVALIDO, DEVUELVE EL CONTENEDOR CON EL MENSAJE DE ERROR
  return (
    <div className={fieldName === 'emailCode' ? 'text-center' : ''}>
      <span className='has-error'>{fieldState.error}</span>
    </div>
  );
};
