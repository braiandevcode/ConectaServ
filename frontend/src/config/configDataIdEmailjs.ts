import type { iConfigDataEmailJs } from "../interfaces/iConfigDataEmailJs";

// CONFIGURAION PARA LOS DATOS PASADOS A EMAILJS
export const DATA_EMAILJS: iConfigDataEmailJs = {
  // CARGAR LA PUBLIC_KEY DESDE VARIABLE DE ENTORNO
  PUBLIC_KEY: import.meta.env.VITE_PUBLIC_KEY, // ==> CLAVE PUBLICA
  SERVICE_ID: import.meta.env.VITE_SERVICE_ID, // ==> ID SERVICIO
  TEMPLATE_VERIFICATION_ID: import.meta.env.VITE_TEMPLATE_ID, // ==> ID PLANTILLA
};
