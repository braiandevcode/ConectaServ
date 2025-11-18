import type { Dispatch, FormEvent, SetStateAction } from 'react';

// TIPO PARA ESTADOS DEL LOGIN DE USUARIO
export type TAuthLogin = {
  isAuth: boolean;
  error: string;
  userName: string;
  password: string;
  role: 'client' | 'tasker' | null;
  isValid: boolean;
  validateFieldsLogin: () => boolean;
  handlePassword: (e: FormEvent<HTMLInputElement>) => void;
  submitLogin: (e: FormEvent<HTMLFormElement>) => void;
  handleUserName: (e: FormEvent<HTMLInputElement>) => void;
  setIsValid: Dispatch<SetStateAction<boolean>>;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  setUserName: Dispatch<SetStateAction<string>>;
};
