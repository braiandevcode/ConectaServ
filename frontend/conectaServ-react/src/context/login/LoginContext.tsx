import { createContext } from 'react';
import type { TAuthLogin } from '../../types/typeAuthLogin';

// CONTEXTO PARA LOGIN
const defaultAuthLogin: TAuthLogin = {
  validateFieldsLogin: () => false,
  role: null,
  isValid: false,
  error: '',
  isAuth: false,
  password: '',
  userName: '',
  handlePassword: () => {},
  handleUserName: () => {},
  submitLogin: () => {},
  setIsValid: () => {},
  setError: () => {},
  setIsAuth: () => {},
  setPassword: () => {},
  setUserName: () => {},
};

const LoginContext = createContext<TAuthLogin>(defaultAuthLogin);
export default LoginContext;
