import { stepStatus } from "./stepFormRegister.js";

const clickEventStepFormRegister = ({ selectorSection }:{ selectorSection: string }): void => {
    document.addEventListener('click', (event: MouseEvent) => {
        const target = event.target as HTMLElement;

        const $BUTTON = target.closest<HTMLButtonElement>('.container-btn__next[data-step]');
        if (!$BUTTON) return;

        const step:number = parseInt($BUTTON.dataset.step || '0', 10);

        if (!stepStatus[step]) {
            console.log('Inputs incompletos, no se puede avanzar');
            $BUTTON.setAttribute('disabled', 'true');
            return;
        }

        console.log(`Avanzando de paso ${step} a ${step + 1}`);

        const $SECTION_STEP_CURRENT = document.querySelector(`.${selectorSection}[data-step="${step}"]`);

        console.log($SECTION_STEP_CURRENT);
        
        const $SECTION_STEP_NEXT = document.querySelector(`.${selectorSection}[data-step="${step + 1}"]`);

        console.log($SECTION_STEP_NEXT);
        

        $SECTION_STEP_CURRENT?.classList.add(`${selectorSection}--hidden`);
        $SECTION_STEP_NEXT?.classList.remove(`${selectorSection}--hidden`);
    });
}

export default clickEventStepFormRegister;
