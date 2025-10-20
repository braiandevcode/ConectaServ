import type { Dispatch, FormEvent, SetStateAction } from 'react';
import type { iEmailUser } from '../interfaces/iEmailUser';

export type TModalVerifyCode = {
  updateCodeEmail: (newCode: string) => void;
  updatedIsSendingCode: (isSendingCode: boolean) => void;
  sendCode: ({ emailUser }: iEmailUser) => Promise<void>;
  setIsSendingCode: Dispatch<SetStateAction<boolean>>;
  setInputCodeEmail: Dispatch<SetStateAction<string>>;
//   handleInputCodeVerify: (e: FormEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  isSendingCode: boolean;
  inputCodeEmail: string;
  codeStoredEmail: string;
};
