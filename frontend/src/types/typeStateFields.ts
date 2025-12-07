import type { TYesOrNo } from "./typeRadioYesOrNo";
import type { TImageDataStored } from "./typeRegisterEndDto";

// TIPO PARA ESTADO DEL CAMPO
export type TFieldState = {
  value: string | File | FileList | TYesOrNo | TImageDataStored| TImageDataStored[] | string[] | null;
  error: string;
  isValid: boolean;
};