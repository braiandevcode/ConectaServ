import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { configEmail } from '../config/configCodeEmail';
import generateRandomNumber from './generateRandomNumber';
import type { TVerifyCode } from '../types/typeVerifyCode';
import type { iParamSendCode } from '../interfaces/iParamSendCode';
import { templateParamsEmailjs } from '../config/templateParamsEmailjs';
import { DATA_EMAILJS } from '../config/configDataIdEmailjs';
import { EModalRegistersType } from '../types/enumModalRegistersTypes';
import { EModalGlobalType } from '../types/enumGlobalModalType';

// INICIALIZAR LIBRERIA
emailjs.init(configEmail.options); //==> PASO CONFIGURACION

// FUNCION PARA ENVIAR CODIGO
const sendCodeToUserEmail = async ({ emailUser, updateCodeEmail, showError, showSuccess, openGlobalModal, openVerifyEmailModal, updatedIsSentCode, updatedIsSendingCode, setLoading }: iParamSendCode): Promise<void> => {
  const generatedCode: number = generateRandomNumber(); //GENERAR NUMERO RANDOM

  updateCodeEmail(generatedCode.toString()); //ACTUALIZO EN STORAGE Y ESTADO INTERNO DE REACT

  //INVOCO FUNCION DE OBJETO DE CONFIGURACION PARA ENVIO
  const templateParams: TVerifyCode = templateParamsEmailjs({
    to_email: emailUser, // ==> CORREO DE DESTINO
    verification_code: generatedCode, //==> CODIGO GENERADO A LA PLANTILLA
  });

  const { SERVICE_ID, TEMPLATE_VERIFICATION_ID } = DATA_EMAILJS; //DESESTRUCTURAR

  // INTENTAR ENVIO
  try {
    setLoading(true); // ACTIVAR LOADER MIENTRAS SE ENVÍA AL BACKEND
    updatedIsSendingCode(true); //EL CODIGO ENVIADO AL USUARIO ESTA EN PROGRESO
    const response: EmailJSResponseStatus = await emailjs.send(SERVICE_ID, TEMPLATE_VERIFICATION_ID, templateParams);
    if (response.status === 200) {
      updatedIsSentCode(true); // ESTADO DE CODIGO ENVIADO A DESTINO
      showSuccess('¡Codigo enviado!', '¡Codigo de verificacion enviado con exito!, Ingrese el codigo enviado aquí.');
      openVerifyEmailModal(EModalRegistersType.MODAL_VERIFY);
    }
  } catch (err) {
    updatedIsSentCode(false); // EL CODIGO NO FUE ENVIADO
    let userMessage: string = 'Fallo al enviar el código de verificación. Por favor, revisa tu conexión o el correo ingresado.';
    let title: string = 'Ups algo fallo!';
    showError(title, userMessage);
    openGlobalModal(EModalGlobalType.MODAL_ERROR);
  } finally {
    updatedIsSendingCode(false); //EL ESTADO DE ENVIANDO EL CODIGO AL USUARIO TERMINO
    setLoading(false);
  }
};

export default sendCodeToUserEmail;
