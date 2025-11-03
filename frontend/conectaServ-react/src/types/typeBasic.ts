import type { TLocationKey } from "./typeLocation";

// TIPO PASO BASICO CON MISMOS CAMPOS EN REGISTRO CLIENTE Y PROFESIONAL
export type TStepBasic = {
  fullName: string;
  userName: string;
  email: string;
  location: TLocationKey;
};