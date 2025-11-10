import type { TStoredImage } from "../types/typePersistanceDataImage";
import type { TFieldState } from "../types/typeStateFields";

export interface IValidator {
  validate(value?: string | File | TStoredImage | TStoredImage[] | string[] | FileList | null): TFieldState;
}
