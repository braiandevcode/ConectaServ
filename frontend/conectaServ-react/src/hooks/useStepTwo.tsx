import { useContext } from 'react';
import { StepTwoContext } from '../context/register/registerPro/StepTwoContext';
import type { TTypeContextStepTwo } from '../types/types';

const useStepTwo = () => {
  const context = useContext<TTypeContextStepTwo>(StepTwoContext);
  if (!context) {
    throw new Error('useStepTwo debe usarse dentro de un StepTwoProvider');
  }
  return context;
};

export default useStepTwo;
