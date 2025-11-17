// FUNCION AUX: CONVIERTE UN STRING DATA URL BASE64 A UN OBJETO BLOB BINARIO
export const dataURLtoBlob = (dataurl: string) => {
  const parts: string[] = dataurl.split(';base64,'); //CREAR ARRRAY DONDE SU SEPARACION ES ';base64,' ==> DEBERIA SER EN 2 PARTES
  if (parts.length !== 2) return null; // ==> SI NO SON DOS ERROR DE FORMATO
  const mime: string = parts[0].split(':')[1]; // ==> DE LA PARTE DE INDEX POSICION 0 CREO NUEVO VECTOR SEPARANDO POR ':' Y GUARDO EL VALOR DE LA POSICION 1 (MIME)

  // atob(del inglés "ASCII to Binary"): DECODIFICA UNA CADENA DE TEXTO QUE ESTA CODIFICADA EN BASE64
  // ESTA CADENA DE TEXTO ES NECESARIA PARA CREAR UN BLOB O FILE BINARIA.
  //ESPERA UNA CADENA DE TEXTO BASE64 VALIDA

  const bstr: string = atob(parts[1]); //TOMA EL STRING CODIFICADO Base64 (parts[1]) Y LO CONVIERTE  EN UNA CADENA DE TEXTO SIMPLE QUE REPRESENTA LOS DATOS BINARIOS ORIGINALES.
  let n: number = bstr.length; //LONGITUD DEL TEXTO DE DATO BINARIO

  // CREA UN ARRAY TIPADO DE 8 BITS (1 BYTE) CON LA LONGITUD 'N' PARA GUARDAR LOS DATOS BINARIOS PUROS DE LA IMAGEN.
  const u8arr: Uint8Array<ArrayBuffer> = new Uint8Array(n);

  //SI ARRANCA EN LA LONGITUD DE LA CADENA FUERA 10 EMPIEZA A DESCONTAR DESDE AHI EN CADA BUCLE
  //UN NUEMERO CERO ES CONSIDERADO FALSY LO CUAL EN CERO SALE DEL WHILE
  while (n--) {
    /* PSEUDOCÓDIGO DEL PROCESO DE LLENADO (EJEMPLO ASUMIENDO n = 5 INICIALMENTE):
    --------------------------------------------------------------------------------
    VUELTA 1 (n = 4 DESPUES DEL DECREMENTO): u8arr[4] = bstr.charCodeAt(4); // ASIGNA EL ULTIMO BYTE (Ej BINARIO: 72)
    VUELTA 2 (n = 3 DESPUES DEL DECREMENTO): u8arr[3] = bstr.charCodeAt(3); // ASIGNA EL BYTE ANTERIOR (Ej BINARIO: 101)
    VUELTA 3 (n = 2 DESPUES DEL DECREMENTO): u8arr[2] = bstr.charCodeAt(2); // ASIGNA EL SIGUIENTE BYTE (Ej BINARIO: 108)
    --------------------------------------------------------------------------------
    */
    u8arr[n] = bstr.charCodeAt(n); // COPIA EL VALOR BINARIO (BYTE) DEL CARACTER A LA POSICION CORRESPONDIENTE DEL ARRAY.
  }
  return new Blob([u8arr], { type: mime });
};
