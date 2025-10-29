import { useNavigate } from 'react-router';
import { endPointUser } from '../config/configEndpointRegister';
import type { iEmailUser } from '../interfaces/iEmailUser';
import { EModalGlobalType } from '../types/enumGlobalModalType';
import type { TIdentifyEmail } from '../types/typeIdentifyEmail';
import type { TUser } from '../types/typeUser';
import apiRequest from '../utils/apiRequestUtils';
import sendCodeToUserEmail from '../utils/sendCodeToUserEmail';
import useFormVerifyEmailCode from './useFormVerifyEmailCode';
import useGlobalModal from './useGlobalModal';
import useMain from './useMain';
import useRegister from './useRegister';
import useRegisterModal from './useRegisterModal';

const { USER } = endPointUser; //DESESTRUCTURAR ENDPOINT

// GANCHO PARA CENTRALIZAR LAS SOLICITUDES A USER Y SUB RUTAS O PARA FILTROS PARAMS DE USER
const useUserApi = () => {
  const { setLoading } = useMain(); //HOOK QUE USA EL CONTEXTO DE MAIN PRINCIPAL
  const { showError, showSuccess, openGlobalModal } = useGlobalModal(); //HOOK QUE USA EL CONTEXTO DE MODAL GLOBAL
  const { openRegisterModal } = useRegisterModal();
  const { updateCodeEmail, updatedIsSendingCode, updatedIsSentCode } = useFormVerifyEmailCode();
  const { setIsSending } = useRegister();
  // HOOK NAVIGATE DE REACT
  const navigate = useNavigate();

  // FUNCION PARA CUANDO EL REGISTRO ES EXITOSO
  const showMsgSuccessRegister = (): void => {
    // DEFINIR LA ACCION DE REDIRECCION
    const redirectToHome = () => {
      navigate('/');
    };
    
    // MOSTRAR EL MODAL CON EL MENSAJE ==> LUEGO EJECUTA CALLBACK
    showSuccess('Registro Exitoso', 'Tus datos se han enviado correctamente.', redirectToHome);
  };

  // LEER TABLA USERS PARA IDENTIFICAR EL EMAIL SI EXISTE
  const getUsers = async ({ setIsSendingIdentificationEmail }: Pick<TIdentifyEmail, 'setIsSendingIdentificationEmail'>):Promise<TUser[]> => {
    try {
      setLoading(true); //LOADER EN TRUE
      setIsSendingIdentificationEmail(true); // ==> ENVIANDOSE IDENTIFICACION DE CUENTA
      const result = await apiRequest<TUser[]>(`${USER}`); //HELPER DE PETICION
      return result;
    } catch (error: unknown) {
      openGlobalModal(EModalGlobalType.MODAL_ERROR); //ACTUALIZAR PARA EL NUEVO MODAL DE ERROR
      // SINO DE 500 EN ADELANTE
      // 5xx o ERROR DE RED O DESCONOCIDO
      showError('Ups...', 'Tuvimos un inconveniente al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.');
    } finally {
      setLoading(false); //LOADING  A FALSE
      setIsSendingIdentificationEmail(false); //ENVIANDO A FALSE
    }
    return [];
  };

  // ENVIAR DATOS DEL REGISTRO METODO POST
  const addUser = async ({ newData }: { newData: TUser }) => {
    // TRY/CATCH
    try {
      setIsSending(true); //ENVIANDO DATOS
      setLoading(true); // ACTIVAR LOADER MIENTRAS SE ENVÍA AL BACKEND
      // PETICION FETCH CON HELPER
      await apiRequest(`${USER}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
      });

      showMsgSuccessRegister();
    } catch (error: unknown) {
      openGlobalModal(EModalGlobalType.MODAL_ERROR); //ACTUALIZAR PARA EL NUEVO MODAL DE ERROR
      // CONVERTIR EL TIPO A UN ERROR CONOCIDO O EXTRAER LOS DATOS
      const apiError = error as { status?: number };
      const statusCode: number = apiError.status ?? 0; //SI NO HAY NUMERO DE ESTADO ES CERO

      // 409 PARA ESTADOS DE CONFLICTOS ==> EMAIL YA REGISTRADO
      if (statusCode === 409) {
        showError('Email ya registrado', 'Por favor usa otro email.');
      } else if (statusCode && statusCode >= 400 && statusCode < 500) {
        // SI HAY VALOR Y SI ENTRE 400 Y 499
        // 4xx: PROBLEMAS DE DATOS DEL USUARIO
        showError('Error al Registrar', 'Verifica tus datos e inténtalo de nuevo.');
      } else {
        // SINO SON DE 500 EN ADELANTE
        // 5xx o ERROR DE RED O DESCONOCIDO
        showError('Ups...', 'Tuvimos un inconveniente al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.');
      }
    } finally {
      setLoading(false); //LOADING EN FALSE
      setIsSending(false); // ENVIANDO FALSE
    }
  };

  // FUNCION HEPLPER DE ENVIO DEL CODIGO
  const sendCodeUser = async ({ emailUser }: iEmailUser) => await sendCodeToUserEmail({ emailUser, updateCodeEmail, updatedIsSendingCode, updatedIsSentCode, openGlobalModal, openVerifyEmailModal: openRegisterModal, showError, showSuccess, setLoading });

  return { getUsers, addUser, sendCodeUser }; // ==> ACA RETORNO TODOS LOS METODOS QUE HACEN REFERNECIA A DATOS DE USUARIOS
};

export default useUserApi;
