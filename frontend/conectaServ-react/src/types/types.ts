// IMPORTACIONES
import { EFieldType, EKeyDataByStep } from './enums.js';


export type TFormRole = 'professional' | 'client';

// ----------------TIPADOS PARA DIFERENTES VALIDACIONES DE CAMPOS---------------------//
// export type TFieldName = keyof iFormStateValidation;

//---------------------CONFIGUARACION DE TIPADO PARA FORMULARIO DE REGISTRO------------------------//

// SOLO PARA CAMPOS DE TEXTO DEL ULTIMO PASO
export type TBasicFieldNames = 'fullName' | 'userName' | 'email' | 'password' | 'confirmPassword';

export type TFieldType = `${EFieldType}`; //ESTO ASEGURA QUE TFieldType SEA EXACTAMENTE UNO DE LOS VALORES DEL ENUM (Y NO SUS CLAVES).

// TIPO SEGUN VALOR DE CADA CLAVE DE ENUM DE PASOS
export type TStep = `${EKeyDataByStep}`;
