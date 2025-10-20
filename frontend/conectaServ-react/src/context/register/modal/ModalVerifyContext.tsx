import { createContext } from 'react';
import type { TModalVerifyCode } from '../../../types/typeModalVerifyCode';

// ESTADOS INICIALES
const defaultModalVerifyContext: TModalVerifyCode = {
  codeStoredEmail: '',
  inputCodeEmail: '',
  isSendingCode: false,
//   handleInputCodeVerify: () => {},
  handleSubmit: async () => {},
  sendCode: async () => {},
  setInputCodeEmail: () => {},
  setIsSendingCode: () => {},
  updateCodeEmail: () => {},
  updatedIsSendingCode: () => {},
};

export const ModalVerifyContext = createContext(defaultModalVerifyContext); //CREAR CONTEXTO
