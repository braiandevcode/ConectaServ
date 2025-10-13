import type React from 'react';
import type { TLocationKey, TRegister } from '../../types/types';
import { useState } from 'react';
import { RegisterContext } from './RegisterContext';
import { EKeyDataByStep, ENamesOfKeyLocalStorage } from '../../types/enums';
import { readExistingData } from '../../utils/storageUtils';

// CONTEXTO DE ESTADOS GENERALES A FORMULARIOS
const RegisterProvider = ({ children }: { children: React.ReactNode }) => {
  const stored = readExistingData(ENamesOfKeyLocalStorage.STEP_DATA); //LEEO Y PARSEO OBJETO GENERAL DE PASOS
  const [terms, setTerms] = useState<boolean>(false); //ESTADO DE TERMINOS Y CONDICIONES EN FALSE SIEMPRE
  //BANDERA PARA SABER SI YA INTERACTUO O NO. UTIL PARA EVITAR ESTILOS INNECESARIOS AL MONTAR COMPONENTE
  const [interactedPassword, setInteractedPassword] = useState<boolean>(false);
  const [interactedConfirmPassword, setInteractedConfirmPassword] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);

  //--------------------------------------------------ESTADOS  CAMPOS BASICOS DE REGISTRO ------------------------------------------------------------------------------------------//
  const [password, setPassword] = useState<string>(''); //ESTADO EN TIEMPO RUNTIME PARA PASSWORD
  const [confirmPassword, setConfirmPassword] = useState<string>(''); //ESTADO EN TIEMPO RUNTIME PARA CONFIRMPASSWORD

  // ESTADO QUE GUARDA LO QUE ESTE EN STOREAGE EN fullName
  const [storedFullName, setStoredFullName] = useState<string>(() => {
    //FUNCION QUE LEE Y PARSEA OBJETO.INTERNAMENTE YA VERIFICA SI NO EXISTE POR DEFAULT ES => {}
    return stored[EKeyDataByStep.FOUR]?.fullName ?? ''; // ==> DATOS DESCRIPCION O VACIO
  });

  // ESTADO QUE GUARDA LO QUE ESTE EN STOREAGE EN userName
  const [storedUserName, setStoredUserName] = useState<string>(() => {
    //FUNCION QUE LEE Y PARSEA OBJETO.INTERNAMENTE YA VERIFICA SI NO EXISTE POR DEFAULT ES => {}
    return stored[EKeyDataByStep.FOUR]?.userName ?? ''; // ==> DATOS DESCRIPCION O VACIO
  });

  // ESTADO QUE GUARDA LO QUE ESTE EN STOREAGE EN email
  const [storedEmail, setStoredEmail] = useState<string>(() => {
    //FUNCION QUE LEE Y PARSEA OBJETO.INTERNAMENTE YA VERIFICA SI NO EXISTE POR DEFAULT ES => {}
    return stored[EKeyDataByStep.FOUR]?.email ?? ''; // ==> DATOS DESCRIPCION O VACIO
  });

  // ESTADOQUE GUARDA LO QUE ESTE EN STOREAGE EN location
  const [storedLocation, setStoredLocation] = useState<TLocationKey>(() => {
    //FUNCION QUE LEE Y PARSEA OBJETO.INTERNAMENTE YA VERIFICA SI NO EXISTE POR DEFAULT ES => {}
    return stored[EKeyDataByStep.FOUR]?.location ?? ''; // ==> DATOS DESCRIPCION O VACIO
  });

  //ONCHANGE TERMINOS Y CONDICIONES
  const onChangeTerms = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerms(e.target.checked);
  };

  //VALORES DE ESTADOS QUE CONSUME EL CONTEXTO
  const contextValuesRegister: TRegister = {
    setInteractedConfirmPassword,
    setInteractedPassword,
    onChangeTerms,
    setTerms,
    setConfirmPassword,
    setPassword,
    setStoredEmail,
    setStoredFullName,
    setStoredLocation,
    setStoredUserName,
    setIsSending,
    isSending,
    confirmPassword,
    interactedConfirmPassword,
    password,
    storedEmail,
    storedFullName,
    storedLocation,
    storedUserName,
    terms,
    interactedPassword,
  };

  // RETORNAMOS EL PROVIDER  DE REGISTROS
  return <RegisterContext.Provider value={contextValuesRegister}>{children}</RegisterContext.Provider>;
};

export default RegisterProvider;
