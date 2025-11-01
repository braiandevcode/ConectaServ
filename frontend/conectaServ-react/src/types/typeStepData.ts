import type { EKeyDataByStep } from "./enums";
import type { TStepBasic } from "./typeBasic";
import type { TStepOne } from "./typeStepOne";
import type { TStepThree } from "./typeStepThree";
import type { TStepTwo } from "./typeStepTwo";

export type TStepDataTasker = {
  [EKeyDataByStep.ONE]: TStepOne;
  [EKeyDataByStep.TWO]: TStepTwo;
  [EKeyDataByStep.THREE]?: TStepThree;
  [EKeyDataByStep.FOUR]: TStepBasic;
};