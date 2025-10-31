import { createContext, createRef } from 'react';
import type { TTypeContextStepOne } from '../../../types/typeContextStepOne';

// DEFINIR VALORES POR DEFECTO DE LOS ESTADOS
const defaultStepOneContext: TTypeContextStepOne = {
  handleChangeSelected: () => {},
  handleCheckboxChange: () => {},
  titleRef: createRef<HTMLSelectElement>(),
};

export const StepOneContext = createContext<TTypeContextStepOne>(defaultStepOneContext);
