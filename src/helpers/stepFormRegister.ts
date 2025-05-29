import { TFormStep } from "../types/types";
import allInputsFilled from "./evaluateInputsValue.js";

export const stepStatus: Record<number, boolean> = {};  //ESTADO GLOBAL DE PASOS

const stepInputs = ({ step, formSelector, btnSelector }: TFormStep ): void => {
    const $INPUTS: NodeListOf<HTMLInputElement> = document.querySelectorAll(`.register-${formSelector} [data-step="${step}"] input`);
    const $BUTTON: HTMLButtonElement | null = document.querySelector(`.${btnSelector}[data-step="${step}"]`);

    // RECORRE TODOS LOS INPUTS DEL FORMULARIO
    $INPUTS.forEach(input => {
        input.addEventListener('input', () => {
            const isComplete = allInputsFilled({ inputs: $INPUTS });
            if (isComplete) {
                $BUTTON?.removeAttribute('disabled');
            } else {
                $BUTTON?.setAttribute('disabled', 'true');
            }
            stepStatus[step] = isComplete;
        });
    });
}

export default stepInputs;