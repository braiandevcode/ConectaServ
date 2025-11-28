import { createContext } from 'react';
import type { TAuthLogin } from '../../types/typeAuthLogin';

// CONTEXTO PARA LOGIN

// const authRef: RefObject<(boolean)> = { current: false };
const defaultAuthLogin: TAuthLogin = {
  role: null,
  isValid: false,
  error: '',
  password: '',
  userName: '',
  // authRef,
  validateFieldsLogin: () => false,
  handlePassword: () => {},
  handleUserName: () => {},
  submitLogin: () => {},
  setIsValid: () => {},
  setError: () => {},
  setPassword: () => {},
  setUserName: () => {},
};

const LoginContext = createContext<TAuthLogin>(defaultAuthLogin);
export default LoginContext;
