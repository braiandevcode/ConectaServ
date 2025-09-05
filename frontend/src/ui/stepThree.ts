import validateStep from "../utils/validators/validateStep.js";
import { formState, globalStateValidationStep } from "../config/constant.js";
import { TFieldName, TFormElement } from "../types/types";
import { validateFieldsWithErrorsUI } from "./fieldsValidateUI.js";
// import { groupEveryGroupHasChecked } from "../ui/auxiliars.js";

const stepThree = ({ step, form, e }: { step: number, form: HTMLFormElement, e: Event }) => {
    const target = e.target as TFormElement;
    if (!target.name) return;


    // VERIFICAR CAMPOS QUE MUESTRAN MENSAJE DE ERROR EN CAMPOS
    const result = validateFieldsWithErrorsUI({
        fieldName: target.name as TFieldName,
        value: '',
        values: formState.hasContext ? ['service[]', 'context[]', 'day[]', 'hour[]'] : ['service[]', 'day[]', 'hour[]'],
        file: null,
        files: null
    });

    if (result) {
        globalStateValidationStep.isValidCheckBoxesDetailsProfession = result?.isValid;
    }
    validateStep({ step, form });
}

export default stepThree;