//----------------------------------------------FUNCIONES DE PARSEOS Y FORMATO DE NUMEROS---------------------------------------//
// FUNCION PARA PARSEAR MONTO
export const parseMontoToNumber = (value: string): number => {
  const v:string = value.trim();

  // SI TIENE COMA ==> LA COMA ES DECIMAL Y LOS PUNTOS SON MILES
  if (v.includes(',')) {
    return parseFloat(v.replace(/\./g, '').replace(',', '.')) || 0;
  }

  // SI NO HAY COMA Y HAY SOLO UN PUNTO ==> PUNTO DECIMAL.
  const parts:string[] = v.split('.');
  // SI LA LONGITUD ES 2 ES PORQUE SOLO HAY UN PUNTO
  if (parts.length === 2) {
    return parseFloat(v) || 0;
  }

  // SI HAY VARIOS PUNTOS  ==> PUNTOS DE MILES DECIMAL NO EXISTE
  if (parts.length > 2) {
    return parseFloat(v.replace(/\./g, '')) || 0;
  }

  // SINO GENERAL
  return parseFloat(v) || 0;
};

// FUNCION PARA PARSEAR DATOS DE LA DB (FFORMATO INTERNACIONAL 1000.00)
export const parseDbMonto = (value: string): number => {
  return parseFloat(value) || 0;
};

// FUNCION BASE:SIEMPRE ES es-AR
export const formatNumberBase = (numericValue: number, style: 'decimal' | 'currency' = 'decimal', currency = 'ARS'): string => {
  if (isNaN(numericValue)) return '';

  return numericValue.toLocaleString('es-AR', {
    // ¡Usamos SIEMPRE es-AR!
    style: style,
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

// INVESTIGADO
// - es-AR: ES EL LOCALE PARA ESPAÑOL ARGENTINA
// - style: 'currency': LE INDICA QUE ES UN FORMATO MONETARIO
// - currency: 'ARS': EL TIPO DE MONEDA (PESOS ARGENTINOS).
// -  minimumFractionDigits / maximumFractionDigits:ASEGURA QUE SIEMPRE HAY 2 DECIMALES.
// FUNCION PARA FORMATEAR CON SIMMBOLO "ARS"
export const formatMontoWithCurrency = (value: string | number): string => {
  const numericValue = typeof value === 'number' ? value : parseMontoToNumber(value);
  return formatNumberBase(numericValue, 'currency');
};

// FUNCION PARA FORMATEAR VISUALMENTE COMO "10.000,00"
export const formatMontoOnlyNumber = (value: string | number): string => {
  const numericValue = typeof value === 'number' ? value : parseMontoToNumber(value);
  return formatNumberBase(numericValue, 'decimal');
};

// -----------------------AUXILIAR PARA CONVERTIR MEGABYTES A BYTES----------------------------------------//
export const convertBytes = (value: number): number => value * 1024 * 1024;

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

export const normalizeSpaces = (str: string): string => str.replace(/\s+/g, ' '); //QUITAR TODOS LOS ESPACIOS DEL TABULADOR Y RESETEAR UN SOLO TAB DE ESPACIO

// SEPARAR LA CADENA POR ESPACIOS
// MAPEAR, CREAR NUEVO ARREGLO DONDE CADA PALABRA O CADENA EN SU INDICE 0(PRIMER CARACTER) SEA MAYUSCULAS Y EL RESTO MINUSCULAS ["lucas", "gonzales"] => ["Lucas", "Gonzales"]
// UNIR CON join() generando una sola cadena "Lucas Gonzales".
export const capitalizeWords = (str: string): string =>
  str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
