import type { TOptionItem } from "./typeOptionItem";
import type { TOptionWork } from "./typeOptionsWork";

// TIPADO PARA LOS GRUPOS DE UNA CATEGORIA
export type TWorkGroupOption = {
  options: TOptionItem[];
  icon: string;
  title: string;
  type: TOptionWork;
};