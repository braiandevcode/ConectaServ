import { createContext } from 'react';
import type { TAuthLogin } from '../../types/typeAuthLogin';

// CONTEXTO PARA LOGIN
const defaultAuthLogin: TAuthLogin = {
//   role: 'client',
  error: '',
  isAuth: false,
  password: '',
  userName: '',
  setError: () => {},
  setIsAuth: () => {},
  setPassword: () => {},
  setUserName: () => {},
  //   role: 'client' | 'professional',
  //   formStateLogin:
};

const LoginContext = createContext<TAuthLogin>(defaultAuthLogin);
export default LoginContext;
