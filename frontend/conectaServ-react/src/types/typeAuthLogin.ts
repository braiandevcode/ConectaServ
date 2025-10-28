import type { Dispatch, FormEvent, SetStateAction } from 'react';

// TIPO PARA ESTADOS DEL LOGIN DE USUARIO
export type TAuthLogin = {
  isAuth: boolean;
  error: string;
  userName: string;
  password: string;
  role: 'client' | 'tasker' | null;
  interactedPassword: boolean;
  handlePassword: (e: FormEvent<HTMLInputElement>) => void;
  submitLogin: (e: FormEvent<HTMLFormElement>) => void;
  handleUserName: (e: FormEvent<HTMLInputElement>) => void;
  setInteractedPassword: Dispatch<SetStateAction<boolean>>;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  setUserName: Dispatch<SetStateAction<string>>;
};
