import { formState } from "../config/constant.js";
import { getStepSection, hide, isCategoryStep, show } from "./auxiliars.js";

// -----------------------FUNCIÓN MANEJADORA PARA EVENTO DE CLICK EN BOTÓN SIGUIENTE REGISTRO PROFESIONAL--------------------------- //
export const handleClickNextButton = ({ target, section, btnPrev, selectCategory }: { target: HTMLElement, section: HTMLDivElement | null, btnPrev: HTMLDivElement | null, selectCategory: HTMLSelectElement | null }): void => {
    const $NEXT_BUTTON: HTMLButtonElement | null = target.closest('.container-btn__next[data-step]');
    if ($NEXT_BUTTON) {
        if (!btnPrev) return;

        const step: number = parseInt($NEXT_BUTTON.dataset.step || '0', 10);
        const $SECTION_STEP_CURRENT = getStepSection(step);
        const $SECTION_STEP_NEXT = getStepSection(step + 1);

        if (!$SECTION_STEP_CURRENT || !$SECTION_STEP_NEXT) return;

        const dataPrev: number = parseInt($SECTION_STEP_CURRENT.dataset.step || '0', 10);

        // SI EL ESTADO DEL OBJETO GLOBAL ES FALSO DESHABILITAR BOTON SIGUIENTE
        if (!formState.stepStatus[step]) {
            $NEXT_BUTTON.setAttribute('disabled', 'true');
            return;
        }

        // OCULTAR SELECT DE ESPECIALIDAD EN PASO 3
        if (isCategoryStep(step, selectCategory)) {
            hide({ $el: selectCategory, cls: ['form-step--hidden'] });
        }

        // SI EL CLICK ES EN BOTON CON SU DATASET EN 1 SE MUESTRA EL BOTON ATRAS
        if (step === 1) {
            show({ $el: btnPrev, cls: ['register-userProfessional__arrow-left--hidden'] });
            show({ $el: section, cls: ['form-step--hidden'] });
        }

        btnPrev.dataset.step_prev = `${dataPrev}`; // ACTUALIZAR EL STEP_PREV PARA BOTON ATRAS
        hide({ $el: $SECTION_STEP_CURRENT, cls: ['form-step--hidden'] });
        show({ $el: $SECTION_STEP_NEXT, cls: ['form-step--hidden'] });
        return;
    }
}

export const handleClickPrevButton = ({ target, section, btnPrev, selectCategory }: { target: HTMLElement, section: HTMLDivElement | null, btnPrev: HTMLDivElement | null, selectCategory: HTMLSelectElement | null }): void => {
    // ---------------------------EVENTO PASO ANTERIOR FORMULARIO REGISTRO PROFESIONAL------------------------------- //
    const $PREV_BUTTON = target.closest<HTMLDivElement>('.register-userProfessional__arrow-left[data-step_prev]');
    if ($PREV_BUTTON) {
        if (!btnPrev) return;
        const stepPrev: number = parseInt($PREV_BUTTON.dataset.step_prev || '0', 10);

        const $SECTION_STEP_CURRENT = getStepSection(stepPrev + 1);
        const $SECTION_STEP_PREV = getStepSection(stepPrev);

        if ($SECTION_STEP_CURRENT && $SECTION_STEP_PREV) {
            hide({ $el: $SECTION_STEP_CURRENT, cls: ['form-step--hidden'] });
            show({ $el: $SECTION_STEP_PREV, cls: ['form-step--hidden'] });

            // MOSTRAR EL SELECT DE CATEGORIA SI VUELVE AL PASO 3
            if (isCategoryStep(stepPrev, selectCategory)) {
                show({ $el: selectCategory, cls: ['form-step--hidden'] });
                btnPrev.dataset.step_prev = `${stepPrev - 2}`;
            }

            // SI EL STEP ANTERIOR ES 1 U 0, OCULTAR BOTON ATRAS
            if (stepPrev === 1 || stepPrev === 0) {
                hide({ $el: btnPrev, cls: ['register-userProfessional__arrow-left--hidden'] });
                hide({ $el: section, cls: ['form-step--hidden'] });
            }
        }
        // AJUSTE FINAL SI data-step_prev ES 4
        if (btnPrev.dataset.step_prev === '4') {
            btnPrev.dataset.step_prev = `${stepPrev - 1}`;
        }
        return;
    }
}
