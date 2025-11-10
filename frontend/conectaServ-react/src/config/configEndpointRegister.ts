import type { iEndPointUser } from '../interfaces/interfaces';
import { EEndpoint } from '../types/enums';
// DEFINIMOS LA URL BASE PARA BACKEND
const BASE_BACK_URL = `${import.meta.env.VITE_HOST}${import.meta.env.VITE_PORT}`;
// OBJETO FINAL QUE EXPORTAMOS CON LAS URLS COMPLETAS
export const endPointUser: iEndPointUser= {
  USER: `${BASE_BACK_URL}${EEndpoint.USER}`,
  AUTH_LOGIN: `${BASE_BACK_URL}${EEndpoint.AUTH}` 
};
