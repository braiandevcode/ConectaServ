import validateStep from "../utils/validators/validateStep.js";
import { formState, globalStateValidationStep } from "../config/constant.js";
import { TFormElement } from "../types/types";
import { groupEveryGroupHasChecked } from "../ui/auxiliars.js";

globalStateValidationStep
const stepThree = ({ step, form, e }: { step: number, form: HTMLFormElement, e: Event }) => {
    const target = e.target as TFormElement;
    if (!target.name) return;

    const groupNames = formState.hasContext
        ? ['service[]', 'context[]', 'day[]', 'hour[]']
        : ['service[]', 'day[]', 'hour[]'];

    globalStateValidationStep.isValidCheckBoxesDetailsProfession = groupEveryGroupHasChecked({ groupNames });

    validateStep({ step, form });
}

export default stepThree;