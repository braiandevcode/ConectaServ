import { createContext } from 'react';
import type { TFormVerifyCode } from '../../types/typeFormlVerifyCode';
import { formStateVerifyCodeEmail } from '../../config/constant';

// ESTADOS INICIALES
const defaultFormVerifyEmailContext: TFormVerifyCode = {
  otp:[],
  setOtp: () => {},
  formState:formStateVerifyCodeEmail,
  setFormState: () => {},
  codeStoredEmail: '',
  // inputCodeEmail: '',
  isSendingCode: false,
  handleSubmit: async () => {},
  sendCode: async () => {},
  // setInputCodeEmail: () => {},
  setIsSendingCode: () => {},
  updateCodeEmail: () => {},
  updatedIsSendingCode: () => {},
  updatedFormState:() => {}
};

export const FormVerifyEmailContext = createContext(defaultFormVerifyEmailContext); //CREAR CONTEXTO
