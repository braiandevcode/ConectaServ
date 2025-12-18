export type TBudgetData = {
  idBudget: string | undefined | null;
  budgeSelected: string | undefined | null;
  reinsertSelected: string | undefined | null;
  amount: number;
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

  publicIdProfile: string;
  publicIdExperiences: string[];

  idProfile: string;
  idExperiences: string[];
};
