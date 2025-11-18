import type { iBtns } from './iBtns';
// INTERFACE SOLO PARA BOTON CERRAR
export interface iBtnCloseModal extends iBtns {
  onCloseModal: () => void;
}
