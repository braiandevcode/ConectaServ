import { createContext } from 'react';
import type { TRegister } from '../../types/types';
import { ELocationKey } from '../../types/enums';

// DEFINIR VALORES POR DEFECTO DE LOS ESTADOS
const defaultRegisterContext: TRegister = {
  isSending:false,
  setIsSending: () => {},
  interactedConfirmPassword:false,
  setInteractedConfirmPassword: () => {},
  setInteractedPassword: () => {},
  setConfirmPassword: () => {},
  setPassword: () => {},
  setStoredFullName: () => {},
  setStoredUserName: () => {},
  setStoredEmail: () => {},
  setStoredLocation: () => {},
  setTerms: () => {},
  interactedPassword: false,
  storedFullName: '',
  storedUserName: '',
  storedLocation: ELocationKey.NONE,
  storedEmail: '',
  confirmPassword: '',
  password: '',
  terms: false,
  onChangeTerms: () => false,
};

export const RegisterContext = createContext<TRegister>(defaultRegisterContext);
