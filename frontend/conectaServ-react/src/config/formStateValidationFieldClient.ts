import type { iFormStateValidationClient } from "../interfaces/iFormStateValidationClient";

// CONFIGURACION INICIAL VALIDACION DE CAMPOS EN REGISTRO CLIENTE
export const formStateValidFieldClient: iFormStateValidationClient = {
  fullName: { value: '', error: '', isValid: false },
  userName: { value: '', error: '', isValid: false },
  email: { value: '', error: '', isValid: false },
  location: { value: '', error: '', isValid: false },
  password: { value: '', error: '', isValid: false },
  confirmPassword: { value: '', error: '', isValid: false },
};
