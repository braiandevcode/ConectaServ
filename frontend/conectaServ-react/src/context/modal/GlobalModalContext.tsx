import { createContext } from 'react';
import type { TGlobalModal } from '../../types/typeGlobalModal';

const defaultGlobalModalContext: TGlobalModal = {
  setMessageState: () => {},
  showError: () => {},
  showSuccess: () => {},
  setCurrentGlobalModal: () => {},
  setIsGlobalModalOpen: () => {},
  openGlobalModal: () => {},
  closeGlobalModal: () => {},
  messageState: { type: null, text: null, title: null },
  currentGlobalModal: null,
  isGlobalModalOpen: false,
};

const GlobalModalContext = createContext(defaultGlobalModalContext);
export default GlobalModalContext;
