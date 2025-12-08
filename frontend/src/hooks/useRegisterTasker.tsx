import { useContext } from 'react';
import { TaskerRegisterContext } from '../context/register/registerTasker/TaskerRegisterContext';
import type { TRegisterTasker } from '../types/typeRegisterTasker';

const useRegisterTasker = () => {
  const context = useContext<TRegisterTasker>(TaskerRegisterContext);
  if (!context) {
    throw new Error('useRegisterTasker debe usarse dentro de un TaskerRegisterProvider');
  }
  return context;
};

export default useRegisterTasker;
