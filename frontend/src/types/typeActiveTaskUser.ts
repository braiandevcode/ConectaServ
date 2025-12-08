import type { TBudgetData } from "./typeDataPayloadUser";

export type TActiveTaskerUser = {
  idUser: string;
  fullName: string;
  userName: string;

  roles: {
    idRole: string;
    nameRole: string;
  }[];

  tasker: {
    idTasker: string;
    description: string;
    idCategory: string;
  };

  budget:TBudgetData | null;

  days: string[];
  hours: string[];
  services: string[];
  worksArea: string[];
  category: string;

  profileImageUrl: string | null;

  imageProfileBase64:string | null;
};