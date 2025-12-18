import type { ERoles } from './enumRoles';
import type { ECategoryKey, ELocationKey } from './enums';
import type { TYesOrNo } from './typeRadioYesOrNo';
import type { TResource } from './typeResource';
import type { TIdString } from './typeUUID';

export type TImageDataStored = {
  idImage: TIdString;
  publicId: string; // Identificador de Cloudinary
  url: string; // URL directa de la imagen en Cloudinary
  bytes: number;
  displayName: string;
  format: string;
  type: string;
  resourceType: TResource;
  secureUrl: string;
  signature: string;
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
  reinsert: TYesOrNo;
};
