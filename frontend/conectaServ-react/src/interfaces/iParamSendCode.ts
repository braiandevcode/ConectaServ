import type { EModalType } from '../types/enumModalTypes';

// INTERFACE PARA PARAMETRO DE FUNCION DE ENVIO DE CODIGO
export interface iParamSendCode {
  emailUser: string;
  showSuccess: (text: string, title: string) => void;
  showError: (text: string, title: string) => void;
  openModal: <T extends EModalType>(modalType: T) => void;
  updateCodeEmail: (newCode: string) => void;
  updatedIsSendingCode: (isSendingCode:boolean)=> void
}
