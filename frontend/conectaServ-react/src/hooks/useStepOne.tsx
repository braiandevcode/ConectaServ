import { useContext } from 'react';
import { StepOneContext } from '../context/register/registerPro/StepOneContext';
import type { TTypeContextStepOne } from '../types/types';

const useStepOne = () => {
  const context = useContext<TTypeContextStepOne>(StepOneContext);
  if (!context) {
    throw new Error('useStepOne debe usarse dentro de un StepOneProvider');
  }
  return context;
};

export default useStepOne;