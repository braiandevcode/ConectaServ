import type { IconBaseProps, IconType } from "react-icons";

// INTERFACE PARA MODAL DE INFORMACION AL USUARIO
export interface iModalInfo {
  iconBaseProps:IconBaseProps
  iconReact?:IconType
  oncloseModal: (cb?: () => void) => void
}
