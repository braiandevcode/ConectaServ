import { useContext } from 'react';
import VerifyModalContext from '../context/modal/RegisterModalContext';

const useRegisterModal = () => {
  const context = useContext(VerifyModalContext);

  if (!context) {
    throw new Error('useRegisterModal debe usarse dentro de un RegisterModalProvider');
  }

  return context;
};

export default useRegisterModal;
