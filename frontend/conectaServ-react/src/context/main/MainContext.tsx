import { createContext } from 'react';
import type { TMain } from '../../types/typeMain';

const defaultMainContext: TMain = {
  setIsModalOpen: () =>{},
  closeModal:() => {},
  setIsModalClosed: () => true,
  setLoading: () => false,
  handleToggleModal: () => {},
  handleClientClick: () => {},
  handleProClick: () => {},
  loading: false,
  isShow: '',
  client: false,
  isModalClosed: true,
  isModalOpen:false, 
};

const MainContext = createContext(defaultMainContext);
export default MainContext;
