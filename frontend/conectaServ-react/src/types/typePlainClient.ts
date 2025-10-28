import type { TStepBasic } from './typeBasic';

// TIPADO PARA DATOS DE PROFESIONAL DEFINIDO AL SERVIDOR
export type TPlainClient = TStepBasic & {
  password: string;
  roles: string[];
};
