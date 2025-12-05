import type { TImageDataStored } from "./typeRegisterEndDto";
// TIPO PASO 2 (para guardar en STEP_DATA en localStorage)
export type TStepTwo = {
  description:string;
  imageProfileData:TImageDataStored | null;
  imageExperienceData:TImageDataStored[];
};