import type { FormEvent } from 'react';
import { EDataClient, EKeyDataByStep, ENamesOfKeyLocalStorage } from '../types/enums';
import useMain from './useMain';
import useRegisterClient from './useRegisterClient';
import useGlobalModal from './useGlobalModal';
import useValidateStep from './useValidateStep';
import type { TUser } from '../types/typeUser';
import useUserApi from './useUserApi';
import useFormVerifyEmailCode from './useFormVerifyEmailCode';
import type { TFormRole } from '../types/typeFormRole';
import type { ITaskerData } from '../interfaces/iTaskerData';
import type {TImageDataStored } from '../types/typeRegisterEndDto';
import useTasker from './useTasker';

// HOOK QUE SE ENCARGA DEL PROCESO DE ENVIO DE DATOS AL BACKEND
const useSendDataRegister = () => {
  const { client } = useMain(); // HOOK QUE USA EL CONTEXTO A NIVEL MAIN
  const { password, stepData, isStepValid } = useTasker(); // HOOK QUE USA EL CONTEXTO TASKER GENERAL
  const { dataClient, isLoaded: isValid } = useRegisterClient(); // HOOK QUE USA EL CONTEXTO A NIVEL REGISTRO CLIENTE
  const { showError} = useGlobalModal(); //HOOK QUE USA CONTEXTO DE MODALES GLOBAL
  const { addUser } = useUserApi(); //HOOK PARA PETICIONES DATOS DE USUARIOS
  const { isCodeVerified } = useFormVerifyEmailCode();

  const { isLastStep } = useValidateStep(); // HOOK PARA VALIDAR PASO

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
    const isNotValidAndStepNotValid: boolean = !isStepValid || !isLastStep;

    if (isNotValidAndStepNotValid && !isValid) return; //SI AMBOS NO SON VALIDO NO SEGUIR

    //-------------------DATOS EXTRAS DE ROLE TASKER--------------------------------//
    // CON ALIAS PARA NO CHOCAR CON VARIABLE DE ESTADO
    const { valueSelected: valueSelectedAlias, ...res } = stepData[EKeyDataByStep.ONE];
    const {imageExperienceData, imageProfileData } = stepData[EKeyDataByStep.TWO];

    let dataProfileOutId:Omit<TImageDataStored, 'idImage'> | null = null;

    // SI TRAE DATOS DE IMAGEN DE PERFIL
    if(imageProfileData){
      const {idImage, ...restDataProfile } =imageProfileData;
      dataProfileOutId = {...restDataProfile};
    }

   const dataExperienceOutId: Omit<TImageDataStored, "idImage"> [] = imageExperienceData.reduce((vectorAcc, { idImage, ...rest }): Omit<TImageDataStored, 'idImage'>[] => {
      vectorAcc.push(rest);
      return vectorAcc
    },[] as Omit<TImageDataStored, 'idImage'>[]);

 
    // VERIFICAR EL ROLE QUE EL USUARIO ELIGUIO PARA EL REGISTRO Y GUARDARLO
    const newRole: TFormRole = client ? 'client' : 'tasker';

    // CREA NUEVO OBJETO APLANADO
    const dataSendTasker = {
      ...res, // SE PROPAGAN TODAS LAS PROPIEDADES
      ...(stepData[EKeyDataByStep.TWO]),
      imageProfileData:dataProfileOutId,
      imageExperienceData:dataExperienceOutId,
      budgetData:{...(stepData[EKeyDataByStep.THREE] ?? {})}, //PUEDE NO ESTAR
    } as ITaskerData;

    //------------------- DATOS DEL USUARIO ROLE CLIENTE--------------------------------//
    const { ...copy } = (dataClient[EDataClient.DATA] as TUser) ?? {};

    const baseUser:TUser = { ...copy }; // CAMPOS BASICOS FULLNAME, USERNAME, EMAIL, LOCATION

    // BANDERA QUE ESPECIFICA SI VIENEN DATOS DE ROLE TASKER
    const isTasker:boolean = newRole === 'tasker';
    // DEPENDIENDO DEL ROL ELEGUIR DE QUE REGITRO VIENEN CON DATOS BASICOS 
    // SI ES TASKER PISAMOS DATOS CON LOS DEL PASO CUATRO QUE SON EQUIVALENTES
    const mergedBase = isTasker ? {...baseUser, ...stepData[EKeyDataByStep.FOUR] ?? {}} : baseUser

    // CREA NUEVO OBJETO 
    const dataUser = {
      ...mergedBase,
      password, //SE AGREGA EL PASSWORD
      roleData:{ role: newRole },
      isVerified:isCodeVerified, //SI ESTA VERIFICADO
      taskerData: isTasker ? dataSendTasker : null
    } as TUser


    const newData:TUser = dataUser; //NUEVO USUARIOA


    console.log('DATA ENVIADA AL BACKEND: ', newData);
    
 
    await addUser({ newData }); //AGREGAR USUARIO
  };

  return { submitDataRegister };

};

export default useSendDataRegister;
