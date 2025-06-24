import validateStep from "../utils/validators/validateStep.js";
import { formState } from "../config/constant.js";
import { TFormElement } from "../types/types";
import { groupEveryGroupHasChecked } from "../utils/allInputsFilled.js";

export let isValidCheckBoxesDetailsProfession = false; //VARIABLE BOOLEANA PARA EL PASO DE LOS CHECKSBOXES DE DETALLES DE PROFESION

const stepThree = ({ step, form, e }: { step: number, form:HTMLFormElement, e: Event }) => {
    const target = e.target as TFormElement;
    if (!target.name) return;

    const groupNames = formState.hasContext
        ? ['service[]', 'context[]', 'day[]', 'hour[]']
        : ['service[]', 'day[]', 'hour[]'];

    isValidCheckBoxesDetailsProfession = groupEveryGroupHasChecked({ groupNames });

    validateStep({ step, form });
}

export default stepThree;