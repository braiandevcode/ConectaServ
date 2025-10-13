// IMPORTACIONES
import type { TFieldState, TStoredImage } from '../types/types.js';
export interface iFormStateValidation {
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

// INTERFAZ CLIENTE
export interface iFormStateValidationClient {
  // BASICO(CLIENTE)
  fullName: TFieldState;
  userName: TFieldState;
  email: TFieldState;
  location: TFieldState;
  password: TFieldState;
  confirmPassword: TFieldState;
}

export interface iNamesGroupsChecks {
  service: string;
  context: string;
  day: string;
  hour: string;
}

// INTERFACES PARA RUTAS DE LAS PAGINAS
export interface iDomainUrlPath {
  URL_SERVER_CLIENT: string;
  URL_SERVER_PROFESSIONAL: string;
  URL_LOCAL_FRONT: string;
}

export interface iAbreviationURL {
  BACK_ABREVIATION_CLIENT: string;
  BACK_ABREVIATION_PRO: string;
}

// INTERFACES PARA URL DE PETICIONES
export interface iPhatPages {
  PATH_FORM_CLIENT: string;
  PATH_FORM_PROFESSIONAL: string;
  PATH_TERMS: string;
  PATH_PRIVACY: string;
}

// INTERFACES ESPECÍFICAS
export interface iOptionsItems {
  value: string;
  text: string;
  disabled: boolean;
  selected: boolean;
}
export interface IValidator {
  validate(value?: string | File | TStoredImage | TStoredImage[] | string[] | FileList | null): TFieldState;
}
