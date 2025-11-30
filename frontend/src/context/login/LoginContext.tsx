import { createContext } from 'react';
import type { TAuthLogin } from '../../types/typeAuthLogin';

// CONTEXTO PARA LOGIN
const defaultAuthLogin: TAuthLogin = {
  role: null,
  isValid: false,
  userName: '',
  interactedSession: false,
  setInteractedSession: () => {},
  validateFieldsLogin: () => false,
  handlePassword: () => {},
  handleUserName: () => {},
  submitLogin: () => {},
  setIsValid: () => {},
  setUserName: () => {},
};

const LoginContext = createContext<TAuthLogin>(defaultAuthLogin);
export default LoginContext;
