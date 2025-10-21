import { useContext } from 'react';
import type { TModal } from '../types/typeModal';
import ModalContext from '../context/modal/ModalContext';

const useModal = () => {
  const context = useContext<TModal>(ModalContext);
  if (!context) {
    throw new Error('useModal debe usarse dentro de un ModalProvider');
  }

  return context;
};

export default useModal;