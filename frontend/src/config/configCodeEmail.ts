import type { iParamsInit } from '../interfaces/iParamsInit';
import { DATA_EMAILJS } from './configDataIdEmailjs';

// CONFIGURACION INICIAL DE EMAILJS
export const configEmail: iParamsInit = {
  options: {
    publicKey: DATA_EMAILJS.PUBLIC_KEY, //==> CLAVE
  },
};
