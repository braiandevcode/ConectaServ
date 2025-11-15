import type { FormEvent } from 'react';
import { EDataClient, ENamesOfKeyLocalStorage } from '../types/enums';
import useMain from './useMain';
import useRegister from './useRegister';
import useRegisterClient from './useRegisterClient';
// import useRegisterTasker from './useRegisterTasker';
import useGlobalModal from './useGlobalModal';
import useValidateStep from './useValidateStep';
import type { TUser } from '../types/typeUser';
import useUserApi from './useUserApi';
import useFormVerifyEmailCode from './useFormVerifyEmailCode';

// HOOK QUE SE ENCARGA DEL PROCESO DE ENVIO DE DATOS AL BACKEND
const useSendDataRegister = () => {
  const { client } = useMain(); // HOOK QUE USA EL CONTEXTO A NIVEL MAIN
  const { password } = useRegister(); // HOOK QUE USA EL CONTEXTO A NIVEL REGISTRO GENERALES
  const { dataClient, isLoaded: isValid } = useRegisterClient(); // HOOK QUE USA EL CONTEXTO A NIVEL REGISTRO CLIENTE
  // const { stepData, isLoaded: isLoadedProfessional, isStepValid } = useRegisterTasker(); // HOOK QUE USA EL CONTEXTO A NIVEL REGISTRO PROFESIONAL
  const { showError} = useGlobalModal(); //HOOK QUE USA CONTEXTO DE MODALES GLOBAL
  const { addUser } = useUserApi(); //HOOK PARA PETICIONES DATOS DE USUARIOS
  const { isCodeVerified } = useFormVerifyEmailCode();

  const { isLastStep } = useValidateStep(); // HOOK PARA VALIDAR PASO

  // SI SE CARGO TODO EN CONTEXTO DE CLIENTE Y EN PROFESIONAL
  // const isReady: boolean = isLoadedClient || isLoadedProfessional;

  // ENVIAR DATOS AL BACKEND DE CUALQUIERA DE LOS DOS REGISTROS
  const submitDataRegister= async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // ==> PREVENIR

    // LEER ITEM DE ROLE
    const storedRole: string | null = localStorage.getItem(ENamesOfKeyLocalStorage.ROLE);

    // CONDICIONAL PARA ASEGURAR QUE UN ROLE EXISTA
    if (!storedRole && client === null) {
      showError('Error de Registro', 'No se ha seleccionado un rol para el registro.');
      return;
    }

    // SI NO ES VALIDO O NO CORRESPONDE AL PASO FINAL
    // const isNotValidAndStepNotValid: boolean = !isStepValid || !isLastStep;

    const isNotValidAndStepNotValid: boolean = !isLastStep;

    if (isNotValidAndStepNotValid && !isValid) return; //SI AMBOS NO SON VALIDO NO SEGUIR

    //-------------------OBJETO APLANADO PARA ENVIO DATOS DEL PROFESIONAL--------------------------------//
    // CON ALIAS PARA NO CHOCAR CON VARIABLE DE ESTADO
    // const { valueSelected: valueSelectedAlias, ...res } = stepData[EKeyDataByStep.ONE];

    // VERIFICAR EL ROLE QUE EL USUARIO ELIGUIO PARA EL REGISTRO Y GUARDARLO
    const newRole: string = client ? 'client' : 'tasker';

    // // CREA NUEVO OBJETO APLANADO
    // const dataSendTasker = {
    //   ...res, // SE PROPAGAN TODAS LAS PROPIEDADES DE CADA PASO
    //   ...stepData[EKeyDataByStep.TWO],
    //   ...(stepData[EKeyDataByStep.THREE] ?? {}), //PUEDE NO ESTAR
    //   ...stepData[EKeyDataByStep.FOUR],
    //   password, //SE AGREGA EL PASSWORD
    //   roles: newRole,
    //   isVerified: isCodeVerified, //SI ESTA VERIFICADO
    // } as TPlaintTasker;

    //-------------------OBJETO APLANADO PARA ENVIO DATOS DEL CLIENTE--------------------------------//
    const { ...copy } = (dataClient[EDataClient.DATA] as TUser) ?? {};

    // CREA NUEVO OBJETO APLANADO
    const dataUser = {
      ...copy,
      password, //SE AGREGA EL PASSWORD
      roles: newRole, //AGREGAR ROLE
      isVerified:isCodeVerified //SI ESTA VERIFICADO
    } as TUser


    // SI CLIENTE ES TRUE  NEVO DATO DE CLIENTE, SINO PROFESIONAL
    // const newData: TUser = client ? dataSendClient : dataSendTasker;

    const newData:TUser = dataUser;
 
    await addUser({ newData}); //AGREGAR USUARIO
  };

  // return { submitDataRegister,  isReady };
  return { submitDataRegister };

};

export default useSendDataRegister;
