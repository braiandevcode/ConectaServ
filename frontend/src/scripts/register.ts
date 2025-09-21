// IMPORTACIONES
import FormBaseDto from '../modules/form/dto/FormBaseDto.js';
import { eventDragProfile } from '../events/eventDrag.js';
import { FormFactory } from '../patterns/factory/FormFactory.js';
import FormRegister from '../modules/form/controller/FormRegister.js';

// FUNCION DE REGISTRO DE PROFESIONALES
const register = async (): Promise<void | null> => {
  // DOCUMENT
  eventDragProfile();

  // CONFIGURACION DE FORMULARIO
  const configForm: FormBaseDto = new FormBaseDto({
    containerSelector: '.register-userProfessional__content',
    attributesForm: { id: 'register-professional', enctype: 'multipart/form-data' },
    classListForm: 'register-professional',
  });

  // FORMULARIO DE REGISTRO
  (await FormFactory.createForm('register', configForm)) as FormRegister;
};

export default register;
