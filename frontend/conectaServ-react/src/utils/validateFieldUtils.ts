// IMPORTACIONES
import { EFieldType } from '../types/enums.js';
import type { TFieldType, TStoredImage } from '../types/types';

// ----------------METODOS AUXILIARES PARA FOMULARIOS--------------------//
// SI UN CAMPO TIENE CONTENIDO
export const isValueField = ({ text }: { text: string }): boolean => text.trim() !== '';

export const isLengthValid = ({ text, num }: { text: string; num: number }): boolean => text.trim().length >= num; // SI ES MAYOR O IGUAL AL NUMERO DE CARACTERES QUE SE LE PASE

// FUNCION PARA VALIDAR UNA EXPRESION REGULAR DINAMICAMENTE
export const validateWithRegex = ({ pattern, text }: { pattern: RegExp; text: string }): boolean => {
  return pattern.test(text);
};

// METODO PARA VALIDAR EL TIPO DE INPUT
export const isValidInputType = (type: string): type is TFieldType => {
  return Object.values(EFieldType).includes(type as EFieldType); //SI EN LOS PARES CLAVE VALOR INCLUYE EL STRING QUE SE LE PASA => TRUE
};

//ASEGURO DE QUE SI EXISTE EL OBJETO Y NO ESTA VACIO ES TRUE ==> SINO FALSE
export const verifyMetaDataImage = (imgObj: TStoredImage | null): boolean => Boolean(imgObj && Object.keys(imgObj).length > 0);

export const verifyDataObject = (obj:unknown): boolean => Boolean(obj && Object.keys(obj).length > 0);
