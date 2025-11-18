import type { Dispatch, SetStateAction } from 'react';
import type { TRole } from './typeModalRole';

// INTERFACE QUE DEFINE ESTADOS A NIVEL MAIN, PARA MODALES, LOADER Y MAS
export type TMain = TRole & {
  setLoading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
};
