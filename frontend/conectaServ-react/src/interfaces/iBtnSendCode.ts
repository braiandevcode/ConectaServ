import type { iBtns } from './iBtns';

// INTERFACE PARA BOTON DE ENVIAR CODIGO
export interface iBtnSendCode extends iBtns {
  handleSend: () => Promise<void> 
}
