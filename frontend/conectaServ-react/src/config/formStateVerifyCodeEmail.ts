import type { iFormValidationVerifyEmail } from "../interfaces/iFormValidationVerifyEmail";

// ESTADO POR DEFAULT DE VERIFICACION DE CODIGO
export const formStateVerifyCodeEmail: iFormValidationVerifyEmail = {
  emailCode: { value: '', error: '', isValid: false },
};

