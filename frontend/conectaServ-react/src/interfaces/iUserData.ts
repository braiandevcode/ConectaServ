import type { TLocationData, TRoleData } from "../types/typeRegisterEndDto";
import type { ITaskerData } from "./iTaskerData";

export interface IUserData {
  fullName: string;
  userName: string;
  email: string;
  password?: string; //OPCIONAL SI SE USA PARA ACTUALIZACIONES
  roleData: TRoleData;
  locationData: TLocationData;
  isVerified: boolean;
  taskerData?: ITaskerData;
}