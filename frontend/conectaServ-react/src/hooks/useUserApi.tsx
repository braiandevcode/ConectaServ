import { endPointUser } from '../config/configEndpointRegister';
import type { TIdentifyEmail } from '../types/typeIdentifyEmail';
import type { TUser } from '../types/typeUser';
import apiRequest from '../utils/apiRequestUtils';
import useGlobalModal from './useGlobalModal';
import useMain from './useMain';
import useRegister from './useRegister';

const { USER } = endPointUser; //DESESTRUCTURAR ENDPOINT

// GANCHO PARA CENTRALIZAR LAS SOLICITUDES A USER Y SUB RUTAS O PARA FILTROS PARAMS DE USER
const useUserApi = () => {
  const { setLoading } = useMain(); //HOOK QUE USA EL CONTEXTO DE MAIN PRINCIPAL
  const { showError } = useGlobalModal(); //HOOK QUE USA EL CONTEXTO DE MODAL GLOBAL
  const { setIsSending } = useRegister();

  // LEER TABLA USERS PARA IDENTIFICAR EL EMAIL SI EXISTE
  const getIdentifyEmail = async ({ setIsSendingIdentificationEmail }: Pick<TIdentifyEmail, 'setIsSendingIdentificationEmail'>) => {
    try {
      setLoading(true); //LOADER EN TRUE
      setIsSendingIdentificationEmail(true); // ==> ENVIANDOSE IDENTIFICACION DE CUENTA
      const result = await apiRequest<TUser[]>(`${USER}`); //HELPER DE PETICION
      return result;
    } catch (error: unknown) {
      // CONVERTIR EL TIPO A UN ERROR CONOCIDO O EXTRAER LOS DATOS
      const apiError = error as { status?: number };
      const statusCode: number | undefined = apiError.status;
      // SI HAY VALOR Y SI ENTRE 400 Y 499
      if (statusCode && statusCode >= 400 && statusCode < 500) {
        // 4xx: PROBLEMAS DE DATOS DEL USUARIO
        showError('Error de identificación', 'Verifica el email ingresado e inténtalo de nuevo.');
      } else {
        // SINO SON DE 500 EN ADELANTE
        // 5xx o ERROR DE RED O DESCONOCIDO
        showError('Problema de Conexión', 'No se pudo contactar al servidor. Revisa tu conexión a internet o inténtalo más tarde.');
      }
      return undefined;
    } finally {
      setLoading(false); //LOADING
      setIsSendingIdentificationEmail(false); //ENVIANDO
    }
  };

  // ENVIAR DATOS DEL REGISTRO METODO POST
  const addNewUser = async ({ handleSuccessfulRegistration, newData }: { handleSuccessfulRegistration: () => void; newData: TUser }) => {
    // TRY/CATCH
    try {
      setIsSending(true); //ENVIANDO DATOS
      setLoading(true); // ACTIVAR LOADER MIENTRAS SE ENVÍA AL BACKEND
      await apiRequest(`${USER}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
      });

      handleSuccessfulRegistration();
    } catch (error: unknown) {
      // CONVERTIR EL TIPO A UN ERROR CONOCIDO O EXTRAER LOS DATOS
      const apiError = error as { status?: number };
      const statusCode: number | undefined = apiError.status;
      // SI HAY VALOR Y SI ENTRE 400 Y 499
      if (statusCode && statusCode >= 400 && statusCode < 500) {
        // 4xx: PROBLEMAS DE DATOS DEL USUARIO
        showError('Error al Registrar', 'Verifica tus datos e inténtalo de nuevo.');
      } else {
        // SINO SON DE 500 EN ADELANTE
        // 5xx o ERROR DE RED O DESCONOCIDO
        showError('Problema de Conexión', 'No se pudo contactar al servidor. Revisa tu conexión a internet o inténtalo más tarde.');
      }
    } finally {
      setLoading(false); //LOADING EN FALSE
      setIsSending(false); // ENVIANDO FALSE
    }
  };

  return { getIdentifyEmail, addNewUser }; // ==> ACA RETORNO TODOS LOS METODOS QUE HACEN REFERNECIA A DATOS DE USUARIOS
};

export default useUserApi;
