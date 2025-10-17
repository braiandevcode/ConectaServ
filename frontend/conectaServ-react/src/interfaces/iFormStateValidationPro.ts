import type { TFieldState } from "../types/typeStateFields";

export interface iFormStateValidationPro {
  // PASO 4(EN PROFESIONAL) BASICO(CLIENTE)
  fullName: TFieldState;
  userName: TFieldState;
  email: TFieldState;
  location: TFieldState;
  password: TFieldState;
  confirmPassword: TFieldState;

  // PASO 1 CATEGORIA
  category: TFieldState;
  'service[]': TFieldState;
  'context[]': TFieldState;
  'day[]': TFieldState;
  'hour[]': TFieldState;

  // PASO 2 PERFIL
  descriptionUser: TFieldState;
  imageProfile: TFieldState;
  imageExperiences: TFieldState;

  // PASO 3 (PRESUPUESTO SI INCLUYE SOLO VALIDAR EL CAMPO DEL MONTO)
  amountBudge: TFieldState;
  budgeSelected: TFieldState;
  reinsert: TFieldState;
  emailCode: TFieldState;
}