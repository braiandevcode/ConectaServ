import { createContext } from 'react';
import { formStateValidField } from '../../../config/constant';
import type { TRegisterPro } from '../../../types/typeRegisterProfessional';

// DEFINIR VALORES POR DEFECTO DE LOS ESTADOS
const defaultContextProfessional: TRegisterPro = {
  valueSelected: '',
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
  validateCurrentStep: () => false,
};

export const ProfessionalContext = createContext<TRegisterPro>(defaultContextProfessional);
