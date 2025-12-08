import type { RefObject } from "react";
import type { TStepThreeProps } from "./typePropsStepThree";

export type TTypeContextStepThree = Pick<TStepThreeProps, 'handleBudgeAmount' |  'onChangeIsBudge' | 'onChangeIsReinsert' > &{
    amountRef: RefObject<HTMLInputElement | null>
};
