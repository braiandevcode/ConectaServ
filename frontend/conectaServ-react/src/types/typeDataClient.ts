import type { EDataClient } from "./enums";
import type { TUser } from "./typeUser";

// ENUM PARA NOMBRE DE CLAVE EN STRORAGE DE DATOS DE CLIENTES
export type TDataClient = {
  [EDataClient.DATA]: Omit<TUser, 'password' | 'roleData' | 'isVerified' | 'taskerData'>;
};