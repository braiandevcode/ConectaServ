import type { FormEvent } from 'react';
import { EDataClient, EKeyDataByStep, ENamesOfKeyLocalStorage } from '../types/enums';
import type { TPlainClient } from '../types/typePlainClient';
import type { TPlaintProfessional } from '../types/typePlainDataProfesional';
import apiRequest from '../utils/apiRequestUtils';
// import { clearPersistence } from '../utils/storageUtils';
import useMain from './useMain';
import useRegister from './useRegister';
import useRegisterClient from './useRegisterClient';
import useRegisterPro from './useRegisterPro';
import useGlobalModal from './useGlobalModal';
import { endPointRegister } from '../config/configEndpointRegister';
// import { useNavigate } from 'react-router';

// HOOK QUE SE ENCARGA DEL PROCESO DE ENVIO DE DATOS AL BACKEND
const useSendData = () => {
  const { setLoading, client } = useMain(); // HOOK QUE USA EL CONTEXTO A NIVEL MAIN
  const { password, setIsSending } = useRegister(); // HOOK QUE USA EL CONTEXTO A NIVEL REGISTRO GENERALES
  const { dataClient, isLoaded: isLoadedClient, isValid } = useRegisterClient(); // HOOK QUE USA EL CONTEXTO A NIVEL REGISTRO CLIENTE
  const { stepData, isLoaded: isLoadedProfessional, isStepValid, hasBudge, step } = useRegisterPro(); // HOOK QUE USA EL CONTEXTO A NIVEL REGISTRO PROFESIONAL
  const { showError, showSuccess } = useGlobalModal(); //HOOK QUE USA CONTEXTO DE MODALES GLOBAL

  // const navigate = useNavigate();

  // SI SE CARGO TODO EN CONTEXTO DE CLIENTE Y EN PROFESIONAL
  const isReady: boolean = isLoadedClient || isLoadedProfessional;

  // ENVIAR DATOS AL BACKEND DE CUALQUIERA DE LOS DOS REGISTROS
  const submitNewData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (client === null) return; // ==> SI NO HAY ROL NO SEGUIR

    const storedRole = localStorage.getItem(ENamesOfKeyLocalStorage.ROLE);

    if (!storedRole && client === null) {
      showError('Error de Registro', 'No se ha seleccionado un rol para el registro.');
      return;
    }

    // SI NO ES VALIDO O NO CORRESPONDE AL PASO FINAL
    const isNotValidAndStepNotValid: boolean = !isStepValid || (hasBudge && step !== 4) || (!hasBudge && step !== 3);
    if (isNotValidAndStepNotValid && !isValid) return; //SI AMBOS NO SON VALIDO NO SEGUIR

    //-------------------OBJETO APLANADO PARA ENVIO DATOS DEL PROFESIONAL--------------------------------//
    // CON ALIAS PARA NO CHOCAR CON VARIABLE DE ESTADO
    const { valueSelected: valueSelectedAlias, ...res } = stepData[EKeyDataByStep.ONE];

    // CREA NUEVO OBJETO APLANADO
    const dataSendProfessional = {
      ...res, // SE PROPAGAN TODAS LAS PROPIEDADES DE CADA PASO
      ...stepData[EKeyDataByStep.TWO],
      ...(stepData[EKeyDataByStep.THREE] ?? {}), //PUEDE NO ESTAR
      ...stepData[EKeyDataByStep.FOUR],
      password, //SE AGREGA EL PASSWORD
    } as TPlaintProfessional;

    //-------------------OBJETO APLANADO PARA ENVIO DATOS DEL CLIENTE--------------------------------//
    const { ...copy } = (dataClient[EDataClient.DATA] as TPlainClient) ?? {};

    // CREA NUEVO OBJETO APLANADO
    const dataSendClient = {
      ...copy,
      password, //SE AGREGA EL PASSWORD
    } as TPlainClient;

    const { ENDPOINT_REGISTER_CLIENT, ENDPOINT_REGISTER_PROFESSIONAL } = endPointRegister;

    // SI CLIENTE ES TRUE  NEVO DATO DE CLIENTE, SINO PROFESIONAL
    const newData: TPlainClient | TPlaintProfessional = client ? dataSendClient : dataSendProfessional;

    const urlEndPointRegister: string = client ? ENDPOINT_REGISTER_CLIENT : ENDPOINT_REGISTER_PROFESSIONAL;

    // TRY/CATCH
    try {
      setIsSending(true); //ENVIANDO DATOS
      setLoading(true); // ACTIVAR LOADER MIENTRAS SE ENVÍA AL BACKEND
      await apiRequest(`${urlEndPointRegister}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
      });
      showSuccess('Registro Exitoso', 'Tus datos se han enviado y registrado correctamente.');
    } catch (error: unknown) {
      // CONVERTIR EL TIPO A UN ERROR CONOCIDO O EXTRAER LOS DATOS
      const apiError = error as { status?: number };
      const statusCode: number | undefined = apiError.status;

      // SI HAY VALOR Y SI ENTRE 400 Y 499
      if (statusCode && statusCode >= 400 && statusCode < 500) {
        // 4xx: PROBLEMAS DE DATOS DEL USUARIO
        showError('Error al Registrar', 'Verifica tus datos (ej. email ya registrado) e inténtalo de nuevo.');
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

  return { submitNewData, isReady };
};

export default useSendData;
