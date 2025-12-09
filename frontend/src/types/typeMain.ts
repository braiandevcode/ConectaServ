import type { Dispatch, SetStateAction } from 'react';
import type { TRole } from './typeModalRole';
import type { TDataPayloadUser } from './typeDataPayloadUser';
import type { TActiveTaskerUser } from './typeActiveTaskUser';
import type { TDataPayloadTaskerSingle } from './typeDataPayloadTaskerSingle';

// INTERFACE QUE DEFINE ESTADOS A NIVEL MAIN, PARA MODALES, LOADER Y MAS
export type TMain = TRole & {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setAccessToken:Dispatch<SetStateAction<string| null>>;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  setIsSessionChecked:  Dispatch<SetStateAction<boolean>>;
  setIsLogout:  Dispatch<SetStateAction<boolean>>;
  setUserData: Dispatch<SetStateAction<TDataPayloadUser| null>>,
  setTaskerData:Dispatch<SetStateAction<TActiveTaskerUser[]>>
  setSelectedTaskerProfile: Dispatch<SetStateAction<TDataPayloadTaskerSingle | undefined>>;
  onBackToList: () => void;
  selectedTaskerProfile:TDataPayloadTaskerSingle | undefined;
  taskerData:TActiveTaskerUser[], 
  userData:TDataPayloadUser | null,
  isLogout:boolean,
  isSessionChecked:boolean;
  isAuth: boolean;
  accessToken:string | null;
  loading: boolean;
};
