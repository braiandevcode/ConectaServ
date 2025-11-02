import { useNavigate } from 'react-router';
import { endPointUser } from '../config/configEndpointRegister';
import type { iEmailUser } from '../interfaces/iEmailUser';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { EModalGlobalType } from '../types/enumGlobalModalType';
import type { TIdentifyEmail } from '../types/typeIdentifyEmail';
import type { TUser } from '../types/typeUser';
import apiRequest from '../utils/apiRequestUtils';
import useFormVerifyEmailCode from './useFormVerifyEmailCode';
import useGlobalModal from './useGlobalModal';
import useMain from './useMain';
import useRegister from './useRegister';
import useRegisterModal from './useRegisterModal';
import { configEmail } from '../config/configCodeEmail';
import generateRandomNumber from '../utils/generateRandomNumber';
import type { TVerifyCode } from '../types/typeVerifyCode';
import { templateParamsEmailjs } from '../config/templateParamsEmailjs';
import { DATA_EMAILJS } from '../config/configDataIdEmailjs';
import { EModalRegistersType } from '../types/enumModalRegistersTypes';
import type { TDataLoginUser } from '../types/typeDataLoginUser';
import type { TStateLogin } from '../types/typeStateLogin';
import type { TIdString } from '../types/typeUUID';

const { USER, AUTH_LOGIN } = endPointUser; //DESESTRUCTURAR ENDPOINT

// GANCHO PARA CENTRALIZAR LAS SOLICITUDES A USER Y SUB RUTAS O PARA FILTROS PARAMS DE USER
const useUserApi = () => {
  const { setLoading } = useMain(); //HOOK QUE USA EL CONTEXTO DE MAIN PRINCIPAL
  const { showError, showSuccess, openGlobalModal } = useGlobalModal(); //HOOK QUE USA EL CONTEXTO DE MODAL GLOBAL
  const { updateCodeEmail, updatedIsSendingCode, updatedIsSentCode } = useFormVerifyEmailCode();
  const { openRegisterModal } = useRegisterModal()
  const { setIsSending } = useRegister();
 
  const navigate = useNavigate();  // HOOK NAVIGATE DE REACT

  // FUNCION PARA CUANDO EL REGISTRO ES EXITOSO
  const showMsgSuccessRegister = (): void => {
    // ACCION DE REDIRECCION
    const redirectToHome = () => {
      setTimeout(() => {
        navigate('/', { state: { showLogin: true } });
        setIsSending(false); // ENVIANDO FALSE
      }, 2500); // ESPERAR 6 SEGUNDOS
    };

    // MOSTRAR EL MODAL CON EL MENSAJE ==> LUEGO EJECUTA CALLBACK
    showSuccess('Registro Exitoso', 'Tus datos se han enviado correctamente.', redirectToHome);
  };

  // ACCION DE REDIRECCION
  // const redirectToDashBoard = () => {
  //   setTimeout(() => {
  //     navigate('/dashboard', { replace: true });
  //     setIsSending(false); // ENVIANDO FALSE
  //   }, 2500); // ESPERAR 6 SEGUNDOS
  // };


  // LEER TABLA USERS PARA IDENTIFICAR EL EMAIL SI EXISTE
  const getIdentifyEmail = async ({ setIsSendingIdentificationEmail }: Pick<TIdentifyEmail, 'setIsSendingIdentificationEmail'>): Promise<TUser[] | null> => {
    try {
      setLoading(true); //LOADER EN TRUE
      setIsSendingIdentificationEmail(true); // ==> ENVIANDOSE IDENTIFICACION DE CUENTA
      const result = await apiRequest<TUser[]>(`${USER}`); //HELPER DE PETICION
      return result;
    } catch (error: unknown) {
      openGlobalModal(EModalGlobalType.MODAL_ERROR); //ACTUALIZAR PARA EL NUEVO MODAL DE ERROR
      // SINO DE 500 EN ADELANTE,
      // 5xx o ERROR DE RED O DESCONOCIDO
      showError('Ups...', 'Tuvimos un inconveniente al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.');
      return null; //NO SEGUIR
    } finally {
      setLoading(false); //LOADING  A FALSE
      setIsSendingIdentificationEmail(false); //ENVIANDO A FALSE
    }
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
      setIsSending(false); // ENVIANDO FALSE
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
    }
  };

  // INICIO DE SESSION
  const signInUser = async (setter: TStateLogin & TDataLoginUser) => {
    const { setIsAuth, password, userName } = setter;
    try {
      setIsSending(true);
      setLoading(true);
      const result = await apiRequest<TUser[]>(`${AUTH_LOGIN}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, password }),
      });

      // SOLO ENVIO POST DEPENDIENDO DEL BACKEND EL ESTADO SERA OK O NO
      // const result = await response.json().catch(() => null) as TUser[];

      // // --- SIMULACIÓN json server---
      // if (!response.ok) {
      //   // SI EL BACKEND DEVOLVIO ERROR HTTP
      //   const statusCode = response.status;

      //   if (statusCode === 409) {
      //     setError('Ya iniciaste sesión en otro dispositivo.');
      //   } else if (statusCode === 429) {
      //     setError('Esperá un momento antes de volver a intentar.');
      //   } else if (statusCode >= 400 && statusCode < 500) {
      //     setError('Usuario o contraseña incorrectos.');
      //   } else {
      //     setError('No pudimos conectarnos. Intentá de nuevo más tarde.');
      //   }

      //   return; //CORTAR EJECUCION
      // }


      // const simulateArray = result 

      // ESTA PARTE LA HARIA EL BACKEND PERO PARA CASO DE EXITO SIMULA PEQUEÑA LOGICA
      //----------------------------------------------------------------------------

      const verifyUser = (): { token: TIdString | string, success: boolean } => {
        // TIdString ES EL TIPO UUID ==> SOLO E SPARA GENERAR ALGO RANDOM DE EJEMPLO
        const success: boolean = result.some(data => data.userName === userName && data.password === password);

        console.log(success);
        
        if (success) {
          return { token: crypto.randomUUID(), success}
        }

        return { token: '', success } // AQUI SUCCES SI LA LOGICA NO FALLA SERIA FALSE
      }

      const { token, success } = verifyUser();
      //------------------------------------------------------------------------------

      // --- SI TODO OK ---
      if (token && success) {
        // SIMULACION DE LOGIN EXITOSO
        // GUARDAR TOKEN, NAVEGAR, ETC
        // redirectToDashBoard();
        setIsAuth(true);
        return { message: 'Logeado con exito', success:true, token }
      } 
    } catch (error: unknown) {
      setIsSending(false);

      const apiError = error as { status?: number };

      // GENERO ESTADO MANUAL PARA SIMULAR HTTP CON json-server

      let statusCode: number = apiError.status ?? 0;

      console.log(statusCode);
    
      if (statusCode === 409) {
        return { message: 'Ya iniciaste sesión en otro dispositivo.', success:false, token:'' }

        // setError('Ya iniciaste sesión en otro dispositivo.');
      } else if (statusCode === 429) {
        return { message: 'Esperá un momento antes de volver a intentar.', success:false, token:'' }

        // setError('Esperá un momento antes de volver a intentar.');
      } else if (statusCode >= 400 && statusCode < 500) {
        return { message: 'Usuario o contraseña incorrectos.', success:false, token: ''}

        // setError('Usuario o contraseña incorrectos.');
      } else {
        return { message: 'No pudimos conectarnos. Intentá de nuevo más tarde.', success:false, token:'' }

        // setError('No pudimos conectarnos. Intentá de nuevo más tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  // INICIALIZAR LIBRERIA
  emailjs.init(configEmail.options); //==> PASO CONFIGURACION

  // FUNCION PARA ENVIAR CODIGO
  const sendCodeToUserEmail = async ({ emailUser }: iEmailUser): Promise<void> => {
    const generatedCode: number = generateRandomNumber(); //GENERAR NUMERO RANDOM

    updateCodeEmail(generatedCode.toString()); //ACTUALIZO EN STORAGE Y ESTADO INTERNO DE REACT

    //INVOCO FUNCION DE OBJETO DE CONFIGURACION PARA ENVIO
    const templateParams: TVerifyCode = templateParamsEmailjs({
      to_email: emailUser, // ==> CORREO DE DESTINO
      verification_code: generatedCode, //==> CODIGO GENERADO A LA PLANTILLA
    });

    const { SERVICE_ID, TEMPLATE_VERIFICATION_ID } = DATA_EMAILJS; //DESESTRUCTURAR

    // INTENTAR ENVIO
    try {
      setLoading(true); // ACTIVAR LOADER MIENTRAS SE ENVÍA AL BACKEND
      updatedIsSendingCode(true); //EL CODIGO ENVIADO AL USUARIO ESTA EN PROGRESO
      const response: EmailJSResponseStatus = await emailjs.send(SERVICE_ID, TEMPLATE_VERIFICATION_ID, templateParams);
      if (response.status === 200) {
        updatedIsSentCode(true); // ESTADO DE CODIGO ENVIADO A DESTINO
        showSuccess('¡Codigo enviado!', '¡Codigo de verificacion enviado con exito!, Ingrese el codigo enviado aquí.');
        openRegisterModal(EModalRegistersType.MODAL_VERIFY);
      }
    } catch (err) {
      updatedIsSentCode(false); // EL CODIGO NO FUE ENVIADO
      let userMessage: string = 'Fallo al enviar el código de verificación. Por favor, revisa tu conexión o el correo ingresado.';
      let title: string = 'Ups algo fallo!';
      openGlobalModal(EModalGlobalType.MODAL_ERROR);
      showError(title, userMessage);
    } finally {
      updatedIsSendingCode(false); //EL ESTADO DE ENVIANDO EL CODIGO AL USUARIO TERMINO
      setLoading(false);
    }
  };

  return { getIdentifyEmail, addUser, signInUser, sendCodeToUserEmail }; // ==> ACA RETORNO TODOS LOS METODOS QUE HACEN REFERNECIA A DATOS DE USUARIOS
};

export default useUserApi;
