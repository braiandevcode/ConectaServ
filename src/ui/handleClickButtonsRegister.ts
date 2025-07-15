import isCategory from "../utils/validators/isCategory.js";
import { formState, globalStateValidationStep } from "../config/constant.js";
import { getStepSection, hide, show } from "./auxiliars.js";
import { ECategoryKey, EKeyDataByStep } from "../types/enums.js";
import saveDataStep from "../utils/saveDataStep.js";
import { TElementStep, TFormElement } from "../types/types.js";
import clearElementChild from "../dom/clearElementChild.js";

// -----------------------FUNCIÓN MANEJADORA PARA EVENTO DE CLICK EN BOTÓN SIGUIENTE REGISTRO PROFESIONAL--------------------------- //
export const handleClickNextButton = ({ target, btnPrev }: { target: HTMLElement, btnPrev: HTMLDivElement | null }): void | boolean | null => {
  const $NEXT_BUTTON: HTMLButtonElement | null = target.closest('.container-btn__next[data-step]'); //REFERENCIAR AL ANCESTRO MAS CERCANO DEL ELEMENTO TARGET

  if (!$NEXT_BUTTON) return null; // SI NO EXISTE BOTON SIGUIENTE RETORNA NULO
  if (!btnPrev) return null; // SI NO EXISTE BOTON PREVIO RETORNA NULO

  // SUBIR SUAVEMENTE AL TOP EN CADA CLICK SI NO ES DE TIPO SUBMIT
  if ($NEXT_BUTTON.type !== 'submit') {
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    });
  }

  //GUARDA EN MEMORIA EL VALOR DEL data-step PARSEADO A TIPO NUMERO, SI NO HAY VALOR ES 0
  const step: number = parseInt($NEXT_BUTTON.dataset.step || '0', 10);

  const $SECTION_STEP_CURRENT: TElementStep = getStepSection(step); //REFERENCIAR DE FORMA DINAMICA EL PASO ACTUAL SEGUN EL STEP
  const $SECTION_STEP_NEXT: TElementStep = getStepSection(step + 1); //REFERENCIAR DE FORMA DINAMICA EL PASO SIGUEINTE SEGUN EL STEP SUMANDOLE 1
  const $SECTION_CURRENT_CHECKBOXES = $SECTION_STEP_CURRENT?.nextElementSibling as TElementStep; //REFERENCIAR DE FORMA ESTATICA SECCION DE CHECKBOXES

  if (!$SECTION_STEP_CURRENT || !$SECTION_STEP_NEXT) return null; // SI NI EL ACTUAL NI EL SIGUIENTE EXISTE RETORNAR NULO

  // VALIDAR SI EL ESTADO NO ES VALIDO
  if (!formState.stepStatus[step]) {
    $NEXT_BUTTON.setAttribute('disabled', 'true'); //DESHABILITAR BOTON SIGUIENTE
    return false; //RETORNAR FALSO
  }

  // ANTES DE AVANZAR GUARDAMOS LOS DATOS DEL PASO ACTUAL
  // const inputs: TFormElement[] = Array.from($SECTION_STEP_CURRENT.querySelectorAll("input, textarea, select"));

  // // DETECTAR SI LA CATEGORIA SELECCIONADA ES 'reparacion-mantenimiento'
  // const isRepairCategory: boolean = isCategory({ category: ECategoryKey.REPAIR, key: EKeyDataByStep.ONE });

  // console.log(isRepairCategory);

  // // DECIDIR QUE PASO GUARDAR EN EL localStorage SEGUN LA CATEGORIA Y EL PASO 
  // switch (step) {
  //   case 3: {
  //     console.log('entre aqui es 3');

  //     if (isRepairCategory) {
  //       console.log('Y entre aqui es reparacion y mantenimiento');

  //       // GUARDAR PASO 3 COMO PRESUPUESTO
  //       saveDataStep({ step, elements: inputs });
  //     } else {
  //       console.log('Y entre aqui es NO reparacion y mantenimiento');

  //       //GUARDAR PASO 3 COMO BASICO (ya que no es reparación)
  //       saveDataStep({ step, elements: inputs });
  //     }
  //     break;
  //   }
  //   case 4: {
  //     console.log('entre aqui es 4');
  //     if (isRepairCategory) {
  //       console.log('Y entre aqui es reparacion y mantenimiento');
  //       //GUARDAR PASO 4 COMO BASICO CUANDO HAY PRESUPUESTO
  //       saveDataStep({ step, elements: inputs });
  //     }
  //     break;
  //   }
  //   default: {
  //     console.log('NORMALES');
  //     //GUARDAR OTROS PASOS NORMALES
  //     saveDataStep({ step, elements: inputs });
  //     break;
  //   }
  // }

  show({ $el: btnPrev, cls: ['register-userProfessional__arrow-left--hidden'] }); //MOSTRAR EL BOTON PREVIO

  btnPrev.dataset.step_prev = `${step}`; // ACTUALIZAR EL STEP_PREV PARA BOTON ATRAS

  // SI EL BOTON TIENE "step_prev" CON VALOR 1
  if (step === Number(EKeyDataByStep.ONE)) {
    hide({ $el: $SECTION_STEP_CURRENT, cls: ['form-step--hidden'] }); //ESCONDER SECCION ACTUAL
    hide({ $el: $SECTION_CURRENT_CHECKBOXES, cls: ['form-step--hidden'] }); //ESCONDER SECCION ACTUAL

    // REFERENCIAR AL ELEMENTO TEXTAREA
    const $TEXT_AREA: HTMLTextAreaElement | null = $SECTION_STEP_NEXT.querySelector('textarea[name="descriptionUser"]');
    if (!$TEXT_AREA) return null; //SI EL TEXTAREA ES NULO
    $TEXT_AREA.value = $TEXT_AREA.value; //GUARDAR SU VALOR POR DEFECTO VACIO
    $TEXT_AREA.dispatchEvent(new Event('input', { bubbles: true })); //DISPARAR EVENTO INPUT SIN INTERACCION
  };

  // SI EL BOTON TIENE EL "step" CON EL VALOR 2 Y SI EN LA SECCION QUE SIGUE EL BOTON ES DE TIPO "button"
  if (step === Number(EKeyDataByStep.TWO) && $SECTION_STEP_NEXT.querySelector('button')?.type === 'button') {
    const $BUDGE_SELECTED_NO = $SECTION_STEP_NEXT.querySelector('[name="budgeSelected"][value="no"]') as HTMLInputElement; //CAMPO DE RADIO 
    const $BUDGE_AMOUNT = $SECTION_STEP_NEXT.querySelector('[name="amountBudge"]') as HTMLInputElement; //CAMPO DE MONTO
    // SI EXISTE EL ELEMENTO REFERENCIADO
    if ($BUDGE_SELECTED_NO && $BUDGE_AMOUNT.value.trim() === '') {
      $BUDGE_SELECTED_NO.checked = true; //SI ES NO PASARLO POR DEFECTO A TRUE
      const event: Event = new Event('change', { bubbles: true }); //INSTANCIAR UN NUEVO OBJETO DE EVENTO
      $BUDGE_SELECTED_NO.dispatchEvent(event);  //DISPARAR MANUALMENTE EVENTO CHANGE AL ELEMENTO
    }
  }

  show({ $el: $SECTION_STEP_NEXT, cls: ['form-step--hidden'] });
  hide({ $el: $SECTION_STEP_CURRENT, cls: ['form-step--hidden'] });
  localStorage.setItem('currentStep', `${step + 1}`);
};


// -----------------------FUNCIÓN MANEJADORA PARA EVENTO DE CLICK EN BOTON  ATRAS REGISTRO PROFESIONAL--------------------------- //
export const handleClickPrevButton = ({ target, btnPrev }: { target: HTMLElement, section: HTMLDivElement | null, btnPrev: HTMLDivElement | null, selectCategory: HTMLSelectElement | null }): void | null | boolean => {
  // ---------------------------EVENTO PASO ANTERIOR FORMULARIO REGISTRO PROFESIONAL------------------------------- //
  const $PREV_BUTTON = target.closest<HTMLDivElement>('.register-userProfessional__arrow-left[data-step_prev]');
  // const currentStep = JSON.parse(localStorage.getItem('currentStep') || 'null');

  // SI NO EXISTE BOTON PREVIO
  if (!$PREV_BUTTON) return null;
  const stepPrev: number = parseInt($PREV_BUTTON.dataset.step_prev || '0', 10);
  console.log('paso previo: ', stepPrev);


  // const $NEXT_BUTTON: HTMLButtonElement | null = document.querySelector(`.container-btn__next[data-step="${stepPrev}"]`); //REFERENCIAR DESDE EL document

  // show({ $el: $NEXT_BUTTON, cls: ['form-step--hidden'] }); //ASEGURAR MOSTRAR BOTON DE SIGUIENTE POR CADA CLICK HACIA ATRAS SIN IMPORTAR QUE PASO SEA

  const $SECTION_STEP_CURRENT = getStepSection(stepPrev + 1); //REFERNCIAR SECCION ACTUAL
  const $SECTION_STEP_PREV = getStepSection(stepPrev); //REFERENCIAR SECCION ANTERIOR
  const $SECTION_CURRENT_CHECKBOXES = $SECTION_STEP_PREV?.nextElementSibling as TElementStep; //REFERENCIAR DE FORMA ESTATICA SECCION DE CHECKBOXES

  if (!$SECTION_STEP_PREV || !$SECTION_STEP_CURRENT) return null;

  console.log($SECTION_STEP_PREV, $SECTION_STEP_CURRENT);

  // hide({ $el: $SECTION_STEP_CURRENT, cls: ['form-step--hidden'] }); //ESCONDER


  // SI EL BOTON TIENE "step_prev" CON VALOR 1 Y ES "reparacion-mantenimiento"
  if (stepPrev === Number(EKeyDataByStep.ONE)) {
    // show({ $el: $SECTION_STEP_PREV, cls: ['form-step--hidden'] }); //MOSTRAR SECCION DE ESE PASO PREVIO(en esta seccion encuentra al select)
    show({ $el: $SECTION_CURRENT_CHECKBOXES, cls: ['form-step--hidden'] }); //MOSTRAR LOS GRUPOS DE CHECKBOXES(luego refernciar a su hermano)

    const $BODY_PROFILE: HTMLDivElement | null = document.querySelector('.form-professional-groupProfile__body');
    const $CONTAINER_PREVIEW_PROFILE = document.querySelector('.form-professional-groupProfile__previewImage') as HTMLDivElement;
    const $CONTAINER_PREVIEW_EXPERIENCES = document.querySelector('.form-professional-groupProfile__previewMultipleImages ') as HTMLDivElement;

    // RECORRER INPUTS DEL CONTENEDOR DE SECCION PERFIL
    $BODY_PROFILE?.querySelectorAll('input').forEach(el => {
      // SI ES UNA INSTANCIA DE HTMLInputElement
      el.value = '';
    });

    // ELIMINAR NODOS 
    clearElementChild({ elements: [$CONTAINER_PREVIEW_PROFILE, $CONTAINER_PREVIEW_EXPERIENCES] });

    const existingData = JSON.parse(localStorage.getItem("stepData") || "{}"); //PARSEAR LOCALSTORAGE

    // ELIMINAR LA CLAVE 4 SI EXISTE
    delete existingData["3"];
    //ELIMINAR LA CLAVE 5 SI EXISTE
    delete existingData["4"];

    // GUARDAR NUEVAMENTE EN EL LOCALSTORAGE SIN LAS CLAVES
    localStorage.setItem("stepData", JSON.stringify(existingData));
  }

  // SI EL STEP ANTERIOR ES 1 o 0, OCULTAR BOTON ATRAS
  if (stepPrev === Number(EKeyDataByStep.ONE) || stepPrev === Number(EKeyDataByStep.ZERO)) {
    hide({ $el: btnPrev, cls: ['register-userProfessional__arrow-left--hidden'] }); // OCULTAR BOTON ATRAS
  }

  show({ $el: $SECTION_STEP_PREV, cls: ['form-step--hidden'] }); // MOSTRAR
  hide({ $el: $SECTION_STEP_CURRENT, cls: ['form-step--hidden'] }); //OCULTANDO SECCION ACTUAL

  localStorage.setItem('currentStep', `${$PREV_BUTTON.dataset.step_prev}`);
  $PREV_BUTTON.dataset.step_prev = `${stepPrev - 1}`;  //POR CADA EVENTO EL VALOR SE RESTARA.
  return;
}
