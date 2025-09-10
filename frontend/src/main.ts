import ButtonBaseDto from "./modules/buttons/dto/ButtonsBaseDto.js";
import { pathPages } from "./config/constant.js";
import home from "./scripts/home.js";
import register from "./scripts/register.js";
import services from "./scripts/services.js";
import { ButtonFactory } from "./patterns/factory/ButtonFactory.js";
import ModalBaseDto from "./modules/modal/dto/ModalBaseDto.js";
import { ModalFactory } from "./patterns/factory/ModalFactory.js";
import ModalBase from "./modules/modal/entities/ModalBase.js";
import ButtonBase from "./modules/buttons/entities/ButtonBase.js";

// --------------------ULTIMA VERSION BRAIAN-------------------//
/*
    POR EL MOMENTO LO EJECUTO ACA ==> DEBERIA CARGARSE EN EL home()
*/

const loadButtonRegister = async (): Promise<HTMLButtonElement> => {
  // BOTON DEL HOME
  const instanceBtnDto: ButtonBaseDto = new ButtonBaseDto({
    disabled: false,
    btnText: "Registrarse",
    type: "button",
    classesBtn: "color btnRegister c-flex c-flex-items-center gap-1/2",
    "aria-label": "Boton para registro",
    iconBtnClasses: "fas fa-arrow-right",
  });

  const instanceBtn:ButtonBase = ButtonFactory.createButton("custom", instanceBtnDto);
  // INSTANCIA DE MODAL
  const instanceModalDto: ModalBaseDto = new ModalBaseDto({
    title: "Regístrate en ConectaServ",
    classesModal: "c-flex c-flex-column c-flex-items-center c-flex-justify-center position-fixed modal modal--hide",
    classesContainerModal:"c-flex c-flex-items-center c-flex-justify-center position-fixed w-full modal-wrapper modal-wrapper--hide",
    container: document.body,
  });
  
  const instanceModalRole:ModalBase = (await ModalFactory.createModal("role", instanceModalDto)) as ModalBase;  
  // SUSCRIBO SU CLICK Y EJECUTO EL HANDLER
  instanceBtn.on("click", async () => {
    instanceModalRole.remove();
    await instanceModalRole.addAndShow(); //SE AGREGA AL DOM Y LUEGO DELAY
  });
  const btnEl: HTMLButtonElement = instanceBtn.getBtnElement();
  return btnEl;
};

document.addEventListener("DOMContentLoaded", async () => {
  const btnRegister: HTMLButtonElement = await loadButtonRegister(); //==> CREAR BOTON NI BIEN RECARGA

  const currentStep = JSON.parse(localStorage.getItem("currentStep") || "null"); // NULO SI NO EXISTE

  if (String(currentStep).trim() === "null") {
    localStorage.setItem("currentStep", "1");
  }

  const path: string = window.location.pathname;
  const { PATH_FORM_CLIENT, PATH_FORM_PROFESSIONAL, PATH_TERMS, PATH_PRIVACY } =
    pathPages;
  if (path === "/frontend/src/index.html" || path === "/") {
    const $NAV_LINK: HTMLElement | null = document.querySelector(".nav-links");
    if (!$NAV_LINK) return;
    $NAV_LINK.appendChild(btnRegister);
    home();
  }

  if (
    path === PATH_FORM_CLIENT ||
    path === PATH_FORM_PROFESSIONAL ||
    path === PATH_TERMS ||
    path === PATH_PRIVACY
  ) {
    register(); //REGISTRO
  } else {
    localStorage.removeItem("stepData"); //REMOVER SI SE NAVEGA A CUALQUIER OTRA PARTE QUE NO SEA LA DE LA CONDICION
  }

  if (path === "/frontend/src/pages/services.html") {
    home();
    // services();
  }
});
