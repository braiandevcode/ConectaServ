import type { Dispatch, FormEvent, SetStateAction } from 'react';
import type { iEmailUser } from '../interfaces/iEmailUser';
import type { iFomrValidationVerifyEmail } from '../interfaces/iFormValidationVerifyEmail';

export type TFormVerifyCode = {
  otp: string[], 
  setOtp: Dispatch<SetStateAction<string[]>>
  updatedFormState: (value: string) => void;
  updateCodeEmail: (newCode: string) => void;
  updatedIsSendingCode: (isSendingCode: boolean) => void;
  sendCode: ({ emailUser }: iEmailUser) => Promise<void>;
  setIsSendingCode: Dispatch<SetStateAction<boolean>>;
  // setInputCodeEmail: Dispatch<SetStateAction<string>>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  isSendingCode: boolean;
  // inputCodeEmail: string;
  codeStoredEmail: string;
  formState: iFomrValidationVerifyEmail,
  setFormState: Dispatch<SetStateAction<iFomrValidationVerifyEmail>>;
};
