import ButtonBaseDto from './modules/buttons/dto/ButtonsBaseDto.js';
import {pathPages} from './config/constant.js';
import home from './scripts/home.js';
import register from './scripts/register.js';
import services from './scripts/services.js';
import {ButtonFactory} from './patterns/factory/ButtonFactory.js';
import ModalBaseDto from './modules/modal/dto/ModalBaseDto.js';
import {ModalFactory} from './patterns/factory/ModalFactory.js';
import ModalBase from './modules/modal/entities/ModalBase.js';
import ButtonBaseUI from './modules/buttons/ui/ButtonBaseUI.js';

/**
  FRACE DEL DIA: “Cuando hay más de una fuente de la verdad… la verdad deja de ser confiable.”
**/

// --------------------ULTIMA VERSION BRAIAN-------------------//
/*
    POR EL MOMENTO LO EJECUTO ACA ==> DEBERIA CARGARSE EN EL home()
*/
const loadButtonRegister = async (): Promise<HTMLButtonElement | null> => {
  try {
    // BOTON DEL HOME
    const instanceBtnDto: ButtonBaseDto = new ButtonBaseDto({
      disabled: false,
      btnText: 'Registrarse',
      type: 'button',
      classesBtn: 'color btnRegister c-flex c-flex-items-center gap-1/2',
      'aria-label': 'Boton para registro',
      iconBtnClasses: 'fas fa-arrow-right',
      eventName: 'click',
      handler: async () => {
        instanceModalRole.remove();
        await instanceModalRole.addAndShow(); //SE AGREGA AL DOM Y LUEGO DELAY
      },
      isLoading: false,
    });

    const instanceBtn: ButtonBaseUI = ButtonFactory.createButton('custom', instanceBtnDto);

    instanceBtn.on(); //ESCUCHAR EVENTO

    // INSTANCIA DTO CONFIGURACION DE MODAL
    const instanceModalDto: ModalBaseDto = new ModalBaseDto({
      title: 'Regístrate en ConectaServ',
      classesModal: 'c-flex c-flex-column c-flex-items-center c-flex-justify-center position-fixed modal modal--hide',
      classesContainerModal: 'c-flex c-flex-items-center c-flex-justify-center position-fixed w-full modal-wrapper modal-wrapper--hide',
      container: document.body,
    });

    // INSTANCIA DEL MODAL DE ROLES
    const instanceModalRole: ModalBase = (await ModalFactory.createModal('role', instanceModalDto)) as ModalBase;

    const btnEl: HTMLButtonElement = instanceBtn.getBtnElement();
    return btnEl;
  } catch (error) {
    console.error('Error al cargar el botón de registro:', error);
    return null;
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  const btnRegister: HTMLButtonElement | null = await loadButtonRegister(); //==> CREAR BOTON NI BIEN RECARGA
  if (!btnRegister) return; // ==> SALIR ANTES NO CONTINUAR

  const currentStep = JSON.parse(localStorage.getItem('currentStep') || 'null'); // NULO SI NO EXISTE

  if (String(currentStep).trim() === 'null') {
    localStorage.setItem('currentStep', '1');
  }

  const path: string = window.location.pathname;
  const {PATH_FORM_CLIENT, PATH_FORM_PROFESSIONAL, PATH_TERMS, PATH_PRIVACY} = pathPages;
  if (path === '/frontend/src/index.html' || path === '/frontend/src/') {
    const $NAV_LINK: HTMLElement | null = document.querySelector('.nav-links');
    if (!$NAV_LINK) return;
    $NAV_LINK.appendChild(btnRegister);
    home();
  }

  if (path === PATH_FORM_CLIENT || path === PATH_FORM_PROFESSIONAL || path === PATH_TERMS || path === PATH_PRIVACY) {
    register(); //REGISTRO
  } else {
    localStorage.removeItem('stepData'); //REMOVER SI SE NAVEGA A CUALQUIER OTRA PARTE QUE NO SEA LA DE LA CONDICION
  }

  if (path === '/frontend/src/pages/services.html') {
    home();
    services();
  }
});
