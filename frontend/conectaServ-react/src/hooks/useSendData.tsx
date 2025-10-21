import { endPointRegister } from '../config/constant';
import { EDataClient, EKeyDataByStep } from '../types/enums';
import type { TPlainClient } from '../types/typePlainClient';
import type { TPlaintProfessional } from '../types/typePlainDataProfesional';
import apiRequest from '../utils/apiRequestUtils';
import { clearPersistence } from '../utils/storageUtils';
import useMain from './useMain';
import useRegister from './useRegister';
import useRegisterClient from './useRegisterClient';

const useSendData = () => {
  const { setLoading, client} = useMain(); // HOOK A NIVEL MAIN => CASOS INTERACTIVOS DESDE EL INICIO
  const { password, setIsSending, stepData} = useRegister(); // HOOK A NIVEL DE REGISTROS GENERALES
  const { dataClient } = useRegisterClient(); // HOOK A NIVEL REGISTROS Cliente

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

  // ENVIAR DATOS AL BACKEND DE CUALQUIER REGISTRO LUEGO DE VERIFICAR CODIGO
  const submitNewData = async () => {
    if (client === null) return; // ==> SI NO HAY ROL NO SEGUIR
    
    const { ENDPOINT_REGISTER_CLIENT, ENDPOINT_REGISTER_PROFESSIONAL } = endPointRegister;

    // SI CLIENTE ES TRUE  NEVO DATO DE CLIENTE, SINO PROFESIONAL
    const newData = client ? dataSendClient : (dataSendProfessional as TPlaintProfessional | TPlainClient);
    const urlEndPointRegister: string = client ? ENDPOINT_REGISTER_CLIENT : ENDPOINT_REGISTER_PROFESSIONAL;

    try {
      setLoading(true); // ACTIVAR LOADER MIENTRAS SE ENVÍA AL BACKEND
      await apiRequest(`${urlEndPointRegister}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
      });
      await clearPersistence(); //RESTEAR STORAGE
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // DESACTIVAR LOADER
      setIsSending(false); // PERMITIR NUEVO ENVIO
    }
  };

  return { submitNewData };
};

export default useSendData;
