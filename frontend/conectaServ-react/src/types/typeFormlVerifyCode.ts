import type { ChangeEvent, Dispatch, FormEvent, KeyboardEvent, RefObject, SetStateAction } from 'react';
import type { iFormValidationVerifyEmail } from '../interfaces/iFormValidationVerifyEmail';
import type { iTimeExpire } from '../interfaces/iTimeExpire';

export type TFormVerifyCode = {
  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>, index: number) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
  setOtp: Dispatch<SetStateAction<string[]>>;
  updatedFormState: (value: string) => void;
  updateCodeEmail: (newCode: string) => void;
  updatedIsSendingCode: (isSendingCode: boolean) => void;
  updatedIsSentCode: (isSentCode: boolean) => void;
  setIsSendingCode: Dispatch<SetStateAction<boolean>>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  setIsCodeSent: Dispatch<SetStateAction<boolean>>;
  setIsVerifyingCode: Dispatch<SetStateAction<boolean>>;
  setIsCodeVerified: Dispatch<SetStateAction<boolean>>;
  setFormState: Dispatch<SetStateAction<iFormValidationVerifyEmail>>;
  setTime: Dispatch<SetStateAction<iTimeExpire>>;
  setExpired: Dispatch<SetStateAction<boolean>>;
  runTimerExpiration: () => NodeJS.Timeout;
  updatedIsSuccefullyVerified:(isVerifiedSuccess: boolean) => void;
  timerRef: RefObject<NodeJS.Timeout | null>;
  time: iTimeExpire;
  expired: boolean;
  isSendingCode: boolean; //PARA INDICAR QUE EL CODIGO SE ESTA ENVIANDO AL USUSARIO
  isCodeSent: boolean; //PARA INDICAR QUE EL CODIGO SE ENVIO AL DESTINO
  isVerifyingCode: boolean; //PARA INDICAR QUE EL CODIGO INGRESADO POR EL USUARIO SE ESTA VERIFICANDO
  isCodeVerified: boolean; //PARA INDICAR QUE EL CODIGO INGRESADO POR EL USUARIO SE VERIFICO
  codeStoredEmail: string;
  otp: string[]; //ARRAY DE STRINGS PARA VALORES EN INPUTS
  formState: iFormValidationVerifyEmail;
  inputRefs: RefObject<(HTMLInputElement | null)[]>;
};
