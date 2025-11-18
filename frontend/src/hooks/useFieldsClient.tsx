import { useContext } from 'react';
import { FieldsClientContext } from '../context/register/registerClient/FieldsClientContext';
import type { TTypeContextBasic } from '../types/typeContextBasic';

const useFieldsClient = () => {
  const context = useContext<TTypeContextBasic>(FieldsClientContext);
  if (!context) {
    throw new Error('useRegisterClient debe usarse dentro de un ClientProvider');
  }
  return context;
};

export default useFieldsClient;