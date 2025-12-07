import type { TImageDataStored } from "../types/typeRegisterEndDto";
import type { TFieldState } from "../types/typeStateFields";

export interface IValidator {
  validate(value?: string | File | TImageDataStored| TImageDataStored[] | string[] | FileList | null): TFieldState;
}
