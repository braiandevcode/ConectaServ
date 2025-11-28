import type { JSX } from "react";

// INTERFACE PARA FIRMA DE OBJETO DE REGLAS
export interface iRulesHeader{
    condition: boolean;
    component: () => JSX.Element | null;
}