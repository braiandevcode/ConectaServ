import type { TLocationData, TRoleData } from '../types/typeRegisterEndDto';
import type { ITaskerData } from './iTaskerData';

export interface IUserData {
  fullName: string;
  userName: string;
  email: string;
  roleData: TRoleData;
  password?: string; //OPCIONAL SI SE USA PARA ACTUALIZACIONES
  locationData: TLocationData;
  isVerified: boolean;
  taskerData?: ITaskerData;
}
