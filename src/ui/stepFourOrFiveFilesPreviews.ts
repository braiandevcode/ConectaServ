// import { validateImageExperiences, validateImageProfile } from "../utils/validators/validateProfileValue.js";
import clearElementChild from "../dom/clearElementChild.js";
import { createExperienceImagesPreviews, createProfileImagePreview } from "../dom/createElementsDom.ts.js";
import { validateFieldsWithErrorsUI } from "./fieldsValidateUI.js";
import { TFieldName } from "../types/types.js";
import validateStep from "../utils/validators/validateStep.js";
// import { formStateValidField } from "@config/constant.js";

export let isValidExperiences: boolean = false;
export let isValidProfile: boolean = false;

const stepFourOrFiveFilesPreviews = ({ step, form, e, }: { step: number, form: HTMLFormElement, e: Event }): void | null => {
    const $CONTAINER_IMAGE_PROFILE = document.querySelector('.form-professional-groupProfile__previewImage') as HTMLElement | null;
    const $CONTAINER_IMAGES_EXPERIENCES = document.querySelector('.form-professional-groupProfile__previewMultipleImages') as HTMLElement | null;

    if (!$CONTAINER_IMAGE_PROFILE || !$CONTAINER_IMAGES_EXPERIENCES) return;

    const target = e.target as HTMLInputElement;

    if (!target.name) return null;

    const fieldName = target.name as TFieldName;

    if (target.files && target.files.length > 0) {
        const validationResult = validateFieldsWithErrorsUI({
            fieldName,
            value: '',
            file: target.multiple ? null : target.files[0],
            files: target.multiple ? target.files : null,
        });

        const isValid = validationResult?.isValid === true;

        if (!isValid) {
            if (target.multiple) {
                clearElementChild({ elements: [$CONTAINER_IMAGES_EXPERIENCES] });
                isValidExperiences = isValid;
            } else {
                clearElementChild({ elements: [$CONTAINER_IMAGE_PROFILE] });
                isValidProfile = isValid;
            }
            const elements = target.multiple ? [$CONTAINER_IMAGES_EXPERIENCES] : [target];
            clearElementChild({ elements });
        } else {
            // LIMPIAR EL CONTENEDOR ANTES DE MOSTRAR LA NUEVA VISTA PREVIA
            if (target.multiple) {
                clearElementChild({ elements: [$CONTAINER_IMAGES_EXPERIENCES] });
                createExperienceImagesPreviews($CONTAINER_IMAGES_EXPERIENCES, target);
            } else {
                clearElementChild({ elements: [$CONTAINER_IMAGE_PROFILE] });
                createProfileImagePreview($CONTAINER_IMAGE_PROFILE, target);
            }
        }

        validateStep({ step, form }); //VALIDAR PASO ACTUAL
    }
}


export default stepFourOrFiveFilesPreviews;