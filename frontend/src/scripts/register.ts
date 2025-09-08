// IMPORTACIONES
import { eventDragProfile } from "../events/eventDrag.js";
import { FormFactory } from "../patterns/factory/FormFactory.js";
import FormBaseOptions from "../modules/dto/FormBaseOptions.js";
import FormRegister from "modules/form/register/FormRegister.js";

// FUNCION DE REGISTRO DE PROFESIONALES
const register = async (): Promise<void | null> => {
  // DOCUMENT
  const D: Document = document; //ABREVIAR NOMBRE DE DOCUMENT
  const $FORM_PROFESSIONAL = D.querySelector(`.register-professional`) as HTMLFormElement | null;
  const $FORM_CLIENT = D.querySelector(".register-client") as HTMLFormElement | null;

  // SCROLLEAR AL TOP AUTOMATICAMENTE
  window.scrollTo({
    behavior: "smooth",
    top: 0,
  });

  // OPERACION DE FUSION NULA
  const form = $FORM_CLIENT ?? $FORM_PROFESSIONAL; //SI EL VALOR DE LA IZQUIERDA ES NULO O INDEFINIDO USA EL VALOR DE LA DERECHA

  eventDragProfile();

  // CONFIGURACION DE FORMULARIO
  const configForm:FormBaseOptions = new FormBaseOptions({
    containerSelector:".register-userProfessional__content",
    attributesForm: { id:"register-professional", "enctype": "multipart/form-data" },
    classListForm: "register-professional"
  })

  // FORMULARIO DE REGISTRO
  await FormFactory.createForm("register", configForm) as FormRegister;
};

export default register;
