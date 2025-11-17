import type { ChangeEvent, Dispatch, RefObject, SetStateAction } from "react";
import type { TEntitie } from "./typeOptionsWork";

//TIPO PASO 1 PARA CONTEXTO
export type TStepOneProps = {
  handleChangeSelected: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleCheckboxChange: (e: ChangeEvent<HTMLInputElement>, type: TEntitie) => void;
  setValueSelected: Dispatch<SetStateAction<string>>;
  setHasWorkArea: (hasWorkArea: boolean) => void;
  setHasBudge: (hasBudge: boolean) => void;
  setIsFieldsBasic:Dispatch<SetStateAction<boolean>>; //NUEVO ESTADO QUE SE SETEARA EN DASHBOARD
  isFieldsBasic:boolean; //ESTADO DE SI DEBE MOSTRAR CAMPOS BASICOS O NO
  titleRef: RefObject<HTMLSelectElement | null>;
  hasWorkArea: boolean;
  hasBudge: boolean;
  isStepValid: boolean;
  valueSelected: string;
};