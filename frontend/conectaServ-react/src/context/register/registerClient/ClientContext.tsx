import { createContext } from 'react';
import { emptyDataClient, formStateValidFieldClient } from '../../../config/constant';
import type { TRegisterClient } from '../../../types/typeRegisterClient';
// DEFINIR VALORES POR DEFECTO DE LOS ESTADOS
const defaultRegisterClientContext: TRegisterClient = {
  setDataClient: () => {},
  validateClient: () => false,
  setIsLoaded: () => {},
  setFormState: () => {},
  setIsValid: () => {},
  isLoaded: false,
  isValid: false,
  formState: formStateValidFieldClient,
  dataClient: emptyDataClient,
};

export const ClientContext = createContext<TRegisterClient>(defaultRegisterClientContext);
