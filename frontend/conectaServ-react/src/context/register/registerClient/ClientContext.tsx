import { createContext } from 'react';
import type { TRegisterClient } from '../../../types/typeRegisterClient';
import { defaultDataClient } from '../../../config/defaultDataClient';
import { formStateValidFieldClient } from '../../../config/formStateValidationFieldClient';
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
  dataClient: defaultDataClient,
};

export const ClientContext = createContext<TRegisterClient>(defaultRegisterClientContext);
