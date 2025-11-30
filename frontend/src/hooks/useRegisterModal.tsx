import { useContext } from 'react';
import VerifyModalContext from '../context/modal/RegisterModalContext';
import type { TRegisterModal } from '../types/typeRegisterModal';

const useRegisterModal = () => {
  const context = useContext<TRegisterModal>(VerifyModalContext);

  if (!context) {
    throw new Error('useRegisterModal debe usarse dentro de un RegisterModalProvider');
  }

  return context;
};

export default useRegisterModal;
