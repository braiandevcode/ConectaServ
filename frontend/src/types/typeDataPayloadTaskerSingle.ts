import type { TDataPayloadUser } from './typeDataPayloadUser';

// FIRMA DE ESTRUCTURA DE DATOS DE UN SOLO TASKER
export type TDataPayloadTaskerSingle = Omit<TDataPayloadUser, 'roles'> & {
  isRepair: boolean;
  isWorkAreas: boolean;
  city: string;
  taskerId: string;
  roles:{
    idRole: string;
    nameRole: string;
  }[];
};
