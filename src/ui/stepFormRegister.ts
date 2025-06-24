//IMPORTACIONES
import stepThree from "./stepThree.js";
import stepTwoSelectCategory from "./stepTwoSelectCategory.js";
import stepFourBudgeSelected from "./stepFourBudgeSelected.js";
import eventTypeInput from "../events/eventTypeInput.js";
import eventTypeChange from "../events/eventTypeChange.js";
import stepFourAmountBudge from "../ui/stepFourAmountBudge.js";
import stepOne from "../ui/stepOne.js";
import stepFourOrFive from "../ui/stepFourOrFive.js";

export const setupEventsByStep = ({ step, form, btn }: {
    step: number;
    form: HTMLFormElement;
    btn?: HTMLButtonElement | undefined;
}): void => {
    // EVENTO DE INPUT
    eventTypeInput({
        step, 
        form,
        btn,
        cbStep: ({ step, e, budgeSelect, isValidFinal, errorFinal, listSectionProfile }) => {
            // DELEGACION SEGUN PASO
            if (step === 1) {
                // const inputsBasic = Array.from(form.querySelectorAll<HTMLInputElement>(`input[name]`));
                if(e === undefined) return;
                stepOne({ step, form, e });
            }

            if (step === 4 && budgeSelect && e !== undefined) {
                stepFourAmountBudge({ step, btn, form, e, budgeSelect });
            }

            if ((step === 4 || step === 5) && e !== undefined && isValidFinal !== undefined && errorFinal !== undefined && listSectionProfile !== undefined) {
                stepFourOrFive({ step, e, form, isValidFinal, errorFinal, listSectionProfile });
            }
        }
    });

    // EVENTO DE CAMBIO
    eventTypeChange({
        step, form,
        cbStep: ({ step, e, btn }) => {
            // DELEGACION SEGUN PASO
            if (step === 2) {
                stepTwoSelectCategory({ step, form });
            }

            if (step === 4) {
                stepFourBudgeSelected({ step, form, btn });
            }

            if (step === 3) {
                if (e === undefined) return;
                stepThree({ step, form, e });
            }
        }
    });

};

