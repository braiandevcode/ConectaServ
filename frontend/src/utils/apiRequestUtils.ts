// FUNCION REUTILIZABLE PARA TODO TIPO DE ACCIONES CON FETCH
const apiRequest = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  try {
    const response = await fetch(url, options); //CONSULTA

    // SI FALLO ALGO
    if (!response.ok) {
      // ESTO SE HACE PORQUE NO TODOS LOS ERRORES TIENEN CUERPO JSON.
      // SI EL SERVIDOR NO MANDARA NADA TIRARIA OTRO ERROR
      const error = await response.json().catch(() => ({}));
      throw error;
    }

    // PARSEAR A FORMATO JSON
    return await response.json();
  } catch (error: any) {
    throw error;
  }
};
export default apiRequest;
