import { createContext } from 'react';
import type { TRegister } from '../../types/typeRegister';

// DEFINIR VALORES POR DEFECTO DE LOS ESTADOS
const defaultRegisterContext: TRegister = {
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
};

export const RegisterContext = createContext<TRegister>(defaultRegisterContext);
