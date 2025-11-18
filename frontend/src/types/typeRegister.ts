import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import type { TStepFourProps } from './typePropsStepFour';
import type { iEmailUser } from '../interfaces/iEmailUser';

// TIPADO GENERAL PARA FORMULARIOS
export type TRegister = Omit<TStepFourProps, 'handleChangeLocation' | 'handleConfirmPassword' | 'handleEmail' | 'handleFullName' | 'handlePassword' | 'handleUserName'> & {
  onChangeTerms: (e: ChangeEvent<HTMLInputElement>) => void;
  setInteractedConfirmPassword: Dispatch<SetStateAction<boolean>>;
  setInteractedPassword: Dispatch<SetStateAction<boolean>>;
  setTerms: Dispatch<SetStateAction<boolean>>;
  setIsSending: Dispatch<SetStateAction<boolean>>;
  setIsSuccefullyVerified: Dispatch<SetStateAction<boolean>>;
  isSuccefullyVerified: boolean; // INDICA SI LA VALIDACION DEL CODIGO FUE EXITOSA O NO
  isSending: boolean;
  interactedPassword: boolean;
  interactedConfirmPassword: boolean;
  terms: boolean;
  resendEmail: iEmailUser;
  setResendEmail: Dispatch<SetStateAction<iEmailUser>>;
};
