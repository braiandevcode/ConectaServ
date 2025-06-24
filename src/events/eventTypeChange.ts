import { TFieldName, TFormElement } from "../types/types";
import { createTitleCategorySelected } from "../dom/createElementsDom.ts.js";
import { iEventChange } from "../interfaces/interfaces";
import stepFourOrFiveFilesPreviews from "../ui/stepFourOrFiveFilesPreviews.js";
import isCategory from "../utils/validators/isCategory.js";
import { ECategoryKey, EKeyDataByStep } from "../types/enums.js";
import saveDataStep from "../utils/saveDataStep.js";

const eventTypeChange = ({ cbStep, step, form }: iEventChange): void | null => {
    const stepKey:string = String(step);
    const allFormElements = Array.from(form?.elements as Iterable<TFormElement>) as  TFormElement[];
    form?.addEventListener('change', (e: Event) => {
        const isCategoryRepair = isCategory({ category: ECategoryKey.REPAIR, key: EKeyDataByStep.TWO });

        const target = e.target as TFormElement;
        if (!target.name) return;

        const fieldName = target.name as TFieldName;

        // SELECT DE CATEGORIAS
        if ((step === 2 && fieldName === "category")) {
            createTitleCategorySelected();
            cbStep({ step, form });
            saveDataStep({ step: stepKey, elements: allFormElements });
        }

        if (step === 3 && ['service[]', 'context[]', 'day[]', 'hour[]'].includes(target.name)) {
            cbStep({ step, form, e });
            saveDataStep({ step: stepKey, elements: allFormElements });
        }

        // CHECK DE TERMINOS
        // if (((step === 4 && !isCategoryRepair) || step === 5) && target === $CHECKSBOX_TERMS) {
        //     isCheckedTerms = target.checked;
        //     validateStep({ step, listSectionProfile });

        //     // saveDataStep({ step: stepKey, elements: allFormElements });
        // }

        if (['imageProfile', 'imageExperiences'].includes(fieldName) && isCategoryRepair && (step === 5)) {
            stepFourOrFiveFilesPreviews({ step, form, e });
            saveDataStep({ step: stepKey, elements: allFormElements });
        }

        if (['imageProfile', 'imageExperiences'].includes(fieldName) && !isCategoryRepair && (step === 4)) {
            stepFourOrFiveFilesPreviews({ step, form, e });
            saveDataStep({ step: stepKey, elements: allFormElements });
        }

        // PRESUPUESTO - RADIO  
        if (step === 4 && ['budgeSelected', 'reinsert'].includes(fieldName)) {
            cbStep({ step, e, form });
            saveDataStep({ step: stepKey, elements: allFormElements });
        }
    });
}

export default eventTypeChange;