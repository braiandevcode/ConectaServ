import type { ERoles } from "./enumRoles";
import type { ECategoryKey, ELocationKey } from "./enums";

export type TImageData = {
  size: number;
  name: string;
  type: string;
  dataUrl: string;
};

export type TRoleData = {
  role: ERoles | null; 
};

export type TLocationData = {
  cityName: ELocationKey;
};

// TIPOS PARA TASKER DATA
export type TCategoryData = {
  category: ECategoryKey;
};

export type TServiceData = {
  service: string[];
};

export type TWorkAreaData = {
  workArea: string[];
};

export type TDayData = {
  day: string[];
};

export type THourData = {
  hour: string[];
};

export type TBudgetData = {
  amountBudge: number;
  budgeSelected: 'yes' | 'no' | string;
  reinsert: 'yes' | 'no' | string;
};