import type { iFormStateValidationTask } from "../interfaces/iFormStateValidationTask";


// CONFIGURACION INICIAL PARA MENSAJES DE ERROR EN CAMPOS REGISTRO PROFESIONAL
export const formStateValidFieldTasker: iFormStateValidationTask = {
  // PASO 4
  fullName: { value: '', error: '', isValid: false },
  userName: { value: '', error: '', isValid: false },
  email: { value: '', error: '', isValid: false },
  location: { value: '', error: '', isValid: false },
  password: { value: '', error: '', isValid: false },
  confirmPassword: { value: '', error: '', isValid: false },

  // PASO 1 CATEGORIA
  category: { value: '', error: '', isValid: false },
  'context[]': { value: '', error: '', isValid: false },
  'service[]': { value: '', error: '', isValid: false },
  'day[]': { value: '', error: '', isValid: false },
  'hour[]': { value: '', error: '', isValid: false },
  // PASO 2 PERFIL
  descriptionUser: { value: '', error: '', isValid: true },
  imageProfile: { value: null, error: '', isValid: true },
  imageExperiences: { value: null, error: '', isValid: true },

  // PASO 3 (PRESUPUESTO)
  amountBudge: { value: '', error: '', isValid: false },
  budgeSelected: { value: 'no', error: '', isValid: false },
  reinsert: { value: 'no', error: '', isValid: false },
};