import type { Dispatch, SetStateAction } from 'react';
import type { TRole } from './typeModalRole';

// INTERFACE QUE DEFINE ESTADOS A NIVEL MAIN, PARA MODALES, LOADER Y MAS
export type TMain = TRole & {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setAccessToken:Dispatch<SetStateAction<string| null>>;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  setIsSessionChecked:  Dispatch<SetStateAction<boolean>>;
  setIsLogout:  Dispatch<SetStateAction<boolean>>;
  isLogout:boolean,
  isSessionChecked:boolean;
  isAuth: boolean;
  accessToken:string | null;
  loading: boolean;
};
