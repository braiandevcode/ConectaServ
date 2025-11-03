import type { TCategoryKey } from "./typeCategory";

// TIPO PASO 1  (para guardar en STEP_DATA en localStorage)
export type TStepOne = {
  category: TCategoryKey;
  'service[]': string[];
  'context[]'?: string[];
  'day[]': string[];
  'hour[]': string[];
  valueSelected: string;
};