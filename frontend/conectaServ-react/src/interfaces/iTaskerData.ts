import type { TBudgetData, TCategoryData, TDayData, THourData, TImageData, TServiceData, TWorkAreaData } from "../types/typeRegisterEndDto";

export interface ITaskerData {
  description: string;
  imageProfileData: TImageData | null; 
  imageExperienceData: TImageData[]; 
  categoryData: TCategoryData;
  serviceData: TServiceData;
  workAreaData: TWorkAreaData;
  dayData: TDayData;
  hourData: THourData;
  budgetData?: TBudgetData;
}