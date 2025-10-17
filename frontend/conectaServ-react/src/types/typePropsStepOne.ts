import type { ChangeEvent } from "react";
import type { TOptionWork } from "./typeOptionsWork";

//TIPO PASO 1 PARA CONTEXTO
export type TStepOneProps = {
  handleChangeSelected: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleCheckboxChange: (e: ChangeEvent<HTMLInputElement>, type: TOptionWork) => void;
  setValueSelected: React.Dispatch<React.SetStateAction<string>>;
  setHasContext: (hasContext: boolean) => void;
  setHasBudge: (hasBudge: boolean) => void;
  titleRef: React.RefObject<HTMLSelectElement | null>;
  hasContext: boolean;
  hasBudge: boolean;
  isStepValid: boolean;
  valueSelected: string;
};