import { createContext, type RefObject } from 'react';
import type { TGlobalModal } from '../../types/typeGlobalModal';



const onCloseCbRefInitialValue: RefObject<(()=> Promise<void> | void) | null> = { current: null }; //ESTADO INICIAL PARA ARRAY DE REFERENCIAS
const defaultGlobalModalContext: TGlobalModal = {
  setMessageState: () => {},
  showError: () => {},
  showSuccess: () => {},
  setCurrentGlobalModal: () => {},
  setIsGlobalModalOpen: () => {},
  openGlobalModal: () => {},
  closeGlobalModal: () => {},
  onCloseCallbackRef: onCloseCbRefInitialValue,
  messageState: { type: null, text: null, title: null },
  currentGlobalModal: null,
  isGlobalModalOpen: false,
};

const GlobalModalContext = createContext(defaultGlobalModalContext);
export default GlobalModalContext;
