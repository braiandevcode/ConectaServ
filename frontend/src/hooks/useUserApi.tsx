import { useNavigate } from 'react-router';
import { endPointUser } from '../config/configEndpointUser';
import type { iEmailUser } from '../interfaces/iEmailUser';
import { EModalGlobalType } from '../types/enumGlobalModalType';
import type { TIdentifyEmail } from '../types/typeIdentifyEmail';
import type { TUser } from '../types/typeUser';
import apiRequest from '../utils/apiRequestUtils';
import useFormVerifyEmailCode from './useFormVerifyEmailCode';
import useGlobalModal from './useGlobalModal';
import useMain from './useMain';
import useRegister from './useRegister';
import useRegisterModal from './useRegisterModal';
import type { TDataLoginUser } from '../types/typeDataLoginUser';
import type { TStateAuth } from '../types/typeStateAuth';
import type { ITaskerData } from '../interfaces/iTaskerData';
import type { TImageData } from '../types/typeRegisterEndDto';
import { dataURLtoBlob } from '../utils/dataUrlToBlob';
import type { iMessageResponseStatus } from '../interfaces/iMessageResponseStatusBack';
import type { iMessageStatusToken } from '../interfaces/iMessageStatusToken';
import { EModalRegistersType } from '../types/enumModalRegistersTypes';
import type { iDataVerifyCode } from '../interfaces/iDataVerifyCode';
import type { iStatusError } from '../interfaces/iSatatus';
import type { TDataPayloadUser } from '../types/typeDataPayloadUser';

const { USER, USER_IDENTIFY, USER_CODE_REQUEST, USER_VERIFY, AUTH_LOGIN, LOGOUT, AUTH_ME } = endPointUser; //DESESTRUCTURAR ENDPOINT

// GANCHO PARA CENTRALIZAR LAS SOLICITUDES A USER Y SUB RUTAS O PARA FILTROS PARAMS DE USER
const useUserApi = () => {
  const { setLoading, setUserData, userData } = useMain(); //HOOK QUE USA EL CONTEXTO DE MAIN PRINCIPAL
  const { showError, showSuccess, openGlobalModal } = useGlobalModal(); //HOOK QUE USA EL CONTEXTO DE MODAL GLOBAL
  const { openRegisterModal, closeRegisterModal } = useRegisterModal(); //HOOK PARA EL MODAL GLOBAL DE REGISTRO
  const { updatedIsSendingCode, updatedIsSentCode } = useFormVerifyEmailCode(); //HOOK QUE USA CONTEXTO PARA VERIFICACION DE EMAIL
  const { setIsSending } = useRegister(); //HOOK QUE USA CONTEXTO PARA LOS REGISTROS GENERAL
  
  // HOOK NAVIGATE DE REACT
  const navigate = useNavigate();
  // ACCION DE REDIRECCION
  const redirectToHome = () => {
    navigate('/', { state: { showLogin: true } });
  };

  // FUNCION PARA CUANDO EL REGISTRO ES EXITOSO
  const showMsgSuccessRegister = (): void => {
    // MOSTRAR EL MODAL CON EL MENSAJE ==> LUEGO EJECUTA CALLBACK
    showSuccess('Registro Exitoso', 'Tus datos se han enviado correctamente.', redirectToHome);
  };

  // ACCION DE REDIRECCION AL DASHBOARD AL LOGEARSE
  const redirectToDashBoard = async () => {
    // SI ES CLIENTE
    !userData?.isTasker ? navigate('/service/all', { replace: true }) : navigate('/profile/info', { replace: true })
  };

  // LEER TABLA USERS PARA IDENTIFICAR EL EMAIL SI EXISTE
  const getIdentifyEmail = async ({ setIsSendingIdentificationEmail, emailIdentify }: Pick<TIdentifyEmail, 'emailIdentify' | 'setIsSendingIdentificationEmail'>): Promise<iMessageResponseStatus | null> => {
    try {
      setLoading(true); //LOADER EN TRUE
      setIsSendingIdentificationEmail(true); // ==> ENVIANDOSE IDENTIFICACION DE CUENTA
      const result = await apiRequest<Pick<TIdentifyEmail, 'emailIdentify'>>(`${USER_IDENTIFY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailIdentify }),
      }); //HELPER DE PETICION

      // GUARDO RESPUESTA DEL BACKEND PARA ESTE CASO DONDE SE SU RESPUESTA Y PODER MANEJAR ACA
      const response = result as unknown as iMessageResponseStatus | null;
      // NO SE VALIDA ACA, PORQUE SEGUN EL ESTADO EN ALGUNOS CASOS RETORNA Y NO SIGUE SU FLUJO
      // Y EN OTROS SI.
      return response; //RETORNAR LA RESPUESTA QUE NOS DA EL BACKEND
    } catch (error: unknown) {
      const err = error as iStatusError;
      openGlobalModal(EModalGlobalType.MODAL_ERROR); //ACTUALIZAR PARA EL NUEVO MODAL DE ERROR
      // SINO DE 500 EN ADELANTE,
      // 5xx o ERROR DE RED O DESCONOCIDO
      showError('Ups', 'Tuvimos un inconveniente al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.');
      throw err;
    } finally {
      setLoading(false); //LOADING  A FALSE
      setIsSendingIdentificationEmail(false); //ENVIANDO A FALSE
    }
  };

  // FUNCION PARA ENVIAR CODIGO
  const sendCodeToUserEmail = async ({ emailCode }: iEmailUser): Promise<iMessageStatusToken | undefined> => {
    // INTENTAR ENVIO
    try {
      setLoading(true); // ACTIVAR LOADER MIENTRAS SE ENVÍA AL BACKEND
      updatedIsSendingCode(true); //EL CODIGO ENVIADO AL USUARIO ESTA EN PROGRESO

      // EL EMAIL LO TOMO DE TUser, YA QUE ES EL EMAIL INGRESADO EN EL CAMPO DEL FORMULARIO
      const result = await apiRequest<Pick<TUser, 'email'>>(`${USER_CODE_REQUEST}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailCode }),
      }); //HELPER DE

      const response = result as unknown as iMessageStatusToken;
      // SI ES SUCCESS Y EL ESTADO ES 200
      if (response && response.success) {
        updatedIsSentCode(true); // ESTADO DE CODIGO ENVIADO A DESTINO
        showSuccess('¡Codigo enviado!', '¡Codigo de verificacion enviado con exito!, Ingrese el codigo enviado aquí.');
        openRegisterModal(EModalRegistersType.MODAL_VERIFY);
      }
      return response;
    } catch (error) {
      const err = error as iStatusError; //FIRMA PERSONALIZADA PARA LOS ESTADOS DEL BACKEND

      // SI EL NOMBRE DE CUENTA DEL EMAIL NO SE ENCUENTRA COMO SERVICIO EXISTENTE
      if (err.statusCode === 404) {
        updatedIsSentCode(false); // ESTADO DE CODIGO ENVIADO A DESTINO
        showSuccess('Email inexistente', 'El email no fué encontrado para procesar su codigo. Porfavor, verifique el email ingresado');
        openRegisterModal(EModalRegistersType.MODAL_VERIFY);
        return;
      }
      updatedIsSentCode(false); // EL CODIGO NO FUE ENVIADO
      let title: string = 'Ups!';
      let userMessage: string = 'Fallo al enviar el código de verificación. Por favor, revisa tu conexión o intente nuevo mas tarde';
      openGlobalModal(EModalGlobalType.MODAL_ERROR);
      showError(title, userMessage);

      throw err;
    } finally {
      updatedIsSendingCode(false); //EL ESTADO DE ENVIANDO EL CODIGO AL USUARIO TERMINO
      setLoading(false);
    }
  };

  // ENVIAR TODO LO QUE TENGA EL FORMDATA
  const sendDataUser = async (fd: FormData) => {
    // TRY/CATCH
    try {
      setIsSending(true); //ENVIANDO DATOS
      setLoading(true); // ACTIVAR LOADER MIENTRAS SE ENVÍA AL BACKEND
      // PETICION FETCH CON HELPER
      const result = await apiRequest(`${USER}`, {
        method: 'POST',
        body: fd,
      });

      if (result) {
        //EXITO O CREADO 200/201
        showMsgSuccessRegister();
        return;
      }
    } catch (error: unknown) {
      const err = error as iStatusError; //FIRMA PERSONALIZADA PARA LOS ESTADOS DEL BACKEND
      // SI EL EMAIL YA EXISTE EN ESTE PROCESO
      if (err.statusCode === 409) {
        showError('Email ya registrado', 'Por favor usa otro email.');
        return;
      }

      if (err.statusCode && err.statusCode >= 400 && err.statusCode < 500) {
        showError('Error al Registrar', 'Verifica tus datos e inténtalo de nuevo.');
        return;
      }
      openGlobalModal(EModalGlobalType.MODAL_ERROR); //ACTUALIZAR PARA EL NUEVO MODAL DE ERROR
      // SINO SON DE 500 EN ADELANTE
      // 5xx o ERROR DE RED O DESCONOCIDO
      showError('Ups!', 'Tuvimos un inconveniente al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.');
      throw error;
    } finally {
      setIsSending(false); // ENVIANDO FALSE
      setLoading(false); //LOADING EN FALSE
    }
  };

  // ENVIAR DATOS DEL REGISTRO METODO POST
  const addUser = async ({ newData }: { newData: TUser }): Promise<void> => {
    const fd: FormData = new FormData(); //INSTANCIA DE FORMDATA
    let taskerDataWithOutImage: Omit<ITaskerData, 'imageProfileData' | 'imageExperienceData'> | undefined = undefined;
    let imageProfileData: TImageData | null | undefined = null; // PARA IMAGEN DE PERFIL
    let imageExperienceData: TImageData[] = []; // PARA ARRAY DE EXPERIENCIAS

    // SEPARO DATOS Y ARCHIVOS OBTENIENDO BASE64 ORIGINAL
    if (newData.taskerData) {
      // OBTENGO LOS DATOS BASE64 ANTES DE OMITIR DEL JSON A ENVIAR
      imageProfileData = newData.taskerData.imageProfileData;
      imageExperienceData = newData.taskerData.imageExperienceData || [];

      //SEPARO EL RESTO DEL JSON
      const { imageProfileData: imgProfile, imageExperienceData: imgExp, ...dataTasker } = newData.taskerData;
      taskerDataWithOutImage = dataTasker;
    }

    // JSON FINAL SIN IMAGENES BASE64
    const jsonToSend: TUser = !newData.taskerData ? newData : { ...newData, taskerData: taskerDataWithOutImage };

    // ADJUNTO EL JSON DE TEXTO
    // 'data' DEBE COINCIDIR CON EL @Body('data') EN NestJS
    fd.append('data', JSON.stringify(jsonToSend));

    // ADJUNTO IMAGEN DE PERFIL (SIMPLE)
    if (imageProfileData && imageProfileData.dataUrl) {
      const profileBlob: Blob | null = dataURLtoBlob(imageProfileData.dataUrl);
      if (profileBlob) {
        fd.append('imageProfile', profileBlob, imageProfileData.name || 'profile.jpg');
      }
    }

    // ADJUNTO IMAGENES DE EXPERIENCIAS (ARRAY)
    imageExperienceData.forEach((imageData, index) => {
      if (imageData.dataUrl) {
        const experienceBlob: Blob | null = dataURLtoBlob(imageData.dataUrl);
        if (experienceBlob) {
          fd.append('imageExperiences', experienceBlob, imageData.name || `experience_${index}.jpg`);
        }
      }
    });

    // LLAMAR PARA ENVIAR DATOS AHORA
    await sendDataUser(fd);
  };

  // ENVIO DE DATOS DE CODIGO AL BACKEND
  const userVerify = async ({ email, code, token, setErrorText, setIsCodeSent, setIsVerifyingCode, updatedIsSuccefullyVerified }: iDataVerifyCode): Promise<iMessageResponseStatus | void> => {
    // INTENTAR ENVIO
    try {
      setIsVerifyingCode(true); //PROCESO DE VERIFICACION DE CODIGO EN PROGRESO
      setLoading(true); // ACTIVAR LOADER MIENTRAS SE ENVIA AL BACKEND
      const dataCode: Omit<iDataVerifyCode, 'setIsCodeSent' | 'setErrorText' | 'updatedIsSuccefullyVerified' | 'setIsVerifyingCode'> = { email, code, token };

      // HACER PETICION AL BACKEND MEDIANTE EL ENDPOINT
      const result = await apiRequest<iMessageResponseStatus>(`${USER_VERIFY}`, {
        method: 'POST', //METODO
        headers: { 'Content-Type': 'application/json' }, //CABECERA
        body: JSON.stringify(dataCode), //BODY
      });

      return result;
    } catch (error) {
      let title: string = 'Ups';
      let userMessage: string = 'Ocurrio un error inesperado. Intente de nuevo más tarde.';
      const err = error as iStatusError;
      updatedIsSuccefullyVerified(false);
      setIsCodeSent(false);
      if (err.statusCode === 400) {
        openGlobalModal(EModalGlobalType.MODAL_ERROR, () => setErrorText(''));
        showError('Código incorrecto', 'El código ingresado no es valido.');
        return;
      }
      openGlobalModal(EModalGlobalType.MODAL_ERROR, () => setErrorText(''));
      showError(title, userMessage);
      throw err;
    } finally {
      updatedIsSendingCode(false); //EL ESTADO DE ENVIANDO EL CODIGO AL USUARIO TERMINO
      setLoading(false);
      closeRegisterModal();
    }
  };

  // LEER DATOS DE USUARIO LOGEADO
  const getDataUser = async ({ accessToken }: { accessToken: string }): Promise<TDataPayloadUser> => {
    //PEDIR DATOS NECESARIOS EN ESTE MOMENTO
    try {
      const userData: TDataPayloadUser = await apiRequest<TDataPayloadUser>(`${AUTH_ME}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include',
      }); 
      return userData;
    } catch (error) {
      let title: string = 'Ups';
      let userMessage: string = 'Ocurrio un error inesperado. Intente de nuevo más tarde.';
      const err = error as iStatusError;
      openGlobalModal(EModalGlobalType.MODAL_ERROR);
      // SINO ERROR INESPERADO
      showError(title, userMessage);
      throw err;
    }
  };

  // INICIO DE SESSION
  const signIn = async (setter: TStateAuth & TDataLoginUser): Promise<void> => {
    const { setIsAuth, setAccessToken, setErrorText, passwordLogin, userName } = setter;
    try {
      setIsSending(true);
      setLoading(true);
      
      // PETICION AL ENDPOINT PARA AUTENTICACION
      const result = await apiRequest<{ accessToken: string }>(`${AUTH_LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', //PERMITIR LEER Y OBTENER COOKIE
        body: JSON.stringify({ userName, password:passwordLogin }),
      });
      
      // SI HAY TOKEN Y REFRESH TOKEN
      if (result.accessToken) {
        setIsAuth(true); //AUTENTICADO EN TRUE
        setAccessToken(result.accessToken);
        setErrorText('');
        //PEDIR DATOS NECESARIOS EN ESTE MOMENTO
        const userData:TDataPayloadUser = await getDataUser({ accessToken: result.accessToken});
        setUserData(userData);
        redirectToDashBoard(); //REDIRECCIONAR AL DASHBOARD
      }
    } catch (error: unknown) {
      setIsAuth(false); //AUTENTICADO FALSO
      setAccessToken(null); //TOKEN EN NULL
      const err = error as iStatusError;

      // SIES CUALQUIER OTRO EN EL RANGO ENTRE 400 Y 499
      if (err.status && err.status >= 400 && err.status < 500) {
        setErrorText('Usuario o contraseña incorrectos.');
      } else {
        // SINO ERROR INESPERADO
        setErrorText('No pudimos conectarnos. Intentá de nuevo más tarde.');
      }

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // CERRAR SESION
  const logout = async (setter: Omit<TStateAuth, 'setErrorText'>): Promise<void> => {
    const { setIsAuth, setAccessToken } = setter;
    try {
      setIsSending(true);
      setLoading(true);
      // PETICION AL ENDPOINT PARA  CERRAR SESSION
      await apiRequest(`${LOGOUT}`, {
        method: 'POST',
        credentials: 'include', //PERMITIR LEER Y OBTENER COOKIE
      });

      setIsAuth(false); //AUTENTICADO EN FALSE
      setAccessToken(null);
      redirectToHome();
    } catch (error: unknown) {
      const err = error as iStatusError;
      let title: string = 'Ups';
      let userMessage: string = 'Ocurrio un error inesperado. Intente de nuevo más tarde.';
      openGlobalModal(EModalGlobalType.MODAL_ERROR);
      showError(title, userMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { getIdentifyEmail, addUser, signIn, sendCodeToUserEmail, userVerify, logout, getDataUser }; // ==> ACA RETORNO TODOS LOS METODOS QUE HACEN REFERNECIA A DATOS DE USUARIOS
};

export default useUserApi;
