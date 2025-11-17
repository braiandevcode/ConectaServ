// TIPADO DE GRUPOS DE CHECKBOXES
import type { ENTITY_TO_GROUP } from "../config/configGroupsByNameChekboxTasker";

// TIPO DE ENTIDADES SEGUN LAS KEYS DEL MAPEO
export type TEntitie = keyof typeof ENTITY_TO_GROUP;

// TIPO DE GROUPS SEGUN LOS VALUES DEL MAPEO
export type TOptionWork = typeof ENTITY_TO_GROUP[TEntitie];