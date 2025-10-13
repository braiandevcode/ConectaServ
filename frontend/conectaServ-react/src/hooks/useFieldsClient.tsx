import { useContext } from 'react';
import type { TTypeContextBasic } from '../types/types';
import { FieldsClientContext } from '../context/register/registerClient/FieldsClientContext';

const useFieldsClient = () => {
  const context = useContext<TTypeContextBasic>(FieldsClientContext);
  if (!context) {
    throw new Error('useRegisterClient debe usarse dentro de un ClientProvider');
  }
  return context;
};

export default useFieldsClient;