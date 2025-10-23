import { createContext } from 'react';
import { emptyStepData, formStateValidField } from '../../../config/constant';
import type { TRegisterPro } from '../../../types/typeRegisterProfessional';

// DEFINIR VALORES POR DEFECTO DE LOS ESTADOS
const defaultContextProfessional: TRegisterPro = {
  setStepData: () => {},
  setValueSelected: () => {},
  setIsParsed: () => {},
  handleClickNext: () => {},
  handleClickPrev: () => {},
  setHasContext: () => {},
  setHasBudge: () => {},
  setIsStepValid: () => {},
  setHasInteracted: () => {},
  setStep: () => {},
  setIsResetDetailsWork: () => {},
  setFormState: () => {},
  setIsBudgeMountDisabled: () => {},
  setIsReinsertDisabled: () => {},
  setIsFocus: () => {},
  setAmountFieldFormat: () => {},
  setIsLoaded: () => {},
  isLoaded:false,
  amountFieldFormat: '',
  stepData: emptyStepData,
  valueSelected: '',
  isFocus: false,
  isReinsertDisabled: false,
  isBudgeMountDisabled: true,
  formState: formStateValidField,
  hasInteracted: false,
  isResetDetailsWork: false,
  isStepValid: false,
  step: 1,
  hasContext: true,
  hasBudge: false,
  isParsed: false,
  validateCurrentStep: () => false,
};

export const ProfessionalContext = createContext<TRegisterPro>(defaultContextProfessional);
