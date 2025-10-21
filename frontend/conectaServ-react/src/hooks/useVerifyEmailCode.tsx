import { useContext } from 'react';
import type { TModalVerifyCode } from '../types/typeModalVerifyCode';
import { ModalVerifyContext } from '../context/modal/ModalVerifyContext';

const useVerifyEmailCode = () => {
  const context = useContext<TModalVerifyCode>(ModalVerifyContext);

  if (!context) {
    throw new Error('useVerifyEmailCode debe usarse dentro de un ModalVerifyProvider');
  }

  return context;
};

export default useVerifyEmailCode;
