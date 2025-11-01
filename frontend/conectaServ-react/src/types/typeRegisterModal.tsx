import type { Dispatch, SetStateAction } from 'react';
import type { EModalRegistersType } from './enumModalRegistersTypes';

// TIPO PARA MODAL DE VERIFICACION
export type TRegisterModal = {
  closeRegisterModal: () => void;
  openRegisterModal: (modalType: EModalRegistersType) => void;
  setIsRegisterModalOpen: Dispatch<SetStateAction<boolean>>;
  setCurrentRegisterModal: Dispatch<SetStateAction<EModalRegistersType | null>>;
  isRegisterModalOpen: boolean;
  currentRegisterModal: EModalRegistersType | null;
};
