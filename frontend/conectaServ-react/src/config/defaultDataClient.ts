import { EDataClient, ELocationKey } from "../types/enums";
import type { TDataClient } from "../types/typeDataClient";

// VALORES POR DEFECTO DE DATOS DE CLIENTE
export const defaultDataClient: TDataClient = {
  [EDataClient.DATA]: {
    fullName: '',
    userName: '',
    email: '',
    location: ELocationKey.NONE,
  },
};
