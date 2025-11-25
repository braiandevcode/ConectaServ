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
import type { TStateLogin } from '../types/typeStateLogin';
import type { TIdString } from '../types/typeUUID';
import type { ITaskerData } from '../interfaces/iTaskerData';
import type { TImageData } from '../types/typeRegisterEndDto';
import { dataURLtoBlob } from '../utils/dataUrlToBlob';
import type { iMessageResponseStatus } from '../interfaces/iMessageResponseStatusBack';
import type { iMessageStatusToken } from '../interfaces/iMessageStatusToken';
import { EModalRegistersType } from '../types/enumModalRegistersTypes';
import type { iDataVerifyCode } from '../interfaces/iDataVerifyCode';
import type { iStatusError } from '../interfaces/iSatatus';

const { USER, USER_IDENTIFY, USER_CODE_REQUEST, USER_VERIFY, AUTH_LOGIN } = endPointUser; //DESESTRUCTURAR ENDPOINT

// GANCHO PARA CENTRALIZAR LAS SOLICITUDES A USER Y SUB RUTAS O PARA FILTROS PARAMS DE USER
const useUserApi = () => {
  const { setLoading } = useMain(); //HOOK QUE USA EL CONTEXTO DE MAIN PRINCIPAL
  const { showError, showSuccess, openGlobalModal } = useGlobalModal(); //HOOK QUE USA EL CONTEXTO DE MODAL GLOBAL
  const { openRegisterModal } = useRegisterModal(); //HOOK PARA EL MODAL GLOBAL DE REGISTRO
  const { updatedIsSendingCode, updatedIsSentCode } = useFormVerifyEmailCode(); //HOOK QUE USA CONTEXTO PARA VERIFICACION DE EMAIL
  const { setIsSending } = useRegister(); //HOOK QUE USA CONTEXTO PARA LOS REGISTROS GENERAL
  // HOOK NAVIGATE DE REACT
  const navigate = useNavigate();

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
      const result= await apiRequest<Pick<TUser, 'email'>>(`${USER_CODE_REQUEST}`, {
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
      if(err.status === 404){
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


  // ENVIAR DATOS DEL REGISTRO METODO POST
  const addUser = async ({ newData }: { newData: TUser }) : Promise<void>=> {
    const fd: FormData = new FormData();  //INSTANCIA DE FORMDATA
    
    let taskerDataWithOutImage: Omit<ITaskerData, 'imageProfileData' | 'imageExperienceData'> | undefined = undefined;
    let imageProfileData:TImageData | null | undefined= null; // PARA IMAGEN DE PERFIL
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
    const jsonToSend: TUser = !newData.taskerData 
        ? newData 
        : { ...newData, taskerData: taskerDataWithOutImage }


    // ADJUNTO EL JSON DE TEXTO
    // 'data' DEBE COINCIDIR CON EL @Body('data') EN NestJS
    fd.append('data', JSON.stringify(jsonToSend)); 

    // ADJUNTO IMAGEN DE PERFIL (SIMPLE)
    if (imageProfileData && imageProfileData.dataUrl) {
        const profileBlob = dataURLtoBlob(imageProfileData.dataUrl);
        if (profileBlob) {
          fd.append('imageProfile', profileBlob, imageProfileData.name || 'profile.jpg'); 
        }
    }

    // ADJUNTO IMAGENES DE EXPERIENCIAS (ARRAY)
    imageExperienceData.forEach((imageData, index) => {
        if (imageData.dataUrl) {
            const experienceBlob = dataURLtoBlob(imageData.dataUrl);
            if (experienceBlob) {
                fd.append('imageExperiences', experienceBlob, imageData.name || `experience_${index}.jpg`);
            }
        }
    });

    // TRY/CATCH
    try {
      setIsSending(true); //ENVIANDO DATOS
      setLoading(true); // ACTIVAR LOADER MIENTRAS SE ENVÍA AL BACKEND
      // PETICION FETCH CON HELPER
      const result =  await apiRequest(`${USER}`, {
        method: 'POST',
        body: fd,
      });

      if(result){
        //EXITO O CREADO 200/201
        showMsgSuccessRegister();
        return;
      }
    } catch (error: unknown) {
      const err = error as iStatusError; //FIRMA PERSONALIZADA PARA LOS ESTADOS DEL BACKEND
      // SI EL EMAIL YA EXISTE EN ESTE PROCESO 
      if(err.status === 409){
        showError('Email ya registrado', 'Por favor usa otro email.');
        return;
      }

      if(err.status  && err.status >= 400 && err.status < 500 ){
        showError('Error al Registrar', 'Verifica tus datos e inténtalo de nuevo.');
        return;
      }
      openGlobalModal(EModalGlobalType.MODAL_ERROR); //ACTUALIZAR PARA EL NUEVO MODAL DE ERROR
      setIsSending(false); // ENVIANDO FALSE
      // SINO SON DE 500 EN ADELANTE
      // 5xx o ERROR DE RED O DESCONOCIDO
      showError('Ups!', 'Tuvimos un inconveniente al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.');
      throw error;
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

  // ENVIO DE DATOS DE CODIGO AL BACKEND
  const userVerify = async ({ email, code, token }: iDataVerifyCode): Promise<iMessageResponseStatus | undefined>  =>{
    // INTENTAR ENVIO
    try {
      setLoading(true); // ACTIVAR LOADER MIENTRAS SE ENVÍA AL BACKEND
      const dataCode:iDataVerifyCode= { email, code, token };
      // EL EMAIL LO TOMO DE TUser, YA QUE ES EL EMAIL INGRESADO EN EL CAMPO DEL FORMULARIO
      const result= await apiRequest<iMessageResponseStatus>(`${USER_VERIFY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataCode),
      }); //HELPER DE 

      return result;
    } catch (error) {

      const err = error as iStatusError;
      let title: string = 'Ups!';
      let userMessage: string = 'Ocurrio un error inesperado. Intente de nuevo más tarde.';
      openGlobalModal(EModalGlobalType.MODAL_ERROR);
      showError(title, userMessage);

      throw err;
    } finally {
      updatedIsSendingCode(false); //EL ESTADO DE ENVIANDO EL CODIGO AL USUARIO TERMINO
      setLoading(false);
    }
  }

  return { getIdentifyEmail, addUser, signInUser, sendCodeToUserEmail, userVerify }; // ==> ACA RETORNO TODOS LOS METODOS QUE HACEN REFERNECIA A DATOS DE USUARIOS
};

export default useUserApi;
