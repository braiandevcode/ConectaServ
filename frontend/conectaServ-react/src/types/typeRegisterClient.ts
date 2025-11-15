import type { Dispatch, SetStateAction } from 'react';
import type { iFormStateValidationClient } from '../interfaces/iFormStateValidationClient';
import type { TDataClient } from './typeDataClient';
// import type { IUserData } from '../interfaces/iUserData';

// TIPO PARA DATOS DE REGISTRO DE CLIENTE
export type TRegisterClient = {
  validateClient: () => boolean;
  setFormState: Dispatch<SetStateAction<iFormStateValidationClient>>;
  setDataClient: Dispatch<SetStateAction<TDataClient>>;
  setIsLoaded: Dispatch<SetStateAction<boolean>>;
  setIsValid: Dispatch<SetStateAction<boolean>>;
  isLoaded: boolean;
  formState: iFormStateValidationClient;
  dataClient: TDataClient;
  isValid: boolean;
};
