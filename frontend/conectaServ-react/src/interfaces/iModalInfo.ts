import type { IconType } from "react-icons";

// INTERFACE PARA MODAL DE INFORMACION AL USUARIO
export interface iModalInfo {
  title: string;
  subTitle?: string;
  message?: string;
  icon?:string
  iconReact?:IconType
  sizeIconReact?:number | string
}
