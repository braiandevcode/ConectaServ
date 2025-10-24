import type { RefObject } from 'react';
import type { iFormStateValidationPro } from '../interfaces/iFormStateValidationPro';
// INTERFACE PARA ALMACENAR IMAGEN EN REGISTRO PROFESIONAL
export type TSavedImage = {
  formState: iFormStateValidationPro;
  listFiles: RefObject<File | FileList | null>;
};
