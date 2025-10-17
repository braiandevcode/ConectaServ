import type { IconType } from "react-icons";

// INTERFACE PARA MODAL DE SUCCESS
export interface iModal {
  title: string;
  subTitle?: string;
  message?: string;
  icon?:string
  iconReact?:IconType
  sizeIconReact?:number | string
}
