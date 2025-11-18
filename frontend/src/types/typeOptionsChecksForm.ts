import type { TOptionItem } from "./typeOptionItem";
import type { TOptionWork } from "./typeOptionsWork";

// TIPADO PARA LA PARTE DE CREACION DE LOS GRUPOS DE CHECKBOXES
export type TOptionsCheckForm = {
  options: TOptionItem[];
  type: TOptionWork; //POR LAS DUDAS SI ALGO SE ROMPE PASARLO A ==> STRING
  container: HTMLElement | null;
  selectEl: HTMLSelectElement;
};