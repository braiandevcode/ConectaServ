import type { EDataClient } from "./enums";
import type { TStepBasic } from "./typeBasic";

// ENUM PARA NOMBRE DE CLAVE EN STRORAGE DE DATOS DE CLIENTES
export type TDataClient = {
  [EDataClient.DATA]: TStepBasic;
};