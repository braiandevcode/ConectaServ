import type { TStepBasic } from './typeBasic';
import type { TYesOrNo } from './typeRadioYesOrNo';
import type { TStepOne } from './typeStepOne';
import type { TStepThree } from './typeStepThree';
import type { TStepTwo } from './typeStepTwo';

// TIPADO PARA DATOS DE PROFESIONAL DEFINIDO AL SERVIDOR
export type TPlaintTasker = Omit<TStepOne, 'valueSelected'> &
  TStepTwo &
  TYesOrNo &
  TStepThree &
  TStepBasic & {
    password: string;
    roles: string;
    isVerified:boolean;
  };
