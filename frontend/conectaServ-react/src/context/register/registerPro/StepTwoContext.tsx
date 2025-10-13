import { createContext } from 'react';
import type { TTypeContextStepTwo } from '../../../types/types';

// DEFINIR VALORES POR DEFECTO DE LOS ESTADOS
const defaultStepTwoContext: TTypeContextStepTwo = {
  handleDescriptionInput: () => {},
  handleImageExperiencesChange: () => {},
  handleImageProfileChange: () => {},
  onDeleteExperience: () => {},
  onDeleteProfile: () => {},
  setSrc: () => {},
  setSrcVector: () => {},
  handleDescriptionBlur: () => {},
  src: '',
  srcVector: [],
};

export const StepTwoContext = createContext<TTypeContextStepTwo>(defaultStepTwoContext);
