import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { configEmail } from '../config/configCodeEmail';
import generateRandomNumber from './generateRandomNumber';
import type { TVerifyCode } from '../types/typeVerifyCode';
import type { iParamSendCode } from '../interfaces/iParamSendCode';
import { templateParamsEmailjs } from '../config/templateParamsEmailjs';
import { DATA_EMAILJS } from '../config/configDataIdEmailjs';
import { EModalType } from '../types/enumModalTypes';

// INICIALIZAR LIBRERIA
emailjs.init(configEmail.options); //==> PASO CONFIGURACION

// FUNCION PARA ENVIAR CODIGO
const sendCodeToUser = async ({ emailUser, updateCodeEmail, showError, showSuccess, openModal, updatedIsSendingCode, setLoading }: iParamSendCode): Promise<void> => {
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
    const response: EmailJSResponseStatus = await emailjs.send(SERVICE_ID, TEMPLATE_VERIFICATION_ID, templateParams);
    if (response.status === 200) {
      showSuccess('¡Codigo enviado!','¡Codigo de verificacion enviado con exito!, Ingrese el codigo enviado aquí.');
      openModal(EModalType.MODAL_VERIFY);
    }
  } catch (err) {
    updatedIsSendingCode(false); //ACTUALIZAR A FALSE
    let userMessage: string = 'Fallo al enviar el código de verificación. Por favor, revisa tu conexión o el correo ingresado.';
    let title: string = 'Ups algo fallo!';
    showError(title,userMessage);
    openModal(EModalType.MODAL_ERROR);
  }finally{
    setLoading(false);
  }
};

export default sendCodeToUser;
