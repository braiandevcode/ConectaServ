import type { ChangeEvent, Dispatch, FocusEvent, FormEvent, SetStateAction } from "react";

// TIPO PASO 3 PARA CONTEXTO
export type TStepThreeProps = {
  setIsBudgeMountDisabled: (isBudgetDisabled: boolean) => void;
  setIsReinsertDisabled: (isReinsertDisabled: boolean) => void;
  onChangeIsReinsert: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeIsBudge: (e: ChangeEvent<HTMLInputElement>) => void;
  handleBudgeAmount: (e: FormEvent<HTMLInputElement>) => void;
  onBlurAmount: (e: FocusEvent<HTMLInputElement>) => void;
  onFocusAmount: () => void;
  setAmountFieldFormat: Dispatch<SetStateAction<string>>;
  amountFieldFormat: string;
  isBudgeMountDisabled: boolean;
  isReinsertDisabled: boolean;
};