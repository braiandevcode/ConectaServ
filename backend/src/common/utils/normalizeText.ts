// FUNCION PARA NORMALIZAR TEXTO ANTES Y EVITAR PROBLEMAS DE MAYUSCULAS, TILDES, ETC
const normalizeText = (value: string): string => {
  // VERIFICO QUE LO QUE RECIBO SEA UN STRING, SI NO LO ES LO DEVUELVO TAL CUAL
  // ESTO LO HAGO POR SEGURIDAD EN TIEMPO DE EJECUCIÓN, POR SI LLEGA UN VALOR DINAMICO O NO TIPADO
  if (typeof value !== 'string') return value;

  // ELIMINO TILDES Y ACENTOS DEL STRING
  // USO normalize("NFD") PARA SEPARAR LAS LETRAS DE SUS TILDES ==> UNICODE https://symbl.cc/es/unicode-table/
  // LUEGO REEMPLAZO LOS CARACTERES DE TILDE CON UN REGEX

  //normalize ==> https://developer.mozilla.org/
  const withoutAccents = value.normalize("NFD").replace(/[\u0300-\u036f]/g, '');

  // PASO TODO A MINÚSCULAS PARA ESTANDARIZAR
  const lower = withoutAccents.toLowerCase();

  // CAPITALIZO LA PRIMERA LETRA PARA QUE QUEDE BONITO
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

export default normalizeText;