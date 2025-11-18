import { useContext } from 'react';
import { ClientContext } from '../context/register/registerClient/ClientContext';
import type { TRegisterClient } from '../types/typeRegisterClient';

const useRegisterClient = () => {
  const context = useContext<TRegisterClient>(ClientContext);
  if (!context) {
    throw new Error('useRegisterClient debe usarse dentro de un ClientProvider');
  }
  return context;
};

export default useRegisterClient;