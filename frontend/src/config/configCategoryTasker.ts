import { EEntitiesGroup } from '../types/enums';
import type { TCategoryKey } from '../types/typeCategory';
import type { TCategoryConfig } from '../types/typeConfigCategory';
import type { TOptionWork } from '../types/typeOptionsWork';
import { WORK_AREA, DATE_DAYS, DATE_HOUR } from './configDetailsWork';
import { GARDENNING_AND_OUTDOOR_MAINTENANCE, MOVING_AND_TRANSPORT, REPAIR_AND_MAINTENANCE } from './configItemsCategoryPro';

// ICONOS DE REACT
import { FaTools } from 'react-icons/fa';
import { FaBuilding } from 'react-icons/fa';
import { FaCalendarDays } from 'react-icons/fa6';
import { IoMdClock } from 'react-icons/io';


// CONFIGURACION DE SELECTS DE CATEGORIAS
export const categoryConfigs: Record<Exclude<TCategoryKey, 'none'>, TCategoryConfig> = {
  'reparacion-mantenimiento': {
    options: [
      { options: REPAIR_AND_MAINTENANCE, type: 'service' as TOptionWork, icon: FaTools, title: 'Servicios', entitie:EEntitiesGroup.SERVICE_DATA },
      { options: WORK_AREA, type: 'workArea' as TOptionWork, icon: FaBuilding, title: 'Habitos', entitie:EEntitiesGroup.WORK_AREA_DATA },
      { options: DATE_DAYS, type: 'day' as TOptionWork, icon: FaCalendarDays, title: 'Días', entitie:EEntitiesGroup.DAY_DATA },
      { options: DATE_HOUR, type: 'hour' as TOptionWork, icon: IoMdClock, title: 'Horarios', entitie:EEntitiesGroup.HOUR_DATA },
    ],
  },

  jardineria: {
    options: [
      { options: GARDENNING_AND_OUTDOOR_MAINTENANCE, type: 'service' as TOptionWork, icon: FaTools, title: 'Servicios', entitie:EEntitiesGroup.SERVICE_DATA },
      { options: WORK_AREA, type: 'workArea' as TOptionWork, icon: FaBuilding, title: 'Habitos', entitie:EEntitiesGroup.WORK_AREA_DATA },
      { options: DATE_DAYS, type: 'day' as TOptionWork, icon: FaCalendarDays, title: 'Días', entitie:EEntitiesGroup.DAY_DATA },
      { options: DATE_HOUR, type: 'hour' as TOptionWork, icon: IoMdClock, title: 'Horarios', entitie:EEntitiesGroup.HOUR_DATA },
    ],
  },

  'mudanza-transporte': {
    options: [
      { options: MOVING_AND_TRANSPORT, type: 'service' as TOptionWork, icon: FaTools, title: 'Servicios', entitie:EEntitiesGroup.SERVICE_DATA },
      { options: DATE_DAYS, type: 'day' as TOptionWork, icon: FaCalendarDays, title: 'Días', entitie:EEntitiesGroup.DAY_DATA },
      { options: DATE_HOUR, type: 'hour' as TOptionWork, icon: IoMdClock, title: 'Horarios', entitie:EEntitiesGroup.HOUR_DATA },
    ],
  },
};
