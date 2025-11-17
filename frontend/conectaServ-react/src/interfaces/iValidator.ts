import type { TImageData } from "../types/typeRegisterEndDto";
import type { TFieldState } from "../types/typeStateFields";

export interface IValidator {
  validate(value?: string | File | TImageData | TImageData[] | string[] | FileList | null): TFieldState;
}
