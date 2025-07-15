import { TInputs } from "../types/types";

const getStepValidationMap = ({ hasBudget }: { hasBudget: boolean }): Record<number, TInputs> => {
  return hasBudget
    ? {
      0: 'client',
      1: 'selectedCategoryAndCheckBoxes',
      2: 'filesAndDescription',
      3: 'radioBudgetFull',
      4: 'text',
    }
    : {
      0: 'client',
      1: 'selectedCategoryAndCheckBoxes',
      2: 'filesAndDescription',
      3: 'text',
    };
};

export default getStepValidationMap;
