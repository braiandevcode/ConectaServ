import type { TCategoryKey } from '../types/typeCategory';
import type { TCategoryConfig } from '../types/typeConfigCategory';
import { CONTEXTS, DATE_DAYS, DATE_HOUR } from './configDetailsWork';
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
      { options: REPAIR_AND_MAINTENANCE, type: 'service', icon: FaTools, title: 'Servicios' },
      { options: CONTEXTS, type: 'context', icon: FaBuilding, title: 'Habitos' },
      { options: DATE_DAYS, type: 'day', icon: FaCalendarDays, title: 'Días' },
      { options: DATE_HOUR, type: 'hour', icon: IoMdClock, title: 'Horarios' },
    ],
  },

  jardineria: {
    options: [
      { options: GARDENNING_AND_OUTDOOR_MAINTENANCE, type: 'service', icon: FaTools, title: 'Servicios' },
      { options: CONTEXTS, type: 'context', icon: FaBuilding, title: 'Habitos' },
      { options: DATE_DAYS, type: 'day', icon: FaCalendarDays, title: 'Días' },
      { options: DATE_HOUR, type: 'hour', icon: IoMdClock, title: 'Horarios' },
    ],
  },

  'mudanza-transporte': {
    options: [
      { options: MOVING_AND_TRANSPORT, type: 'service', icon: FaTools, title: 'Servicios' },
      { options: DATE_DAYS, type: 'day', icon: FaCalendarDays, title: 'Días' },
      { options: DATE_HOUR, type: 'hour', icon: IoMdClock, title: 'Horarios' },
    ],
  },
};
