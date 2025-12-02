import type { iStatusError } from "../interfaces/iSatatus";

// FUNCION REUTILIZABLE PARA TODAS LAS PETICIONES FETCH
const apiRequest = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  try {
    // --- HACER LA PETICION ---
    const response = await fetch(url, options);

    // --- VERIFICAR SI HUBO ERROR HTTP ---
    if (!response.ok) {
      // LEER EL BODY PARA TRATAR DE OBTENER MENSAJE DE ERROR
      const contentType = response.headers.get('content-type') || '';
      let errorBody: any = {};

      if (contentType.includes('application/json')) {
        errorBody = await response.json().catch(() => ({}));
      } else {
        const text = await response.text().catch(() => '');
        errorBody = { message: text };
      }

      // ARMAR OBJETO DE ERROR CONSISTENTE
      const errorToThrow: iStatusError = {
        statusCode: errorBody.statusCode || response.status,
        status: errorBody.statusCode || response.status,
        message: errorBody.message || 'ERROR DE SERVIDOR DESCONOCIDO',
      };

      throw errorToThrow;
    }

    // --- LEER BODY COMO TEXTO ---
    const text = await response.text();

    // --- SI NO HAY CONTENIDO (EJ: 204 NO CONTENT) DEVOLVER UNDEFINED ---
    if (!text) return undefined as any;

    // --- SI EL BODY ES JSON, PARSEARLO ---
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      return JSON.parse(text) as T;
    }

    // --- SI NO ES JSON, DEVOLVER TEXTO CRUDO ---
    return text as unknown as T;

  } catch (error: unknown) {
    // --- CUALQUIER OTRO ERROR → RE-LANZAR ---
    const err = error as iStatusError;
    throw err;
  }
};

export default apiRequest;
