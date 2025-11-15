import type { IUserData } from "../interfaces/iUserData";
import type { EDataClient } from "./enums";

// ENUM PARA NOMBRE DE CLAVE EN STRORAGE DE DATOS DE CLIENTES
export type TDataClient = {
  [EDataClient.DATA]: IUserData;
};