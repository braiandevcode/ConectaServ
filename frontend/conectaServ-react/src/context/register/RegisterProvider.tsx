import { useState, type ChangeEvent, type ReactNode } from 'react';
import { RegisterContext } from './RegisterContext';
import { EKeyDataByStep, ENamesOfKeyLocalStorage } from '../../types/enums';
import type { TRegister } from '../../types/typeRegister';
import type { TStepData } from '../../types/typeStepData';
import { emptyStepData } from '../../config/constant';
import { readExistingData } from '../../utils/storageUtils';

// CONTEXTO DE ESTADOS GENERALES A FORMULARIOS
const RegisterProvider = ({ children }: { children: ReactNode }) => {
  const stored = readExistingData(ENamesOfKeyLocalStorage.STEP_DATA); //LEEO Y PARSEO OBJETO GENERAL DE PASOS

  // OBJETO GENERAL DE PASOS CON VALORES POR DEFECTO Y PARA ALMACENAR EN STROAGE
  const [stepData, setStepData] = useState<TStepData>(() => {
    return {
      [EKeyDataByStep.ONE]: {
        ...emptyStepData[EKeyDataByStep.ONE], //VALOR POR DEFECTO
        ...stored?.[EKeyDataByStep.ONE], // PISADO PODR EL VALOR EN STORAGE
      },
      [EKeyDataByStep.TWO]: {
        ...emptyStepData[EKeyDataByStep.TWO],
        ...stored?.[EKeyDataByStep.TWO],
      },
      [EKeyDataByStep.THREE]: {
        ...emptyStepData[EKeyDataByStep.THREE],
        ...stored?.[EKeyDataByStep.THREE],
      },
      [EKeyDataByStep.FOUR]: {
        ...emptyStepData[EKeyDataByStep.FOUR],
        ...stored?.[EKeyDataByStep.FOUR],
      },
    };
  });

  //ESTADO DE TERMINOS Y CONDICIONES EN FALSE SIEMPRE
  const [terms, setTerms] = useState<boolean>(false); 
  //BANDERA PARA SABER SI YA INTERACTUO O NO EN PASSWORD Y CONFIRMAR PASSWORD. UTIL PARA EVITAR ESTILOS INNECESARIOS AL MONTAR COMPONENTE
  const [interactedPassword, setInteractedPassword] = useState<boolean>(false);
  const [interactedConfirmPassword, setInteractedConfirmPassword] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);// ESTADO PARA BANDERA DE SI SE ESTA ENVIANDO
  const [password, setPassword] = useState<string>(''); //ESTADO EN TIEMPO RUNTIME PARA PASSWORD
  const [confirmPassword, setConfirmPassword] = useState<string>(''); //ESTADO EN TIEMPO RUNTIME PARA CONFIRMPASSWORD
  
  //ONCHANGE TERMINOS Y CONDICIONES
  const onChangeTerms = (e: ChangeEvent<HTMLInputElement>) => {
    setTerms(e.target.checked);
  };

  //VALORES DE ESTADOS QUE CONSUME EL CONTEXTO
  const contextValuesRegister: TRegister = {
    setStepData,
    setInteractedConfirmPassword,
    setInteractedPassword,
    onChangeTerms,
    setTerms,
    setConfirmPassword,
    setPassword,
    setIsSending,
    stepData,
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
