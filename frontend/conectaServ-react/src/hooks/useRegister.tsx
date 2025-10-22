import { useContext } from 'react';
import { RegisterContext } from '../context/register/RegisterContext';
import type { TRegister } from '../types/typeRegister';

const useRegister = () => {
  const context = useContext<TRegister>(RegisterContext);
  if (!context) {
    throw new Error('useRegisterPro debe usarse dentro de un RegisterProvider');
  }
  return context;
};

export default useRegister;