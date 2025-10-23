import { createContext, type RefObject } from 'react';
import type { TFormVerifyCode } from '../../types/typeFormlVerifyCode';
import { formStateVerifyCodeEmail } from '../../config/constant';

const arrayRefInitialValue: RefObject<(HTMLInputElement | null)[]> = { current: [] }; //ESTADO INICIAL PARA ARRAY DE REFERENCIAS
// ESTADOS INICIALES
const defaultFormVerifyEmailContext: TFormVerifyCode = {
  inputRefs: arrayRefInitialValue,
  isSuccefullyVerified: false,
  otp: [],
  formState: formStateVerifyCodeEmail,
  codeStoredEmail: '',
  isSendingCode: false,
  isCodeSent: false,
  isVerifyingCode: false,
  isCodeVerified: false,
  handleChange: () => {},
  handleKeyDown: () => {},
  setIsSuccefullyVerified: () => {},
  setFormState: () => {},
  setOtp: () => {},
  setIsCodeSent: () => {},
  setIsSendingCode: () => {},
  setIsCodeVerified: () => {},
  setIsVerifyingCode: () => {},
  updateCodeEmail: () => {},
  handleSubmit: async () => {},
  sendCode: async () => {},
  updatedIsSendingCode: () => {},
  updatedFormState: () => {},
};

export const FormVerifyEmailContext = createContext(defaultFormVerifyEmailContext); //CREAR CONTEXTO
