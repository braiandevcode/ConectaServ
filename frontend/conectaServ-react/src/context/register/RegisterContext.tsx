import { createContext } from 'react';
import type { TRegister } from '../../types/typeRegister';

// DEFINIR VALORES POR DEFECTO DE LOS ESTADOS
const defaultRegisterContext: TRegister = {
  inputCodeEmail:'',
  setInputCodeEmail: () => {},
  codeEmail: '', // ==> INICIO CODIGO A CERO
  updateCodeEmail: () => {},
  isSending: false, // ==> INICIO LOADING EN FALSE
  setIsSending: () => {},
  interactedConfirmPassword: false,
  setInteractedConfirmPassword: () => {},
  setInteractedPassword: () => {},
  setConfirmPassword: () => {},
  setPassword: () => {},
  setTerms: () => {},
  interactedPassword: false,
  confirmPassword: '',
  password: '',
  terms: false,
  onChangeTerms: () => false,
};

export const RegisterContext = createContext<TRegister>(defaultRegisterContext);
