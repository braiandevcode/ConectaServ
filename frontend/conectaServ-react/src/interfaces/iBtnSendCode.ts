import type { iEmailUser } from './iEmailUser';
import type { iFormStateValidationClient } from './iFormStateValidationClient';
import type { iFormStateValidationPro } from './iFormStateValidationPro';

// INTERFACE PARA BOTON DE ENVIAR CODIGO
export interface iBtnSendCode extends iEmailUser {
  sendCode: ({ emailUser }: iEmailUser) => Promise<void>;
  text: string;
  formState: iFormStateValidationPro | iFormStateValidationClient
}
