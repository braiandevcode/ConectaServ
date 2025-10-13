import { useContext } from 'react';
import type { TRegisterClient } from '../types/types';
import { ClientContext } from '../context/register/registerClient/ClientContext';

const useRegisterClient = () => {
  const context = useContext<TRegisterClient>(ClientContext);
  if (!context) {
    throw new Error('useRegisterClient debe usarse dentro de un ClientProvider');
  }
  return context;
};

export default useRegisterClient;