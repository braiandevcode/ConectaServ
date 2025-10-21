import { createContext } from 'react';
import type { TModal } from '../../types/typeModal';

const defaultModalContext: TModal = {
  setMessageState: () => {},
  showError: () => {},
  showSuccess: () => {},
  setCurrentModal: () => {},
  setIsModalOpen: () => {},
  openModal: () => {},
  closeModal: () => {},
  messageState: { type: null, text: null, title: null },
  currentModal: null,
  isModalOpen: false,
};

const ModalContext = createContext(defaultModalContext);
export default ModalContext;
