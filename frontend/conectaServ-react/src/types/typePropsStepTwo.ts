import type { ChangeEvent, FocusEvent, FormEvent } from "react";

// TIPO PARA EL PASO 2 PARA CONTEXTO
export type TStepTwoProps = {
  isResetDetailsWork: boolean;
  setIsResetDetailsWork: (isResetDetailsWork: boolean) => void;
  handleDescriptionInput: (e: FormEvent<HTMLTextAreaElement>) => void;
  handleImageProfileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleImageExperiencesChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDescriptionBlur: (e: FocusEvent<HTMLTextAreaElement>) => void;
};