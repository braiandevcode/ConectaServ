import type { iFormStateLogin } from "../interfaces/iFormStateLogin";

// OBJETO DE VALIDACIONES PARA EL LOGIN
export const formStateValidationFieldLogin: iFormStateLogin = {
  userName: { value: '', error: '', isValid: false },
  email: { value: '', error: '', isValid: false },
  password: { value: '', error: '', isValid: false },
};