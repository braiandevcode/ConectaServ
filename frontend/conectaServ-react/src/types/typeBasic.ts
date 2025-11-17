import type { TUser } from "./typeUser";
// TIPO PASO BASICO CON MISMOS CAMPOS EN REGISTRO CLIENTE Y PROFESIONAL
export type TStepBasic = & Omit<TUser, 'password'| 'isVerified' | 'roleData'>;