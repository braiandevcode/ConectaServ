import { createContext, createRef, type RefObject } from 'react';
import type { TFormVerifyCode } from '../../types/typeFormlVerifyCode';
import { formStateVerifyCodeEmail } from '../../config/formStateVerifyCodeEmail';

const arrayRefInitialValue: RefObject<(HTMLInputElement | null)[]> = { current: [] }; //ESTADO INICIAL PARA ARRAY DE REFERENCIAS
// ESTADOS INICIALES
const defaultFormVerifyEmailContext: TFormVerifyCode = {
  timerRef: createRef<NodeJS.Timeout | null>(),
  expired: false,
  inputRefs: arrayRefInitialValue,
  otp: [],
  formState: formStateVerifyCodeEmail,
  codeStoredEmail: '',
  isSendingCode: false,
  isCodeSent: false,
  isVerifyingCode: false,
  isCodeVerified: false,
  time: { min: 0, sec: 0 },
  updatedIsSuccefullyVerified: () => {},
  runTimerExpiration: () => setInterval(() => {}, 0),
  setExpired: () => {},
  setTime: () => {},
  updatedIsSentCode: () => {},
  handleChange: () => {},
  handleKeyDown: () => {},
  setFormState: () => {},
  setOtp: () => {},
  setIsCodeSent: () => {},
  setIsSendingCode: () => {},
  setIsCodeVerified: () => {},
  setIsVerifyingCode: () => {},
  updateCodeEmail: () => {},
  handleSubmit: async () => {},
  updatedIsSendingCode: () => {},
  updatedFormState: () => {},
};

export const FormVerifyEmailContext = createContext(defaultFormVerifyEmailContext); //CREAR CONTEXTO
