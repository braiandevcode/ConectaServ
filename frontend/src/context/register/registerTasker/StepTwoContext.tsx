import { createContext } from 'react';
import type { TTypeContextStepTwo } from '../../../types/typeContextStepTwo';

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
  setLoadImg: () => {},
  setLoadImgExp: () => {},
  loadImg: false,
  loadImgExp:false,
  src: '',
  srcVector: [],
};

export const StepTwoContext = createContext<TTypeContextStepTwo>(defaultStepTwoContext);
