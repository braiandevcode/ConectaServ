import { hide, show } from "../ui/auxiliars.js";
import { formState } from "../config/constant.js";
const D: Document = document;

// FUNCION PARA OBTENER UNA SECCION DEL FORMULARIO SEGUN EL PASO
const getStepSection = (step: number): HTMLDivElement | null => D.querySelector(`.form-step[data-step="${step}"]`);

// FUNCION PARA VERIFICAR SI ESTA EN EL PASO DE CATEGORIA 3
const isCategoryStep = (step: number, select: HTMLSelectElement | null): boolean => step === 3 && select !== null;

// FUNCION PARA EVENTOS DE CLICKS
export const clickEvents = (): void => {
  const $SELECT_CATEGORY: HTMLSelectElement | null = D.querySelector('[data-select="category"]');
  const $BTN_PREV: HTMLDivElement | null = D.querySelector('.register-userProfessional__arrow-left');

  if (!$BTN_PREV) return;

  D.addEventListener('click', (event: TouchEvent | MouseEvent): void => {
     const target: EventTarget | null = event.target;
    if (!(target instanceof HTMLElement)) return;

    // -----------------------EVENTO DE CLICK PARA SIGUIENTE PASO FORMULARIO REGISTRO PROFESIONAL--------------------------- //
    const $NEXT_BUTTON: HTMLButtonElement | null = target.closest('.container-btn__next[data-step]');
    if ($NEXT_BUTTON) {
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
      if (isCategoryStep(step, $SELECT_CATEGORY)) {
        hide({ $el: $SELECT_CATEGORY, cls:['form-step--hidden']});
      }

      // SI EL CLICK ES EN BOTON CON SU DATASET EN 1 SE MUESTRA EL BOTON ATRAS
      if (step === 1) {
        show({ $el:$BTN_PREV, cls: ['register-userProfessional__arrow-left--hidden'] });
      }

      $BTN_PREV.dataset.step_prev = `${dataPrev}`; // ACTUALIZAR EL STEP_PREV PARA BOTON ATRAS
      hide({ $el: $SECTION_STEP_CURRENT, cls:['form-step--hidden']});
      show({ $el:$SECTION_STEP_NEXT, cls:['form-step--hidden'] });
      return;
    }

    // ---------------------------EVENTO PASO ANTERIOR FORMULARIO REGISTRO PROFESIONAL------------------------------- //
    const $PREV_BUTTON = target.closest<HTMLDivElement>('.register-userProfessional__arrow-left[data-step_prev]');
    if ($PREV_BUTTON) {
      const stepPrev: number = parseInt($PREV_BUTTON.dataset.step_prev || '0', 10);

      const $SECTION_STEP_CURRENT = getStepSection(stepPrev + 1);
      const $SECTION_STEP_PREV = getStepSection(stepPrev);

      if ($SECTION_STEP_CURRENT && $SECTION_STEP_PREV) {
        hide({ $el:$SECTION_STEP_CURRENT, cls:['form-step--hidden']});
        show({ $el:$SECTION_STEP_PREV, cls:['form-step--hidden']});

        // MOSTRAR EL SELECT DE CATEGORIA SI VUELVE AL PASO 3
        if (isCategoryStep(stepPrev, $SELECT_CATEGORY)) {
          show({ $el:$SELECT_CATEGORY, cls:['form-step--hidden']});
          $BTN_PREV.dataset.step_prev = `${stepPrev - 2}`;
        }

        // SI EL STEP ANTERIOR ES 1 U 0, OCULTAR BOTON ATRAS
        if (stepPrev === 1 || stepPrev === 0) {
          hide({ $el:$BTN_PREV, cls:['register-userProfessional__arrow-left--hidden'] });
        }
      }
      // AJUSTE FINAL SI data-step_prev ES 4
      if ($BTN_PREV.dataset.step_prev === '4') {
        $BTN_PREV.dataset.step_prev = `${stepPrev - 1}`;
      }
      return;
    }

  });
};