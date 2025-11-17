import type { ERoles } from "./enumRoles";
import type { ECategoryKey, ELocationKey } from "./enums";
import type { TYesOrNo } from "./typeRadioYesOrNo";
import type { TIdString } from "./typeUUID";

export type TImageData = {
  size: number;
  name: string;
  type: string;
  idImage: TIdString,
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
  budgeSelected: TYesOrNo;
  reinsert: TYesOrNo ;
};