import { ECategoryKey, EKeyDataByStep, ELocationKey } from '../types/enums';
import type { TStepDataTasker } from '../types/typeStepData';

// VALORES POR DEFECTO DE DATOS DE PROFESIONAL
export const defaultDataTasker: TStepDataTasker = {
  type: 'tasker',
  [EKeyDataByStep.ONE]: {
    category: ECategoryKey.NONE,
    'service[]': [],
    'context[]': [],
    'day[]': [],
    'hour[]': [],
    valueSelected: '',
  },
  [EKeyDataByStep.TWO]: {
    descriptionUser: '',
    imageProfile: null,
    imageExperiences: [],
  },
  [EKeyDataByStep.THREE]: {
    budgeSelected: 'no',
    reinsert: 'no',
    amountBudge: 0,
  },
  [EKeyDataByStep.FOUR]: {
    fullName: '',
    userName: '',
    email: '',
    location: ELocationKey.NONE,
  },
};
