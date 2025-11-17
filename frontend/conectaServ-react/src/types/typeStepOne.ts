import type { TCategoryData, TDayData, THourData, TServiceData, TWorkAreaData } from './typeRegisterEndDto';

// TIPO PASO 1  (para guardar en STEP_DATA en localStorage)
export type TStepOne = {
  categoryData: TCategoryData;
  serviceData: TServiceData;
  workAreaData?: TWorkAreaData;
  dayData: TDayData;
  hourData: THourData;
  valueSelected: string;
};
