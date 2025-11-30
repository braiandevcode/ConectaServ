import type { Dispatch, FormEvent, SetStateAction } from 'react';
import type { TFormRole } from './typeFormRole';

// TIPO PARA ESTADOS DEL LOGIN DE USUARIO
export type TAuthLogin = {
  userName: string;
  role: TFormRole | null;
  isValid: boolean;
  interactedSession:boolean;
  setInteractedSession: Dispatch<SetStateAction<boolean>>;
  validateFieldsLogin: () => boolean;
  handlePassword: (e: FormEvent<HTMLInputElement>) => void;
  submitLogin: (e: FormEvent<HTMLFormElement>) => void;
  handleUserName: (e: FormEvent<HTMLInputElement>) => void;
  setIsValid: Dispatch<SetStateAction<boolean>>;
  setUserName: Dispatch<SetStateAction<string>>;
};
