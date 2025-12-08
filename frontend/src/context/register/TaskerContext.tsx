import { createContext, createRef } from 'react';
import type { TTasker } from '../../types/typeTasker';
import { formStateValidFieldTasker } from '../../config/formStateValidFieldTasker';
import { defaultDataTasker } from '../../config/defaultDataTasker';

// DEFINIR VALORES POR DEFECTO DE LOS ESTADOS
const defaultTaskerContext: TTasker = {
  setIsSuccefullyVerified: () => {},
  setResendEmail: () => {},
  setIsSending: () => {},
  setInteractedConfirmPassword: () => {},
  setInteractedPassword: () => {},
  setConfirmPassword: () => {},
  setPassword: () => {},
  setTerms: () => {},
  onChangeTerms: () => false,
  setExpiresAt: () => {},
  setTime: () => {},
  setFormState: () => {},
  setStepData: () => {},
  setIsStepValid:() => {},
  isStepValid:false,
  stepData: defaultDataTasker,
  formState: formStateValidFieldTasker,
  isSuccefullyVerified: false,
  resendEmail: { emailCode: '' },
  timerRef: createRef<ReturnType<typeof setInterval> | null>(),
  time: { min: 0, sec: 0 },
  expiresAt: null,
  interactedConfirmPassword: false,
  isSending: false, // ==> INICIO LOADING EN FALSE
  interactedPassword: false,
  confirmPassword: '',
  password: '',
  terms: false,
};

export const TaskerContext = createContext<TTasker>(defaultTaskerContext);
