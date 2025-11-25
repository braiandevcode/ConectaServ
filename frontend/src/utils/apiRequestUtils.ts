// FUNCION REUTILIZABLE PARA TODO TIPO DE ACCIONES CON FETCH
// const apiRequest = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
//   try {
//     const response = await fetch(url, options); //CONSULTA

import type { iStatusError } from "../interfaces/iSatatus";

//     // SI FALLO ALGO
//     if (!response.ok) {
//       // ESTO SE HACE PORQUE NO TODOS LOS ERRORES TIENEN CUERPO JSON.
//       // SI EL SERVIDOR NO MANDARA NADA TIRARIA OTRO ERROR
//       const error:any = await response.json().catch(() => ({}));


//       console.log('error: ', error);
//       console.log('TipeError: ', typeof error);
//       console.log('TipeError to JSON: ', typeof JSON.stringify(error));
//       console.log('bodyError to JSON: ', JSON.stringify(error));

//       throw error;
//     }

//     // PARSEAR A FORMATO JSON
//     return await response.json();
//   } catch (error: any) {
//     throw error;
//   }
// };


// FUNCION REUTILIZABLE PARA TODO TIPO DE ACCIONES CON FETCH
const apiRequest = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  try {
    const response = await fetch(url, options); //CONSULTA

    // SI FALLO ALGO
    if (!response.ok) {
      // INTENTA LEER EL CUERPO JSON DEL ERROR
      const errorBody: any = await response.json().catch(() => ({}));
      //LANZA UNA NUEVA EXCEPCION USANDO EL ESTADO REAL DE LA RESPUESTA,
      // ESTO ASEGURA QUE EL ERROR CAPTURADO EN EL CATCH DEL HOOK TENGA LA ESTRUCTURA CORRECTA.
     const errorToThrow: iStatusError = {
        statusCode: errorBody.statusCode, 
        status: errorBody.statusCode || response.status, 
        message: errorBody.message || 'Error de servidor desconocido',
      };

      throw errorToThrow;
    }
    // PARSEAR A FORMATO JSON
    return await response.json();
  } catch (error: unknown) {
    throw error as iStatusError;
  }
};

export default apiRequest;