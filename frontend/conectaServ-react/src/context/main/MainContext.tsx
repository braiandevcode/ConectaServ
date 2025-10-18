import { createContext } from 'react';
import type { TMain } from '../../types/typeMain';

const defaultMainContext: TMain = {
  setCurrentModal: () => {},
  setIsModalOpen: () => {},
  openModal: () => {},
  closeModal: () => {},
  setLoading: () => false,
  handleClientClick: () => {},
  handleProClick: () => {},
  currentModal: null,
  loading: false,
  client: false,
  isModalOpen: false,
};

const MainContext = createContext(defaultMainContext);
export default MainContext;
