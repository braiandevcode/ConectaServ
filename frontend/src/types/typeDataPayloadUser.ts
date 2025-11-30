type TBudgetData ={
  amountBudget:number;
  budgeSelected:string;
  reinsert:string;
}

export type TDataPayloadUser = {
  sub: string;
  userName: string;
  fullName: string;
  email?: string;
  roles: string[];
  isTasker: boolean;

  // SOLO SI ES TASKER, siempre arrays (vacíos si no hay datos)
  days: string[];
  hours: string[];
  services: string[];
  worksArea: string[];
  category: string | null;
  budget?: TBudgetData | null;
  profileImage: string | null;
  description: string | null;
  experienceImages: string[];
}
