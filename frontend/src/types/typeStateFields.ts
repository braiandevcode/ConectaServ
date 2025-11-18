import type { TStoredImage } from "./typePersistanceDataImage";
import type { TYesOrNo } from "./typeRadioYesOrNo";

// TIPO PARA ESTADO DEL CAMPO
export type TFieldState = {
  value: string | File | FileList | TYesOrNo | TStoredImage | TStoredImage[] | string[] | null;
  error: string;
  isValid: boolean;
};