import type { FormEvent } from "react";
import type { iFormStateValidationClient } from "../interfaces/iFormStateValidationClient";
import type { TDataClient } from "./typeDataClient";

// TIPO PARA DATOS DE REGISTRO DE CLIENTE
export type TRegisterClient = {
  validateClient: () => boolean;
  setFormState: React.Dispatch<React.SetStateAction<iFormStateValidationClient>>;
  setDataClient: React.Dispatch<React.SetStateAction<TDataClient>>;
  onSubmitForm: (e: FormEvent<HTMLFormElement>) => void;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
  formState: iFormStateValidationClient;
  dataClient: TDataClient;
  isValid: boolean;
};