import { useContext } from 'react';
import ModalContext from '../context/modal/GlobalModalContext';
import type { TGlobalModal } from '../types/typeGlobalModal';

const useGlobalModal = () => {
  const context = useContext<TGlobalModal>(ModalContext);
  if (!context) {
    throw new Error('useGlobalModal debe usarse dentro de un ModalGlobalProvider');
  }

  return context;
};

export default useGlobalModal;