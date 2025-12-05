import type { ChangeEvent, Dispatch, FocusEvent, FormEvent, SetStateAction } from 'react';

// TIPO PARA EL PASO 2 PARA CONTEXTO
export type TStepTwoProps = {
  isResetDetailsWork: boolean;
  loadImg: boolean;
  loadImgExp: boolean;
  setLoadImg: Dispatch<SetStateAction<boolean>>;
  setLoadImgExp: Dispatch<SetStateAction<boolean>>;
  setIsResetDetailsWork: (isResetDetailsWork: boolean) => void;
  handleDescriptionInput: (e: FormEvent<HTMLTextAreaElement>) => void;
  handleImageProfileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleImageExperiencesChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDescriptionBlur: (e: FocusEvent<HTMLTextAreaElement>) => void;
};
