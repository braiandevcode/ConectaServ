import { hide, show } from "../ui/auxiliars.js";
import { handleClickNextButton, handleClickPrevButton } from "../ui/handleClickButtonsRegister.js";
const D: Document = document;

// FUNCION DELEGADA PARA MANEJAR TODOS LOS EVENTOS DE CLICK DE LA PAGINA
// ESTA FUNCION CENTRALIZA LOS CLICK EVENTS DE CUALQUIER SECCION O COMPONENTE EN LA PAGINA (MODALES, BOTONES, NAVEGACION, FORMULARIOS, ETC.)
// DEBE USARSE PARA CONTROLAR DE FORMA GLOBAL TODAS LAS INTERACCIONES QUE INVOLUCREN EVENTOS DE CLICK, EVITANDO ASIGNACIONES AISLADAS
// AQUI SE DEFINEN LAS CONDICIONALES NECESARIAS SEGUN EL TARGET DEL EVENTO, PARA CADA CONTEXTO PARTICULAR

export const clickEvents = (): void => {
  // CONSTANTES PARA REFERENCIAR PAGINAS REGISTRO CLIENTE-PROFESIONAL
  const DOMAIN: string = 'http://localhost:5500/';
  const ROUTE_CLIENT: string = 'src/pages/register-client.html';
  const ROUTE_PROFESSIONAL: string = 'src/pages/register-pro.html';

  //CONSTANTES QUE APUNTAN A REFERENCIAS DEL DOM
  const $SELECT_CATEGORY: HTMLSelectElement | null = D.querySelector('[data-select="category"]');
  const $BTN_PREV: HTMLDivElement | null = D.querySelector('.register-userProfessional__arrow-left');
  const $MODAL_ROL: HTMLButtonElement | null = D.querySelector('.modal-role');
  const $SECTION_PROFESSION: HTMLDivElement | null = D.querySelector('[data-section="professional"]');

  D.addEventListener('click', (event: TouchEvent | MouseEvent): void => {
    const target: EventTarget | null = event.target;

    if (!(target instanceof HTMLElement)) return;

    // -----------------------EVENTO DE CLICK PARA SIGUIENTE PASO FORMULARIO REGISTRO PROFESIONAL--------------------------- //
    handleClickNextButton({ target, btnPrev: $BTN_PREV, section: $SECTION_PROFESSION, selectCategory: $SELECT_CATEGORY })

    // ---------------------------EVENTO PASO ANTERIOR FORMULARIO REGISTRO PROFESIONAL------------------------------- //
    handleClickPrevButton({ target, btnPrev: $BTN_PREV, section: $SECTION_PROFESSION, selectCategory: $SELECT_CATEGORY });

    // SI EL EVENTO LO ORIGINA EL ELEMENTO CON CLASE ".btnRegister"
    if (target.matches('.btnRegister')) {
      show({ $el: $MODAL_ROL, cls: ['modal-role--hidden'] })
      return;
    }

    // SI EL0 EVENTO LO ORIGINA EL ELEMENTO CON CLASE "modal-rol__close-btn"
    if (target.matches('.modal-role__close-btn')) {
      hide({ $el: $MODAL_ROL, cls: ['modal-role--hidden'] })
      return;
    }

    // SI EL EVENTO LO ORIGINA EL ELEMENTO CON data-role
    const dataRole: HTMLDivElement | null = target.closest('[data-role]');

    if (!dataRole) return; //SI NO HAY "data-role" SALIR

    // SI EL VALOR DEL DATA ES "client"
    if (dataRole.getAttribute('data-role') === 'client') {
      location.href = `${DOMAIN}${ROUTE_CLIENT}`;  //REFERENCIAR RUTA DE CLIENTE
    } else {
      location.href = `${DOMAIN}${ROUTE_PROFESSIONAL}`; // REFERENCIAR RUTA PROFESIONAL
    }

  });
};