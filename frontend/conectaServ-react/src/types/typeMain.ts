import type { Dispatch, SetStateAction } from 'react';
import type { TRole } from './typeModalRole';
import type { EModalType } from './enumModalTypes';

// INTERFACE QUE DEFINE ESTADOS A NIVEL MAIN, PARA MODALES, LOADER Y MAS
export type TMain = TRole & {
  closeModal: () => void;
  openModal: (modalType:EModalType) => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  isModalOpen: boolean;
  currentModal:EModalType | null,
  setCurrentModal: Dispatch<SetStateAction<EModalType | null>>
};
