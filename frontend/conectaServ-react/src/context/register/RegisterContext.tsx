import { createContext } from 'react';
import type { TRegister } from '../../types/typeRegister';
import { emptyStepData } from '../../config/constant';

// DEFINIR VALORES POR DEFECTO DE LOS ESTADOS
const defaultRegisterContext: TRegister = {
  setStepData: () => {},
  setIsSending: () => {},
  setInteractedConfirmPassword: () => {},
  setInteractedPassword: () => {},
  setConfirmPassword: () => {},
  setPassword: () => {},
  setTerms: () => {},
  onChangeTerms: () => false,
  interactedConfirmPassword: false,
  isSending: false, // ==> INICIO LOADING EN FALSE
  interactedPassword: false,
  confirmPassword: '',
  password: '',
  terms: false,
  stepData: emptyStepData,
};

export const RegisterContext = createContext<TRegister>(defaultRegisterContext);
