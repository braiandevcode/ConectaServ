import type { Options } from '@emailjs/browser/es/types/Options';

// INTERFACE PARA PARAMETROS DEL INIT DE EMAILJS
export interface iParamsInit {
  options: string | Options;
  origin?: string;
}
