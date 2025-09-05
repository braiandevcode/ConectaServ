import clearElementChild from "../dom/clearElementChild.js";
import { createExperienceImagesPreviews, createProfileImagePreview } from "../dom/createElementsDom.ts.js";
import { validateFieldsWithErrorsUI } from "./fieldsValidateUI.js";
import { TFieldName } from "../types/types.js";
import validateStep from "../utils/validators/validateStep.js";
import { globalStateValidationStep } from "../config/constant.js";

const stepFourOrFiveFiles = ({ step, form, e, }: { step: number, form: HTMLFormElement, e: Event }): void | null => {
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
            values:[],
            file: target.multiple ? null : target.files[0],
            files: target.multiple ? target.files : null,
        });


        if (validationResult) {
            const isValid = validationResult.isValid;

            if (target.multiple) {
               globalStateValidationStep.isValidExperiences = isValid;
            } else {
               globalStateValidationStep.isValidProfile = isValid;
            }

            if (!isValid) {
                if (target.multiple) {
                    clearElementChild({ elements: [$CONTAINER_IMAGES_EXPERIENCES] });
                } else {
                    clearElementChild({ elements: [$CONTAINER_IMAGE_PROFILE] });
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

            validateStep({ step, form });
        }

    }
}


export default stepFourOrFiveFiles;