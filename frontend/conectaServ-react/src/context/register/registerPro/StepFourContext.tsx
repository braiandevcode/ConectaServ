import { createContext } from 'react';
import type { TTypeContextBasic} from '../../../types/types';

// DEFINIR VALORES POR DEFECTO DE LOS ESTADOS
const defaultStepBasicContext: TTypeContextBasic = {
  handleChangeLocation: () => {},
  handleConfirmPassword: () => {},
  handleEmail: () => {},
  handleFullName: () => {},
  handlePassword: () => {},
  handleUserName: () => {},
};

export const StepFourContext = createContext<TTypeContextBasic>(defaultStepBasicContext);