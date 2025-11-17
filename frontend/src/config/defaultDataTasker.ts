import { ECategoryKey, EKeyDataByStep, ELocationKey } from "../types/enums";
import type { TStepDataTasker } from "../types/typeStepData";


// VALORES POR DEFECTO DE DATOS DE PROFESIONAL
export const defaultDataTasker: TStepDataTasker = {
  [EKeyDataByStep.ONE]: {
    categoryData:{
      category: ECategoryKey.NONE,
    },
    workAreaData:{
      workArea:[]
    },
    serviceData:{
       service:[]
    },
    dayData:{
      day:[]
    },
    hourData:{
      hour:[]
    },
    valueSelected: '',
  },
  [EKeyDataByStep.TWO]: {
    description:'',
    imageProfileData:null,
    imageExperienceData: [],
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
    locationData: {
      cityName:ELocationKey.NONE
    }
  },
};
