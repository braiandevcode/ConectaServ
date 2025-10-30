import type { ChangeEvent, Dispatch, FormEvent, KeyboardEvent, RefObject, SetStateAction } from 'react';
// import type { iEmailUser } from '../interfaces/iEmailUser';
import type { iFormValidationVerifyEmail } from '../interfaces/iFormValidationVerifyEmail';

export type TFormVerifyCode = {
  inputRefs: RefObject<(HTMLInputElement | null)[]>;
  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>, index: number) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
  setIsSuccefullyVerified: Dispatch<SetStateAction<boolean>>;
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
  isSuccefullyVerified: boolean; // INDICA SI LA VALIDACION DEL CODIGO FUE EXITOSA O NO
  isSendingCode: boolean; //PARA INDICAR QUE EL CODIGO SE ESTA ENVIANDO AL USUSARIO
  isCodeSent: boolean; //PARA INDICAR QUE EL CODIGO SE ENVIO AL DESTINO
  isVerifyingCode: boolean; //PARA INDICAR QUE EL CODIGO INGRESADO POR EL USUARIO SE ESTA VERIFICANDO
  isCodeVerified: boolean; //PARA INDICAR QUE EL CODIGO INGRESADO POR EL USUARIO SE VERIFICO
  codeStoredEmail: string;
  otp: string[]; //ARRAY DE STRINGS PARA VALORES EN INPUTS
  formState: iFormValidationVerifyEmail;
};
