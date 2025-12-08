import type { ChangeEvent, Dispatch, RefObject, SetStateAction } from 'react';
import type { TStepFourProps } from './typePropsStepFour';
import type { iEmailUser } from '../interfaces/iEmailUser';
import type { iTimeExpire } from '../interfaces/iTimeExpire';
import type { TStepDataTasker } from './typeStepData';
import type { iFormStateValidationTask } from '../interfaces/iFormStateValidationTask';

// TIPADO GENERAL PARA FORMULARIOS
export type TTasker = Omit<TStepFourProps, 'handleChangeLocation' | 'handleConfirmPassword' | 'handleEmail' | 'handleFullName' | 'handlePassword' | 'handleUserName'> & {
  onChangeTerms: (e: ChangeEvent<HTMLInputElement>) => void;
  setInteractedConfirmPassword: Dispatch<SetStateAction<boolean>>;
  setInteractedPassword: Dispatch<SetStateAction<boolean>>;
  setTerms: Dispatch<SetStateAction<boolean>>;
  setIsSending: Dispatch<SetStateAction<boolean>>;
  setIsSuccefullyVerified: Dispatch<SetStateAction<boolean>>;
  setTime: Dispatch<SetStateAction<iTimeExpire>>;
  setExpiresAt: Dispatch<SetStateAction<number | null>>;
  setResendEmail: Dispatch<SetStateAction<iEmailUser>>;

  // NUEVO------------------------------
  setFormState: Dispatch<SetStateAction<iFormStateValidationTask>>;
  setStepData: Dispatch<SetStateAction<TStepDataTasker>>;
  setIsStepValid: (isStepValid: boolean) => void;
  setEdit: Dispatch<SetStateAction<boolean>>;
  stepData: TStepDataTasker;
  formState: iFormStateValidationTask;
  isStepValid: boolean;
  edit:boolean;
  // ------------------------//
  expiresAt: number | null;
  isSuccefullyVerified: boolean; // INDICA SI LA VALIDACION DEL CODIGO FUE EXITOSA O NO
  isSending: boolean;
  interactedPassword: boolean;
  interactedConfirmPassword: boolean;
  terms: boolean;
  resendEmail: iEmailUser;
  timerRef: RefObject<ReturnType<typeof setInterval> | null>;
  time: iTimeExpire;
};
