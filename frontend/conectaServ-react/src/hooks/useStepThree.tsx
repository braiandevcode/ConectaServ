import { useContext } from 'react';
import { StepThreeContext } from '../context/register/registerPro/StepThreeContext';
import type { TTypeContextStepThree } from '../types/typeContextStepThree';

const useStepThree= () => {
  const context = useContext<TTypeContextStepThree>(StepThreeContext); // COTEXTO QUE CONSUME ESTADOS DE COMPONENTE
  if (!context) {
    throw new Error('useStepThree debe usarse dentro de un StepThreeProvider');
  }
  return context;
};

export default useStepThree;