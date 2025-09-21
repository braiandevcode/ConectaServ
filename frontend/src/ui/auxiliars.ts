// ----------------------------------------------AUXILIARES PARA VALIDACION DE CAMPOS-------------------------------------------//

//-----------------------------FUNCIONES REUTILIZABLES PARA VALIDAR---------------------------------------------------------//

export const normalizeSpaces = (str: string): string => str.replace(/\s+/g, ' '); //QUITAR TODOS LOS ESPACIOS DEL TABULADOR Y RESETEAR UN SOLO TAB DE ESPACIO

// SEPARAR LA CADENA POR ESPACIOS
// MAPEAR, CREAR NUEVO ARREGLO DONDE CADA PALABRA O CADENA EN SU INDICE 0(PRIMER CARACTER) SEA MAYUSCULAS Y EL RESTO MINUSCULAS ["lucas", "gonzales"] => ["Lucas", "Gonzales"]
// UNIR CON join() generando una sola cadena "Lucas Gonzales".
export const capitalizeWords = (str: string): string =>
  str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

//----------------------------------------------FUNCIONES DE PARSEOS Y FORMATO DE NUMEROS---------------------------------------//
// FUNCION PARA PARSEAR MONTO
// CONVERTIR A NUMERO FLOTANTE CON DECIMALES Y REEMPLAZA DE FORMA GLOBAL(ES DECIR, LA EXPREXION REGULAR INDICA RECORRER TODO EL TEXTO) UN NUMERO COMO  1000 A 1000.00
export const parseMontoToNumber = (value: string): number => {
  return parseFloat(value.replace(/\./g, '').replace(',', '.')) || 0;
};

// FUNCION PARA FORMATEAR VISUALMENTE COMO "10.000,00"
export const formatMontoOnlyNumber = (value: string): string => {
  const numericValue = typeof value === 'number' ? value : parseMontoToNumber(value); // PARSEAR EL VALOR SI NO ES TIPO NUMERO
  if (isNaN(numericValue)) return ''; //SI EL VALOR ES NO UN NUMERO VALIDO RETORNAR CADENA VACIA

  return numericValue.toLocaleString('es-ES', {
    minimumFractionDigits: 2, //FRACCION MINIMA DE DIGITOS
    maximumFractionDigits: 2, //FRACCION MAXIMA DE DIGITOS
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
  if (isNaN(numericValue)) return '';
  return numericValue.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

// -----------------------AUXILIAR PARA CONVERTIR MEGABYTES A BYTES----------------------------------------//
export const convertBytes = (value: number): number => value * 1024 * 1024;

// FUNCION AUXILIAR QUE SIRVE PARA VERIFICAR SI CONTIENE UNA CLASE Y SI EL BOTON ES DE TIPO "button"
export const isContainSelectorAndBtn = (container: HTMLElement, selector: string, containerBtn: HTMLElement): boolean | null => {
  const btn: HTMLButtonElement | null = containerBtn.querySelector('button');
  if (!btn) return null;
  return container.classList.contains(selector) && btn.type === 'button';
};

export const evaluateSelectedOptionDefault = ({vectorValuesDefault, optionToSelect}: {vectorValuesDefault: string[]; optionToSelect: HTMLOptionElement}): boolean => {
  // CHEQUEAR SI EL VALOR ES PLACEHOLDER (IGNORANDO MAYUS/minus)
  return vectorValuesDefault.some((ph) => ph.toLowerCase() === optionToSelect.value.toLowerCase());
};

//AÑADIR CLASE MEDIANTE UNA PROMESA, CASOS DE DINAMISMO DONDE SE NECESITE ESPERAR (DE MOMENTO SOLO AÑADIR, PODRIA SER AUN MAS FLEXIBLE)
export const addClassWithPromise = async (container: HTMLElement, className: string): Promise<void> => {
  return await new Promise((resolve, reject) => {
    if (container) {
      container.classList.add(className);
      resolve();
    } else {
      reject(new Error('No se encontró el nodo padre del container'));
    }
  });
};

// FUNCION REUTILIZABLE QUE ITERA SOBRE ARRAR DE STRING PERMITIENDO ENCADENAR CLASES A UN NODO ELEMENTO
export const actionClassString = (str: string, method: string, container: HTMLElement): void => {
  switch (method) {
    case 'add':
      str
        .trim()
        .split(/\s+/)
        .forEach((cls) => container.classList.add(cls));
      break;
    case 'remove':
      str
        .trim()
        .split(/\s+/)
        .forEach((cls) => container.classList.remove(cls));
      break;
    case 'replace':
      // ELIMINAR ANTES TODAS LAS ACTUALES
      container.classList.forEach((cls) => container.classList.remove(cls));

      // ASIGNAR NUEVAS
      str
        .trim()
        .split(/\s+/)
        .forEach((cls) => {
          // SI SE PASA ANTERIORES
          container.classList.add(cls);
        });
      break;
    default:
      console.warn(`actionClassString: método "${method}" no soportado`);
      break;
  }
};
