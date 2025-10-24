import type { iEndPointRegister } from '../interfaces/interfaces';
import { EEndpoint } from '../types/enums';
// DEFINIMOS LA URL BASE PARA BACKEND
const BASE_BACK_URL = `${import.meta.env.VITE_HOST}${import.meta.env.VITE_PORT}`;
// OBJETO FINAL QUE EXPORTAMOS CON LAS URLS COMPLETAS
export const endPointRegister: iEndPointRegister = {
  ENDPOINT_REGISTER_CLIENT: `${BASE_BACK_URL}${EEndpoint.CLIENT}`,
  ENDPOINT_REGISTER_TASKER: `${BASE_BACK_URL}${EEndpoint.TASKER}`,
  ENDPOINT_REGISTER: `${BASE_BACK_URL}${EEndpoint.REGISTER}`,
};
