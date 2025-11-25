import type { ChangeEvent, ClipboardEvent, Dispatch, FormEvent, KeyboardEvent, RefObject, SetStateAction } from 'react';
import type { iFormValidationVerifyEmail } from '../interfaces/iFormValidationVerifyEmail';
// import type { iTimeExpire } from '../interfaces/iTimeExpire';
import type { iFormStateValidationClient } from '../interfaces/iFormStateValidationClient';
import type { iFormStateValidationTask } from '../interfaces/iFormStateValidationTask';

export type TFormVerifyCode = {
  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>, index: number) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
  handleSubmit:<T extends iFormStateValidationClient | iFormStateValidationTask>(e: FormEvent<HTMLFormElement>, formState:T, fieldName: keyof T) => Promise<void>;
  setToken: Dispatch<SetStateAction<string>>
  setOtp: Dispatch<SetStateAction<string[]>>;
  updatedFormState: (value: string) => void;
  updateTokenEmail: (token: string, expiresAt:Date) => void;
  updatedIsSendingCode: (isSendingCode: boolean) => void;
  updatedIsSentCode: (isSentCode: boolean) => void;
  setIsSendingCode: Dispatch<SetStateAction<boolean>>;
  setIsCodeSent: Dispatch<SetStateAction<boolean>>;
  setIsVerifyingCode: Dispatch<SetStateAction<boolean>>;
  setIsCodeVerified: Dispatch<SetStateAction<boolean>>;
  setFormState: Dispatch<SetStateAction<iFormValidationVerifyEmail>>;
  setExpired: Dispatch<SetStateAction<boolean>>;
  runTimerExpiration: ({ expiresAt }:{expiresAt:Date}) => ReturnType<typeof setInterval> | null;
  updatedIsSuccefullyVerified: (isVerifiedSuccess: boolean) => void;
  handlePaste:(e: ClipboardEvent<HTMLInputElement>) => void,
  token:string; 
  expired: boolean;
  isSendingCode: boolean; //PARA INDICAR QUE EL CODIGO SE ESTA ENVIANDO AL USUSARIO
  isCodeSent: boolean; //PARA INDICAR QUE EL CODIGO SE ENVIO AL DESTINO
  isVerifyingCode: boolean; //PARA INDICAR QUE EL CODIGO INGRESADO POR EL USUARIO SE ESTA VERIFICANDO
  isCodeVerified: boolean; //PARA INDICAR QUE EL CODIGO INGRESADO POR EL USUARIO SE VERIFICO
  otp: string[]; //ARRAY DE STRINGS PARA VALORES EN INPUTS
  formState: iFormValidationVerifyEmail;
  inputRefs: RefObject<(HTMLInputElement | null)[]>;
};
