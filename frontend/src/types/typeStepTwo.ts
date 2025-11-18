import type { TImageData } from "./typeRegisterEndDto";
// TIPO PASO 2 (para guardar en STEP_DATA en localStorage)
export type TStepTwo = {
  description:string;
  imageProfileData:TImageData | null;
  imageExperienceData:TImageData[];
};