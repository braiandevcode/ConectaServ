// TIPO PARA EL PASO 2 PARA CONTEXTO
export type TStepTwoProps = {
  isResetDetailsWork: boolean;
  setIsResetDetailsWork: (isResetDetailsWork: boolean) => void;
  handleDescriptionInput: (e: React.FormEvent<HTMLTextAreaElement>) => void;
  handleImageProfileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageExperiencesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescriptionBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
};