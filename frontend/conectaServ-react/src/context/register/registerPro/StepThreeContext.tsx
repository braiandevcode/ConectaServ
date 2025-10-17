import { createContext } from 'react';
import type { TTypeContextStepThree } from '../../../types/typeContextStepThree';

// DEFINIR VALORES POR DEFECTO DE LOS ESTADOS
const defaultStepThreeContext: TTypeContextStepThree = {
  handleBudgeAmount: () => {},
  onBlurAmount: () => {},
  onChangeIsBudge: () => {},
  onChangeIsReinsert: () => {},
  onFocusAmount: () => {},
};

export const StepThreeContext = createContext<TTypeContextStepThree>(defaultStepThreeContext);
