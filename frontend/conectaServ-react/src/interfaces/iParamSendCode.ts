import type { EModalGlobalType } from '../types/enumGlobalModalType';
import type { EModalRegistersType } from '../types/enumModalRegistersTypes';

// INTERFACE PARA PARAMETRO DE FUNCION DE ENVIO DE CODIGO
export interface iParamSendCode {
  emailUser: string;
  showSuccess: (title: string, text: string) => void;
  showError: (title: string, text: string) => void;
  openGlobalModal: <T extends EModalGlobalType>(modalType: T) => void;
  openVerifyEmailModal: <T extends EModalRegistersType>(modalType: T) => void;
  updateCodeEmail: (newCode: string) => void;
  updatedIsSendingCode: (isSendingCode: boolean) => void;
  setLoading: (loading: boolean) => void;
  updatedIsSentCode: (isSentCode: boolean) => void;
}
