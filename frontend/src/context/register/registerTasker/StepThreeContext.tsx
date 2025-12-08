import { createContext, createRef } from 'react';
import type { TTypeContextStepThree } from '../../../types/typeContextStepThree';

// DEFINIR VALORES POR DEFECTO DE LOS ESTADOS
const defaultStepThreeContext: TTypeContextStepThree = {
  handleBudgeAmount: () => {},
  onChangeIsBudge: () => {},
  onChangeIsReinsert: () => {},
  amountRef:createRef<HTMLInputElement | null>(),
};

export const StepThreeContext = createContext<TTypeContextStepThree>(defaultStepThreeContext);
