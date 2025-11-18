import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';

// TIPO PASO 4 PARA CONTEXTO
export type TStepFourProps = {
  handleFullName: (e: FormEvent<HTMLInputElement>) => void;
  handleUserName: (e: FormEvent<HTMLInputElement>) => void;
  handleEmail: (e: FormEvent<HTMLInputElement>) => void;
  handleChangeLocation: (e: ChangeEvent<HTMLSelectElement>) => void;
  handlePassword: (e: FormEvent<HTMLInputElement>) => void;
  handleConfirmPassword: (e: FormEvent<HTMLInputElement>) => void;
  setPassword: Dispatch<SetStateAction<string>>;
  setConfirmPassword: Dispatch<SetStateAction<string>>;
  confirmPassword: string;
  password: string;
};
