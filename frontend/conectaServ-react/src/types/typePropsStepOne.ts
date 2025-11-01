import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import type { TOptionWork } from "./typeOptionsWork";

//TIPO PASO 1 PARA CONTEXTO
export type TStepOneProps = {
  handleChangeSelected: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleCheckboxChange: (e: ChangeEvent<HTMLInputElement>, type: TOptionWork) => void;
  setValueSelected: Dispatch<React.SetStateAction<string>>;
  setHasContext: (hasContext: boolean) => void;
  setHasBudge: (hasBudge: boolean) => void;
  setIsFieldsBasic:Dispatch<SetStateAction<boolean>>; //NUEVO ESTADO QUE SE SETEARA EN DASHBOARD
  isFieldsBasic:boolean; //ESTADO DE SI DEBE MOSTRAR CAMPOS BASICOS O NO
  titleRef: React.RefObject<HTMLSelectElement | null>;
  hasContext: boolean;
  hasBudge: boolean;
  isStepValid: boolean;
  valueSelected: string;
};