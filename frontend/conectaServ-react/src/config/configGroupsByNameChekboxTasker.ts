import { EEntitiesGroup, EGroupCheckBox } from "../types/enums";

// RELACION ENTRE ENTIDAD Y SU GROUP
export const ENTITY_TO_GROUP = {
  [EEntitiesGroup.SERVICE_DATA]: EGroupCheckBox.SERVICE,
  [EEntitiesGroup.WORK_AREA_DATA]: EGroupCheckBox.WORK_AREA,
  [EEntitiesGroup.DAY_DATA]: EGroupCheckBox.DAY,
  [EEntitiesGroup.HOUR_DATA]: EGroupCheckBox.HOUR,
} as const;
