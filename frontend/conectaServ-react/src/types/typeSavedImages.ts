import type { RefObject } from 'react';
import type { iFormStateValidation } from '../interfaces/interfaces';

export type TSavedImage = {
  formState: iFormStateValidation;
  listFiles: RefObject<File | FileList | null>;
};
