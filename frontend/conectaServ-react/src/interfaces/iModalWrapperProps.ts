import type { CSSProperties, ReactNode } from "react";

// INTERFACE PARA MODAL PLANTILLA
export interface iModalWrapperProps {
  className?:string;
  onClose: () => void;
  children: ReactNode;
  stylesInline?: CSSProperties
}
