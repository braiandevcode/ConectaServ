import { createContext } from 'react';
import type { TTypeContextBasic} from '../../../types/types';

// DEFINIR VALORES POR DEFECTO DE LOS ESTADOS
const defaultClientContext: TTypeContextBasic = {
  handleChangeLocation: () => {},
  handleConfirmPassword: () => {},
  handleEmail: () => {},
  handleFullName: () => {},
  handlePassword: () => {},
  handleUserName: () => {},
};

export const FieldsClientContext = createContext<TTypeContextBasic>(defaultClientContext);