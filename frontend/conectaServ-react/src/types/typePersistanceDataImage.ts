import type { TIdString } from "./typeUUID";

// TIPADO PARA DATOS DE IMAGEN A PERSISTIR
export type TStoredImage = {
  name: string;
  type: string;
  size: number;
  idImage: TIdString;
  dataUrl?: string;
};