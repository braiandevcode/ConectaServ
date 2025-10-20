import type { Dispatch, SetStateAction } from 'react';
import type { TRole } from './typeModalRole';
import type { EModalType } from './enumModalTypes';
import type { iMessageState } from '../interfaces/iMessageState';

// INTERFACE QUE DEFINE ESTADOS A NIVEL MAIN, PARA MODALES, LOADER Y MAS
export type TMain = TRole & {
  closeModal: () => void;
  openModal: (modalType: EModalType) => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setCurrentModal: Dispatch<SetStateAction<EModalType | null>>;
  setMessageState: React.Dispatch<React.SetStateAction<iMessageState>>;
  showError: (text: string, title:string) => void;
  showSuccess: (text: string, title:string) => void;
  messageState: iMessageState;
  loading: boolean;
  isModalOpen: boolean;
  currentModal: EModalType | null;
};
