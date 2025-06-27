//IMPORTACIONES
import stepThree from "./stepThree.js";
import stepTwoSelectCategory from "./stepTwoSelectCategory.js";
import stepFourBudgeSelected from "./stepFourBudgeSelected.js";
import eventTypeInput from "../events/eventTypeInput.js";
import eventTypeChange from "../events/eventTypeChange.js";
import stepFourAmountBudge from "../ui/stepFourAmountBudge.js";
import stepOneOrZero from "./stepOneOrZero.js";
import stepFourOrFiveDescription from "./stepFourOrFiveDescription.js";
import { TCbEventPropsRegistro } from "../types/types.js";
import lastStepCheckTerms from "./lastStepCheckTerms.js";
import stepFourOrFiveFiles from "./stepFourOrFiveFiles.js";


//FUNCION PARA LOS EVENTOS DE PASOS EN REGISTRO DE PROFESIONAL DONDE SE HACE USO DE LAS FUNCIONES DE EVENTOS
const setupEventsByStep = ({ step, form, btn }: {
    step: number;
    form: HTMLFormElement;
    btn?: HTMLButtonElement;
}): void => {
    // EVENTO DE INPUT
    eventTypeInput<TCbEventPropsRegistro>({
        step,
        form,
        btn,
        cbEvent: ({ step, e, form, context }) => {
            if (!form) return null;

            if ((step === 1 || step === 0) && e) {
                stepOneOrZero({ step, e, form });
            }

            if (step === 4 && context?.budgeSelect && e) {
                stepFourAmountBudge({ step, e, form, btn, budgeSelect: context.budgeSelect });
            }

            if ((step === 4 || step === 5) && e) {
                stepFourOrFiveDescription({ step, e, form });
            }
        }
    });

    // EVENTO DE CAMBIO
    eventTypeChange<TCbEventPropsRegistro>({
        step,
        form,
        cbEvent: ({ step, e, form }) => {
            if (!form) return null;

            if ((step === 0 || step === 4 || step === 5) && e) {
                if (step === 4 || step === 5) {
                    stepFourOrFiveFiles({ step, form, e });
                }
                lastStepCheckTerms({ step, e, form });
            }

            

            // SI EL PASO ES EL 2
            if (step === 2) {
                stepTwoSelectCategory({ step, form });
            }
            // SI EL PASO ES EL 4
            if (step === 4) {
                stepFourBudgeSelected({ step, form, btn });
            }

            // SI EL PASO ES EL 3 Y SI EXISTE EL OBJETO DE EVENTO
            if (step === 3 && e) {
                stepThree({ step, form, e });
            }
        }
    });

}

export default setupEventsByStep

