import { useContext } from 'react';
import type { TIdentifyEmail } from '../types/typeIdentifyEmail';
import FormIdentifyEmailContext from '../context/form/FormIdentifyEmailContext';
// HOOK QUE USA EL CONTEXTO DE FORMULARIO DE IDENTIFICACION DE EMAIL
const useIdentifyEmail = () => {
  const context = useContext<TIdentifyEmail>(FormIdentifyEmailContext);
  if (!context) {
    throw new Error('useIdentifyEmail debe usarse dentro de un FormIdentifyEmailProvider');
  }

  return context;
};

export default useIdentifyEmail;
