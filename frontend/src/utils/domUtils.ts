// IMPORTACIONES
import { TFieldType, TIdString, TStoredImage } from '../types/types';
import { EFieldType } from '../types/enums.js';

import { TITLES_GROUP_CHECKS_MAP } from '../config/constant.js';

// FUNCION QUE SEGUN EL TIPO EN EL MAPEO RETORNA UN TEXTO PARA EL ELEMNTO DEL DOM
export const convertTextOfTypes = ({ textType }: { textType: string }): string => {
  return TITLES_GROUP_CHECKS_MAP[textType] || 'Grupo';
};

// FUNCION QUE RETORNA UN OBJETO CON UNA PROMESA
export const fileToStoredImage = async (file: File): Promise<TStoredImage> => {
  const { name, size, type } = file; //DESESTRUCTURAMOS OBJETO DE FILE
  const idImage: TIdString = crypto.randomUUID(); //ID UNICA DE IMAGEN

  // LEER COMO BASE64 Y GUARDAR EN IndexedDB
  await new Promise<string>((res, rej) => {
    //INSTANCIAR LA PROMESA
    const r = new FileReader(); //INSTANCIAR CONSTRUCTO FileReader
    r.onload = () => res(String(r.result)); //ESCUCHAR EVENTO onload Y EJECUTAR CALLBACK, SI TODO FUE BIEN OBTENER EL "result"
    r.onerror = rej; //SI HAY ERROR reject
    r.readAsDataURL(file); //POR ULTIMO LEER EL file
  });

  // DEVOLVER OBJETO SIN dataUrl
  return { name, size, type, idImage };
};

// HELPER PARA ASIGNAR ATRIBUTOS DE DE OBJETO QUE SE LE PASA
export const attrFilled = (element: HTMLElement, attrs: Record<string, string | number | boolean>): void => {
  Object.entries(attrs).forEach(([key, value]) => {
    element.setAttribute(key, String(value));
  });
};

// --------------------AUXILIAR PARA FORMATEAR TEXTO TIPO TEXTAREA--------------------------//
/* 
  -PRIMERA LETRA EN MAYUSCULA.

  -MAYÚSCULA DESPUeS DE ., ! O ?, SIN IMPORTAR CUANTOS ESPACIOS O TABS HAYA.

  -TODO EL RESTO EN MINUSCULA.

  -ESPACIOS EXTRAS AUTOMATICAMENTE NORMALIZADOS A UNO SOLO DESPUES DE LOS SIGNOS.
*/
export const formatTextArea = (text: string): string => {
  // SI EL TEXTO ESTÁ VACIO O SOLO CONTIENE ESPACIOS, RETORNAR VACÍO
  if (!text || text.trim().length === 0) return '';

  let formatted: string = text
    .toLowerCase()
    .replace(/\t+/g, ' ') // REEMPLAZA TABS POR UN ESPACIO
    .replace(/\s{2,}/g, ' ') //REEMPLAZA MULTIPLES ESPACIOS POR UNO SOLO
    .replace(/\s*([.!?])\s*/g, '$1 ') //ELIMINA ESPACIOS ANTES DE UN SIGNO Y DEJA SOLO UNO DESPUES
    .trim();

  // CAPITALIZAR LA PRIMERA LETRA DEL TEXTO
  formatted = formatted[0].toUpperCase() + formatted.slice(1);

  // CAPITALIZAR LA LETRA DESPUES DE UN PUNTO, SIGNO DE EXCLAMACION O INTERROGACION,
  // SIN IMPORTAR CUÁNTOS ESPACIOS O TABS HAYA DESPUÉS DEL SIGNO
  formatted = formatted.replace(/([.!?])([\s]*)(\w)/g, (_, signo, __, letra) => {
    return `${signo} ${letra.toUpperCase()}`;
  });

  // RETORNAR EL TEXTO FORMATEADO
  return formatted;
};

// ----------------METODOS AUXILIARES PARA FOMULARIOS--------------------//
// SI UN CAMPO TIENE CONTENIDO
export const isValueField = ({ text }: { text: string }): boolean => text.trim() !== '';

export const isLengthValid = ({ text, num }: { text: string; num: number }): boolean => text.length >= num; // SI ES MAYOR O IGUAL AL NUMERO DE CARACTERES QUE SE LE PASE

// FUNCION PARA VALIDAR UNA EXPRESION REGULAR DINAMICAMENTE
export const validateWithRegex = ({ pattern, text }: { pattern: RegExp; text: string }): boolean => {
  return pattern.test(text);
};

// METODO PARA VALIDAR EL TIPO DE INPUT
export const isValidInputType = (type: string): type is TFieldType => {
  return Object.values(EFieldType).includes(type as EFieldType); //SI EN LOS PARES CLAVE VALOR INCLUYE EL STRING QUE SE LE PASA => TRUE
};
