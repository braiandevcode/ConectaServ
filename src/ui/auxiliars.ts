import toggleClassElement from "./toggleClassElement.js";

// FUNCIONES AUXILIARES PARA MOSTRAR Y OCULTAR SECCIONES
export const show = ({ $el, cls }: { $el: HTMLElement | null, cls: string[] }): void => {
  if ($el) toggleClassElement({ container: $el, className: [...cls], isRemoveClass: true });
};

export const hide = ({ $el, cls }: { $el: HTMLElement | null, cls: string[] }): void => {
  if ($el) toggleClassElement({ container: $el, className: [...cls], isRemoveClass: false });
};

// FUNCION QUE NOS PERMITA FILTRAR EL VALOR DEL NAME Y REFERENCIAR AL data-message SEGUN EL VALOR DEL NAME
export const getContainerByInputName = (name: string): HTMLElement | null => {
  return document.querySelector(`[data-message="${name}"]`);
};

// ----------------------------------------------AUXILIARES PARA VALIDACION DE CAMPOS-------------------------------------------//

//-----------------------------FUNCIONES REUTILIZABLES PARA VALIDAR---------------------------------------------------------//
export const isLengthValid = ({ text, num }: { text: string, num: number }): boolean => text.length >= num; // SI ES MAYOR O IGUAL AL NUMERO DE CARACTERES QUE SE LE PASE

// FUNCION PARA VALIDAR UNA EXPRESION REGULAR DINAMICAMENTE
export const validateWithRegex = ({ pattern, text }: { pattern: RegExp, text: string }): boolean => {
  return pattern.test(text);
};

// SI UN CAMPO TIENE CONTENIDO
export const isValueField = ({ text }: { text: string }): boolean => text !== "";


export const normalizeSpaces = (str: string): string => str.replace(/\s+/g, ' ');  //QUITAR TODOS LOS ESPACIOS DEL TABULADOR Y RESETEAR UN SOLO TAB DE ESPACIO

// SEPARAR LA CADENA POR ESPACIOS
// MAPEAR, CREAR NUEVO ARREGLO DONDE CADA PALABRA O CADENA EN SU INDICE 0(PRIMER CARACTER) SEA MAYUSCULAS Y EL RESTO MINUSCULAS ["lucas", "gonzales"] => ["Lucas", "Gonzales"]
// UNIR CON join() generando una sola cadena "Lucas Gonzales".
export const capitalizeWords = (str: string): string => str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

//----------------------------------------------FUNCIONES DE PARSEOS Y FORMATO DE NUMEROS---------------------------------------//
// FUNCION PARA PARSEAR MONTO
// CONVERTIR A NUMERO FLOTANTE CON DECIMALES Y REEMPLAZA DE FORMA GLOBAL(ES DECIR RECORRE TODO EL TEXTO LA EXPREXION REGULAR) UN NUMERO COMO  1000 A 1000.00
export const parseMontoToNumber = (value: string): number => {
  return parseFloat(value.replace(/\./g, '').replace(',', '.')) || 0;
};

// FUNCION PARA FORMATEAR VISUALMENTE COMO "10.000,00"
export const formatMontoOnlyNumber = (value: string): string => {
  const numericValue = typeof value === 'number' ? value : parseMontoToNumber(value); // PARSEAR EL VALOR SI NO ES TIPO NUMERO
  if (isNaN(numericValue)) return ''; //SI EL VALOR ES NO UN NUMERO VALIDO RETORNAR CADENA VACIA

  return numericValue.toLocaleString('es-ES', {
    minimumFractionDigits: 2, //FRACCION MINIMA DE DIGITOS
    maximumFractionDigits: 2 //FRACCION MAXIMA DE DIGITOS
  });
};


// --------------------AUXILIAR PARA FORMATEAR TEXTO TIPO TEXTAREA--------------------------//
/* 
  -PRIMERA LETRA EN MAYÚSCULA.

  -MAYÚSCULA DESPUÉS DE ., ! O ?, SIN IMPORTAR CUÁNTOS ESPACIOS O TABS HAYA.

  -TODO EL RESTO EN MINÚSCULA.

  -ESPACIOS EXTRAS AUTOMÁTICAMENTE NORMALIZADOS A UNO SOLO DESPUÉS DE LOS SIGNOS.
*/
export const formatDescription = (text: string): string => {
  // SI EL TEXTO ESTÁ VACIO O SOLO CONTIENE ESPACIOS, RETORNAR VACÍO
  if (!text || text.trim().length === 0) return "";


  let formatted: string = text
    .toLowerCase()
    .replace(/\t+/g, ' ')                 // REEMPLAZA TABS POR UN ESPACIO
    .replace(/\s{2,}/g, ' ')              //REEMPLAZA MULTIPLES ESPACIOS POR UNO SOLO
    .replace(/\s*([.!?])\s*/g, '$1 ')     // Elimina espacios antes de signos y deja solo uno después  ELIMINA ESPACIOS ANTES DE UN SIGNO Y DEJA SOLO UNO DESPUES
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


// INVESTIGADO
// - es-ES: ES EL LOCALE PARA ESPAÑOL ARGENTINA
// - style: 'currency': LE INDICA QUE ES UN FORMATO MONETARIO
// - currency: 'ARS': EL TIPO DE MONEDA (PESOS ARGENTINOS).
// -  minimumFractionDigits / maximumFractionDigits:ASEGURA QUE SIEMPRE HAY 2 DECIMALES.
// FUNCION PARA FORMATEAR CON SIMMBOLO "ARS"
export const formatMontoWithCurrency = (value: string | number): string => {
  const numericValue = typeof value === 'number' ? value : parseMontoToNumber(value);
  if (isNaN(numericValue)) return '';
  return numericValue.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

// -----------------------AUXILIAR PARA CONVERTIR MEGABYTES  A BYTES----------------------------------------//
export const convertBytes = (value: number): number => value * 1024 * 1024;

//------------------ AUXILIAR PARA BOTON NEXT Y SIGUIENTE FORMULARIO REGISTRO----------------------------

// FUNCION PARA OBTENER UNA SECCION DEL FORMULARIO SEGUN EL PASO
export const getStepSection = (step: number): HTMLDivElement | null => document.querySelector(`.form-step[data-step="${step}"]`);

// FUNCION PARA VERIFICAR SI ESTA EN EL PASO DE CATEGORIA 3
export const isCategoryStep = (step: number, select: HTMLSelectElement | null): boolean => step === 3 && select !== null;

// VALIDAR QUE TODOS LOS CHECKBOXES DE LOS GRUPOS REQUERIDOS ESTAN SELECCIONADOS SEGUN CONTEXTO
export const groupEveryGroupHasChecked = ({ groupNames }: { groupNames: string[] }): boolean => {
  return groupNames.every(name => {
    const inputs = Array.from(document.querySelectorAll<HTMLInputElement>(`input[type="checkbox"][name="${name}"]`));
    return inputs.some(input => input.checked);
  });
};