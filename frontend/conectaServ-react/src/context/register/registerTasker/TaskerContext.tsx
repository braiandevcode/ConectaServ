import { createContext } from 'react';

import type { TRegisterTasker } from '../../../types/typeRegisterTasker';
import { defaultDataTasker } from '../../../config/defaultDataTasker';
import { formStateValidFieldTasker } from '../../../config/formStateValidFieldTasker';

// DEFINIR VALORES POR DEFECTO DE LOS ESTADOS
const defaultContextTasker: TRegisterTasker = {
  setIsFieldsBasic: () => {},
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
  isFieldsBasic:true, //POR DEFECTO EL PASO DE CAMPOS BASICO EXISTE
  isLoaded:false,
  amountFieldFormat: '',
  stepData: defaultDataTasker,
  valueSelected: '',
  isFocus: false,
  isReinsertDisabled: false,
  isBudgeMountDisabled: true,
  formState: formStateValidFieldTasker,
  hasInteracted: false,
  isResetDetailsWork: false,
  isStepValid: false,
  step: 1,
  hasContext: true,
  hasBudge: false,
  isParsed: false,
  validateCurrentStep: () => false,
};

export const TaskerContext = createContext<TRegisterTasker>(defaultContextTasker);
