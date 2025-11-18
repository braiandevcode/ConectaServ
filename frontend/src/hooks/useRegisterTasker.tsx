import { useContext } from 'react';
import { TaskerContext } from '../context/register/registerTasker/TaskerContext';
import type { TRegisterTasker } from '../types/typeRegisterTasker';

const useRegisterTasker = () => {
  const context = useContext<TRegisterTasker>(TaskerContext);
  if (!context) {
    throw new Error('useRegisterTasker debe usarse dentro de un TaskerProvider');
  }
  return context;
};

export default useRegisterTasker;
