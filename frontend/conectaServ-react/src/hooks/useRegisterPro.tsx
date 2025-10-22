import { useContext } from 'react';
import { ProfessionalContext } from '../context/register/registerPro/ProfessionalContext';
import type { TRegisterPro } from '../types/typeRegisterProfessional';

const useRegisterPro = () => {
  const context = useContext<TRegisterPro>(ProfessionalContext);
  if (!context) {
    throw new Error('useRegisterPro debe usarse dentro de un ProfessionalProvider');
  }
  return context;
};

export default useRegisterPro;
