import { createContext } from 'react';
import type { TRegisterTasker } from '../../../types/typeRegisterTasker';


// DEFINIR VALORES POR DEFECTO DE LOS ESTADOS
const defaultContextTasker: TRegisterTasker = {
  setIsFieldsBasic: () => {},
  setValueSelected: () => {},
  handleClickNext: () => {},
  handleClickPrev: () => {},
  setHasWorkArea: () => {},
  setHasBudge: () => {},
  setHasInteracted: () => {},
  setStep: () => {},
  setIsResetDetailsWork: () => {},
  setIsBudgeMountDisabled: () => {},
  setIsReinsertDisabled: () => {},
  setAmountFieldFormat: () => {},
  setIsLoaded: () => {},
  validateCurrentStep: () => false,
  hasInteracted: false,
  isFieldsBasic:true, //POR DEFECTO EL PASO DE CAMPOS BASICO EXISTE
  isLoaded:false,
  amountFieldFormat: '',
  valueSelected: '',
  isReinsertDisabled: false,
  isBudgeMountDisabled: true,
  isResetDetailsWork: false,
  step: 1,
  hasWorkArea: true,
  hasBudge: false,
};

export const TaskerRegisterContext = createContext<TRegisterTasker>(defaultContextTasker);
