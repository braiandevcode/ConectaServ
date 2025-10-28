import type { iBtns } from './iBtns';
import type { iFormStateValidationClient } from './iFormStateValidationClient';
import type { iFormStateValidationTask } from './iFormStateValidationTask';

// INTERFACE PARA BOTON DE ENVIAR CODIGO
export interface iBtnSendCode extends iBtns {
  formState: iFormStateValidationTask | iFormStateValidationClient;
  handleSend: () => Promise<void> 
}
