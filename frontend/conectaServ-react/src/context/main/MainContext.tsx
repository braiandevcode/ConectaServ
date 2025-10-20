import { createContext } from 'react';
import type { TMain } from '../../types/typeMain';

const defaultMainContext: TMain = {
  setMessageState: () => {},
  showError: () => {},
  showSuccess: () => {},
  setCurrentModal: () => {},
  setIsModalOpen: () => {},
  openModal: () => {},
  closeModal: () => {},
  setLoading: () => false,
  handleClientClick: () => {},
  handleProClick: () => {},
  messageState: { type: null, text: null, title:null },
  currentModal: null,
  loading: false,
  client: false,
  isModalOpen: false,
};

const MainContext = createContext(defaultMainContext);
export default MainContext;
