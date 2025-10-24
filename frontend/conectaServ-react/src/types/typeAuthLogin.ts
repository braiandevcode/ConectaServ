import type { Dispatch, SetStateAction } from "react";

// TIPO PARA ESTADOS DEL LOGIN DE USUARIO
export type TAuthLogin = {
  isAuth: boolean;
  error: string;
  userName: string;
  password: string;
//   role: 'client' | 'professional';
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  setUserName: Dispatch<SetStateAction<string>>;
};
