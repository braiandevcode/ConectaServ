import type { TBudgetData, TCategoryData, TDayData, THourData, TImageDataStored, TServiceData, TWorkAreaData } from "../types/typeRegisterEndDto";

export interface ITaskerData {
  description: string;
  imageProfileData?: TImageDataStored| null; 
  imageExperienceData?: TImageDataStored[]; 
  categoryData: TCategoryData;
  serviceData: TServiceData;
  workAreaData: TWorkAreaData;
  dayData: TDayData;
  hourData: THourData;
  budgetData?: TBudgetData;
}