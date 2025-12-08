import type {  SetStateAction } from "react"
import type { TStepDataTasker } from "../types/typeStepData"
import type { iFormStateValidationTask } from "./iFormStateValidationTask";
// FIRMA PARA EVENTO EN DESCRIPTION
export interface iPropsHandleDescriptionInput{
   setStepData?: (value: SetStateAction<TStepDataTasker>) => void;
   setIsStepValid:(value: boolean) => void;
   formState: iFormStateValidationTask;
}