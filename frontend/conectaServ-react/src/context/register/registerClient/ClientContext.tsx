import { createContext } from 'react';
import type { TRegisterClient } from '../../../types/types';
import { emptyDataClient, formStateValidFieldClient } from '../../../config/constant';
// DEFINIR VALORES POR DEFECTO DE LOS ESTADOS
const defaultRegisterClientContext: TRegisterClient = {
  setDataClient: () => {},
  validateClient: () => false,
  onSubmitForm: () => {},
  setFormState: () => {},
  // setStoredLocation: () => {},
  setIsValid: () => {},
  isValid:false,
  formState: formStateValidFieldClient,
  // storedFullName: '',
  dataClient: emptyDataClient,
  // storedUserName: '',
  // storedLocation: ELocationKey.NONE,
  // storedEmail: '',
  // confirmPassword: '',
  // password: '',
};

export const ClientContext = createContext<TRegisterClient>(defaultRegisterClientContext);
