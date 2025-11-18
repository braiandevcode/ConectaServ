import type { Dispatch, FormEvent, SetStateAction } from 'react';
import type { iFormStateValidationIdentifyEmail } from '../interfaces/iFormStateIdentifyEmail';

// TIPADO PARA ESTADOS DE IDENTIFICACION DE EMAIL
export type TIdentifyEmail = {
  handleClickClientIdentifyEmail: () => void;
  handleClickTaskerIdentifyEmail: () => void;
  submitIdentifyEmail: (e: FormEvent<HTMLFormElement>) => Promise<void>; //SUBMIT DE ENVIO
  setEmailIdentify: Dispatch<SetStateAction<string>>;
  setFormState: Dispatch<SetStateAction<iFormStateValidationIdentifyEmail>>;
  handleOnchangeIdentifyEmail: (e: FormEvent<HTMLInputElement>) => void;
  setIsExistEmail: Dispatch<SetStateAction<boolean>>;
  setIsSentIdentificationEmail: Dispatch<SetStateAction<boolean>>;
  setIsSendingIdentificationEmail: Dispatch<SetStateAction<boolean>>;
  emailIdentify: string;
  isSendingIdentificationEmail: boolean;
  formState: iFormStateValidationIdentifyEmail;
  isExistEmail: boolean;
  isSentIdentificationEmail: boolean;
};
