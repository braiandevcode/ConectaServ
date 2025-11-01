import { useContext } from 'react';
import type { TTypeContextBasic } from '../types/typeContextBasic';
import { StepFourContext } from '../context/register/registerTasker/StepFourContext';

const useStepFour= () => {
  const context = useContext<TTypeContextBasic>(StepFourContext); // COTEXTO QUE CONSUME ESTADOS DE COMPONENTE
  if (!context) {
    throw new Error('useStepFour debe usarse dentro de un StepFourProvider');
  }
  return context;
};

export default useStepFour;