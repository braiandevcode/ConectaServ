import type { TYesOrNo } from "./typeRadioYesOrNo";

// TIPO PASO 3 (PARA GUARDAR EN localStorage)
export type TStepThree = {
  amountBudge: number;
  budgeSelected: TYesOrNo;
  reinsert: TYesOrNo;
};