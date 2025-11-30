import type { Dispatch, SetStateAction } from 'react';
import type { EModalRegistersType } from './enumModalRegistersTypes';

// TIPO PARA MODAL DE VERIFICACION
export type TRegisterModal = {
  closeRegisterModal: () => Promise<void>  | void;
  openRegisterModal: (modalType: EModalRegistersType, cb?:() => Promise<void> | void) => void;
  setIsRegisterModalOpen: Dispatch<SetStateAction<boolean>>;
  setCurrentRegisterModal: Dispatch<SetStateAction<EModalRegistersType | null>>;
  isRegisterModalOpen: boolean;
  currentRegisterModal: EModalRegistersType | null;
};
