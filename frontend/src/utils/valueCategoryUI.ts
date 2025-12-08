import { ECategoryKey } from '../types/enums';
import type { TCategoryTasker } from '../types/typeCategoryTasker';

export const valueCategoryUI = (C: string): TCategoryTasker => {
  // DEPENDIENDO DE CATEGORIA PASAR A FORMATO LEGIBLE AL USUARIO FINAL
  const category: TCategoryTasker = C === ECategoryKey.REPAIR ? 'Reparación y Mantenimiento' : C === ECategoryKey.GARDEN ? 'Jardinería' : C === ECategoryKey.MOVE ? 'Mudanzas y Transportes' : undefined;
  return category;
};
