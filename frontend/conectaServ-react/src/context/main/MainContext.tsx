import { createContext } from 'react';
import type { TMain } from '../../types/types';

const defaultMainContext: TMain = {
  setIsModalClosed: () => true,
  setLoading: () => false,
  loading: false,
  isShow: '',
  client: false,
  isModalClosed: true,
  handleToggleModal: () => {},
  handleClientClick: () => {},
  handleProClick: () => {},
  isModalOpen:false, 
  setIsModalOpen: () => {},
};

const MainContext = createContext(defaultMainContext);
export default MainContext;
