import type { iFomrValidationVerifyEmail } from "../interfaces/iFormValidationVerifyEmail";

// ESTADO POR DEFAULT DE VERIFICACION DE CODIGO
export const formStateVerifyCodeEmail: iFomrValidationVerifyEmail = {
  emailCode: { value: '', error: '', isValid: false },
};