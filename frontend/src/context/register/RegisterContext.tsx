import { createContext, createRef } from 'react';
import type { TRegister } from '../../types/typeRegister';

// DEFINIR VALORES POR DEFECTO DE LOS ESTADOS
const defaultRegisterContext: TRegister = {
  isSuccefullyVerified: false,
  resendEmail: { emailCode: '' },
  setIsSuccefullyVerified: () => {},
  setResendEmail: () => {},
  setIsSending: () => {},
  setInteractedConfirmPassword: () => {},
  setInteractedPassword: () => {},
  setConfirmPassword: () => {},
  setPassword: () => {},
  setTerms: () => {},
  onChangeTerms: () => false,
  timerRef: createRef<ReturnType<typeof setInterval> | null>(),
  time: { min: 0, sec: 0 },
  expiresAt:null,
  setExpiresAt: () => {},
  setTime: () => {},
  interactedConfirmPassword: false,
  isSending: false, // ==> INICIO LOADING EN FALSE
  interactedPassword: false,
  confirmPassword: '',
  password: '',
  terms: false,
};

export const RegisterContext = createContext<TRegister>(defaultRegisterContext);
