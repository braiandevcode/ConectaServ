import { useContext } from 'react';

import type { TRegisterPro } from '../types/types';
import { ProfessionalContext } from '../context/register/registerPro/ProfessionalContext';

const useRegisterPro = () => {
  const context = useContext<TRegisterPro>(ProfessionalContext);
  if (!context) {
    throw new Error('useRegisterPro debe usarse dentro de un ProfessionalContext');
  }
  return context;
};

export default useRegisterPro;
