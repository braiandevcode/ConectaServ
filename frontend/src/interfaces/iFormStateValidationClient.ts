import type { TFieldState } from '../types/typeStateFields';

// INTERFAZ CLIENTE
export interface iFormStateValidationClient {
  // BASICO(CLIENTE)
  fullName: TFieldState;
  userName: TFieldState;
  email: TFieldState;
  cityName: TFieldState;
  password: TFieldState;
  confirmPassword: TFieldState;
}
