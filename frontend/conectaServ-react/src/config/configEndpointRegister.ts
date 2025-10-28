import type { iEndPointRegister } from '../interfaces/interfaces';
import { EEndpoint } from '../types/enums';
// DEFINIMOS LA URL BASE PARA BACKEND
const BASE_BACK_URL = `${import.meta.env.VITE_HOST}${import.meta.env.VITE_PORT}`;
// OBJETO FINAL QUE EXPORTAMOS CON LAS URLS COMPLETAS
export const endPointRegister: iEndPointRegister = {
  ENDPOINT_USER: `${BASE_BACK_URL}${EEndpoint.USER}`,
};
