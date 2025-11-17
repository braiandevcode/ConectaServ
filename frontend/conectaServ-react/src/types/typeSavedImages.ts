import type { RefObject } from 'react';
import type { iFormStateValidationTask } from '../interfaces/iFormStateValidationTask';

// INTERFACE PARA ALMACENAR IMAGEN EN REGISTRO PROFESIONAL
export type TSavedImage = {
  formState: iFormStateValidationTask;
  listFiles: RefObject<File | FileList | null>;
};
