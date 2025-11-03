import type { TStoredImage } from "./typePersistanceDataImage";

// TIPO PASO 2 (para guardar en STEP_DATA en localStorage)
export type TStepTwo = {
  imageProfile: TStoredImage | null;
  imageExperiences: TStoredImage[];
  descriptionUser: string;
};