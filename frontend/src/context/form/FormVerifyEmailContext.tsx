import { createContext, type RefObject } from 'react';
import type { TFormVerifyCode } from '../../types/typeFormlVerifyCode';
import { formStateVerifyCodeEmail } from '../../config/formStateVerifyCodeEmail';

const arrayRefInitialValue: RefObject<(HTMLInputElement | null)[]> = { current: [] }; //ESTADO INICIAL PARA ARRAY DE REFERENCIAS
// ESTADOS INICIALES
const defaultFormVerifyEmailContext: TFormVerifyCode = {
  expired: false,
  inputRefs: arrayRefInitialValue,
  otp: [],
  formState: formStateVerifyCodeEmail,
  token:'',
  isSendingCode: false,
  isCodeSent: false,
  isVerifyingCode: false,
  isCodeVerified: false,
  handlePaste: () => {},
  setToken: () => {},
  updatedIsSuccefullyVerified: () => {},
  runTimerExpiration: () => setInterval(() => {}, 0),
  setExpired: () => {},
  updatedIsSentCode: () => {},
  handleChange: () => {},
  handleKeyDown: () => {},
  setFormState: () => {},
  setOtp: () => {},
  setIsCodeSent: () => {},
  setIsSendingCode: () => {},
  setIsCodeVerified: () => {},
  setIsVerifyingCode: () => {},
  updateTokenEmail: () => {},
  handleSubmit: async () => {},
  updatedIsSendingCode: () => {},
  updatedFormState: () => {},
};

export const FormVerifyEmailContext = createContext(defaultFormVerifyEmailContext); //CREAR CONTEXTO
