import { useContext } from 'react';
import type { TRegister } from '../types/types';
import { RegisterContext } from '../context/register/RegisterContext';

const useRegister = () => {
  const context = useContext<TRegister>(RegisterContext);
  if (!context) {
    throw new Error('useRegisterPro debe usarse dentro de un RegisterContext');
  }
  return context;
};

export default useRegister;