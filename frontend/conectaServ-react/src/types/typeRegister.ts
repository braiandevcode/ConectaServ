import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import type { TStepFourProps } from './typePropsStepFour';

// TIPADO GENERAL PARA FORMULARIOS
export type TRegister = Omit<TStepFourProps, 'handleChangeLocation' | 'handleConfirmPassword' | 'handleEmail' | 'handleFullName' | 'handlePassword' | 'handleUserName'> & {
  onChangeTerms: (e: ChangeEvent<HTMLInputElement>) => void;
  setInteractedConfirmPassword: Dispatch<SetStateAction<boolean>>;
  setInteractedPassword: Dispatch<SetStateAction<boolean>>;
  setTerms: Dispatch<SetStateAction<boolean>>;
  setIsSending: Dispatch<SetStateAction<boolean>>;
  isSending: boolean;
  interactedPassword: boolean;
  interactedConfirmPassword: boolean;
  terms: boolean;
};
