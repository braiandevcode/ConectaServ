import type { IconType } from "react-icons";
import type { TOptionItem } from "./typeOptionItem";
import type { TOptionWork } from "./typeOptionsWork";

// TIPADO PARA LOS GRUPOS DE UNA CATEGORIA
export type TWorkGroupOption = {
  options: TOptionItem[];
  icon: IconType;
  title: string;
  type: TOptionWork;
};