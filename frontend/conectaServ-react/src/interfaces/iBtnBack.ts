import type { MouseEvent } from "react";
import type { iBtns } from "./iBtns";

// INTERFACE PARA BOTON DE ACCION HACIA ATRAS
export interface iBtnBack extends iBtns{
    handleBtnBack: (e:MouseEvent<HTMLButtonElement>) => void, // ==> EVENTO FLEXIBLE A CUALQUIER CIRSCUSTANCIA EN LA APP
}