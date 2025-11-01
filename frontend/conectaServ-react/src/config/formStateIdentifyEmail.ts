import type { iFormStateValidationIdentifyEmail } from "../interfaces/iFormStateIdentifyEmail";

// ESTADO POR DEFAULT DE IDENTIFICACION DE EMAIL
export const formStateIdentifyEmail: iFormStateValidationIdentifyEmail = {
  emailIdentify: { value: '', error: '', isValid: false },
};