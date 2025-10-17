import type { TStepFourProps } from "./typePropsStepFour";

// TIPADO GENERAL PARA FORMULARIOS
export type TRegister = Omit<TStepFourProps, 'handleChangeLocation' | 'handleConfirmPassword' | 'handleEmail' | 'handleFullName' | 'handlePassword' | 'handleUserName'> & {
  onChangeTerms: (e: React.ChangeEvent<HTMLInputElement>) => void;
  interactedPassword: boolean;
  setInteractedConfirmPassword: React.Dispatch<React.SetStateAction<boolean>>;
  interactedConfirmPassword: boolean;
  setInteractedPassword: React.Dispatch<React.SetStateAction<boolean>>;
  setTerms: React.Dispatch<React.SetStateAction<boolean>>;
  terms: boolean;
  isSending: boolean;
  inputCodeEmail: string;
  setInputCodeEmail: React.Dispatch<React.SetStateAction<string>>;
  codeEmail: string;
  updateCodeEmail: (newCode: string) => void;
  setIsSending: React.Dispatch<React.SetStateAction<boolean>>;
};