// FUNCION REUTILIZABLE PARA TODO TIPO DE ACCIONES CON FETCH
const apiRequest = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  try {
    const response = await fetch(url, options); //CONSULTA

    // SI FALLO ALGO
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error en la petición');
    }

    // PARSEAR A FORMATO JSON
    return await response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};
export default apiRequest;
