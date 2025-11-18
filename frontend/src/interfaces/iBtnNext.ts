import type { MouseEvent } from "react";
import type { iBtns } from "./iBtns";

// INTERFACE PARA BOTON SIGUIENTE
export interface iBtnNext extends iBtns{
    handleNext: (e: MouseEvent<HTMLButtonElement>) => void;
}