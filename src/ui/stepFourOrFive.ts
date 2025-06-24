import validateStep from "../utils/validators/validateStep.js";
import { TFieldName, TFormElement } from "../types/types";
import { validateFieldsWithErrorsUI  } from "./fieldsValidateUI.js";
export let isValidDescription= false; //VARIABLE BOOLEANA PARA EL PASO 4 O 5 DE PERFIL

const D: Document = document;
const stepFourOrFive = ({ step, form, e}: { step: number, form:HTMLFormElement, e: Event, isValidFinal: boolean, errorFinal: string, listSectionProfile: string[] }) => {
    const target = e.target as TFormElement;
    if (!target.name) return;

    const fieldName = target.name as TFieldName;

    const $DESCRIPTION = D.querySelector<HTMLTextAreaElement>('.form-professional-groupProfile__textarea[name="description"]');
    const $FILE_PROFILE = D.querySelector<HTMLInputElement>('.upload-area__input[name="imageProfile"]');
    const $FILES_EXPERIENCES = D.querySelector<HTMLInputElement>('.upload-area__input[name="imageExperiences"]');
    // const resultProfile = UIFullStepProfile({
    //     description: $DESCRIPTION?.value || '',
    //     file: $FILE_PROFILE?.files?.[0] || null,
    //     files: $FILES_EXPERIENCES?.files || null,
    // });



    // const hasInvalidFields = resultProfile.some(field => !field.isValid);
    // isInvalidProfile = hasInvalidFields;
    // isValidFinal = isValidFinal && !isInvalidProfile;

    // const currentFieldError = resultProfile[listSectionProfile.indexOf(fieldName)]?.error || '';
    // errorFinal = hasInvalidFields ? currentFieldError : errorFinal;
    validateStep({ step, form });
}

export default stepFourOrFive;