// import type { iStatusError } from "../interfaces/iSatatus";

// // FUNCION REUTILIZABLE PARA TODO TIPO DE ACCIONES CON FETCH
// const apiRequest = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
//   try {
//     const response = await fetch(url, options); //CONSULTA

//     // SI FALLO ALGO
//     if (!response.ok) {
//       // INTENTA LEER EL CUERPO JSON DEL ERROR
//       const errorBody: any = await response.json().catch(() => ({}));
//       //LANZA UNA NUEVA EXCEPCION USANDO EL ESTADO REAL DE LA RESPUESTA,
//       // ESTO ASEGURA QUE EL ERROR CAPTURADO EN EL CATCH DEL HOOK TENGA LA ESTRUCTURA CORRECTA.
//       const errorToThrow: iStatusError = {
//         statusCode: errorBody.statusCode, 
//         status: errorBody.statusCode || response.status, 
//         message: errorBody.message || 'Error de servidor desconocido',
//       };

//       throw errorToThrow;
//     }
  
//     // LEER EL BODY COMO TEXTO PRIMERO
//     const text = await response.text();

//     // SI EL BODY ESTA VACIO (EJ: LOGOUT 204 NO CONTENT) RETORNAR UNDEFINED
//     if (!text) return undefined as any;

//     // PARSEAR A FORMATO JSON SI HAY CONTENIDO
//     return JSON.parse(text) as T;
//   } catch (error: unknown) {
//     const err = error as iStatusError;
//     // CUALQUIER OTRO ERROR → RE-LANZAR
//     throw err;
//   }
// };

// export default apiRequest;


import type { iStatusError } from "../interfaces/iSatatus";

const apiRequest = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  try {
    const response = await fetch(url, options);

    const contentType = response.headers.get('content-type') || '';

    // ----------------------------
    // MANEJO DE ERRORES HTTP
    // ----------------------------
    if (!response.ok) {
      let errorBody: any = {};

      if (contentType.includes('application/json')) {
        errorBody = await response.json().catch(() => ({}));
      } else {
        const text = await response.text().catch(() => '');
        errorBody = { message: text };
      }

      const errorToThrow: iStatusError = {
        statusCode: errorBody.statusCode || response.status,
        status: errorBody.statusCode || response.status,
        message: errorBody.message || 'Error de servidor desconocido',
      };

      throw errorToThrow;
    }

    // ----------------------------
    // RESPUESTA CORRECTA
    // ----------------------------
    if (contentType.includes('application/json')) {
      return await response.json() as T;
    }

    // Si no es JSON, devolver texto o lo que sea
    const text = await response.text();
    return text as unknown as T;

  } catch (error) {
    throw error as iStatusError;
  }
};

export default apiRequest;
