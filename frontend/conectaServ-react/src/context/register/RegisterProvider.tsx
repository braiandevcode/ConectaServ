import type React from 'react';
import type { TRegister } from '../../types/types';
import { useState } from 'react';
import { RegisterContext } from './RegisterContext';
// import { EKeyDataByStep, ENamesOfKeyLocalStorage } from '../../types/enums';
// import { readExistingData } from '../../utils/storageUtils';

// CONTEXTO DE ESTADOS GENERALES A FORMULARIOS
const RegisterProvider = ({ children }: { children: React.ReactNode }) => {
  // const stored = readExistingData(ENamesOfKeyLocalStorage.STEP_DATA); //LEEO Y PARSEO OBJETO GENERAL DE PASOS
  const [terms, setTerms] = useState<boolean>(false); //ESTADO DE TERMINOS Y CONDICIONES EN FALSE SIEMPRE
  //BANDERA PARA SABER SI YA INTERACTUO O NO. UTIL PARA EVITAR ESTILOS INNECESARIOS AL MONTAR COMPONENTE
  const [interactedPassword, setInteractedPassword] = useState<boolean>(false);
  const [interactedConfirmPassword, setInteractedConfirmPassword] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [codeEmail, setCodeEmail] = useState<string>(() => {
    const storedCodeEmail: string | null = localStorage.getItem('codeEmail');
    return storedCodeEmail ?? '';
  });

  //--------------------------------------------------ESTADOS  CAMPOS BASICOS DE REGISTRO ------------------------------------------------------------------------------------------//
  const [password, setPassword] = useState<string>(''); //ESTADO EN TIEMPO RUNTIME PARA PASSWORD
  const [confirmPassword, setConfirmPassword] = useState<string>(''); //ESTADO EN TIEMPO RUNTIME PARA CONFIRMPASSWORD
  

  //ONCHANGE TERMINOS Y CONDICIONES
  const onChangeTerms = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerms((prev) => (prev = e.target.checked));
  };

  //VALORES DE ESTADOS QUE CONSUME EL CONTEXTO
  const contextValuesRegister: TRegister = {
    codeEmail,
    setCodeEmail,
    setInteractedConfirmPassword,
    setInteractedPassword,
    onChangeTerms,
    setTerms,
    setConfirmPassword,
    setPassword,
    setIsSending,
    isSending,
    confirmPassword,
    interactedConfirmPassword,
    password,
    terms,
    interactedPassword,
  };

  // RETORNAMOS EL PROVIDER  DE REGISTROS
  return <RegisterContext.Provider value={contextValuesRegister}>{children}</RegisterContext.Provider>;
};

export default RegisterProvider;
