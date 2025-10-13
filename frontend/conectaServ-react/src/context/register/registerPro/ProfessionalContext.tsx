import { createContext } from 'react';
import type { TRegisterPro } from '../../../types/types';
import { emptyStepData, formStateValidField } from '../../../config/constant';

// DEFINIR VALORES POR DEFECTO DE LOS ESTADOS
const defaultContextProfessional: TRegisterPro = {
  valueSelected: '',
  setValueSelected: () => {},
  setIsParsed: () => {},
  setStepData: () => {},
  handleClickNext: () => {},
  handleClickPrev: () => {},
  setHasContext: () => {},
  setHasBudge: () => {},
  setIsStepValid: () => {},
  setHasInteracted: () => {},
  setStep: () => {},
  setIsResetDetailsWork: () => {},
  onSubmitForm: () => {},
  setFormState: () => {},
  setIsBudgeMountDisabled: () => {},
  setIsReinsertDisabled: () => {},
  setIsFocus: () => {},
  setAmountFieldFormat: () => {},
  amountFieldFormat: '',
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
  stepData: emptyStepData,
  validateCurrentStep: () => false,
};

export const ProfessionalContext = createContext<TRegisterPro>(defaultContextProfessional);
