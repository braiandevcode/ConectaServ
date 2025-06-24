import { TInputs } from "../types/types";

const getStepValidationMap = ({hasBudget }: { hasBudget:boolean }): Record<number, TInputs> => {
  return hasBudget
    ? {
        1: 'text',
        2: 'selectedCategoryAndCheckBoxes',
        3: 'checkbox',
        4: 'radioBudgetFull',     
        5: 'filesTextareaTerms', 
      }
    : {
        1: 'text',
        2: 'selectedCategoryAndCheckBoxes',
        3: 'checkbox',
        4: 'filesTextareaTerms', 
      };
};

export default getStepValidationMap;
