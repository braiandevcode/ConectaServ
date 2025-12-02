type TBudgetData = {
  amountBudget: number;
  budgeSelected: string;
  reinsert: string;
};

export type TDataPayloadUser = {
  sub: string;
  userName: string;
  fullName: string;
  email?: string;
  roles: string[];
  isTasker: boolean;

  days: string[];
  hours: string[];
  services: string[];
  worksArea: string[];
  category: string | null;
  budget?: TBudgetData | null;
  description: string | null;

  profileImageUrl: string | null;
  experienceImagesUrl: string[];

  imageProfileBase64:string | null;
  imageExpBase64:string[];
};

