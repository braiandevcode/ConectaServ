import {Loader} from '../singleton/Loader.js';
import {TModalType} from '../../types/types.js';
import {FormModalController} from '../../modules/controllers/FormModalController.js';
import ModalBaseDto from '../../modules/modal/dto/ModalBaseDto.js';
import ModalMessage from '../../modules/modal/components/ModalMessage.js';
import ModalBaseUI from '../../modules/modal/ui/ModalBaseUI.js';
import ModalBase from '../../modules/modal/entities/ModalBase.js';
import VerifyEmailModal from '../../modules/modal/components/VerifyEmailModal.js';
import ModalRoleSelector from '../../modules/modal/components/ModalRoleSelector.js';

// FABRICA DE MODALES
export class ModalFactory {
  // CREAR MODAL
  static async createModal(type: TModalType, optionsModal: ModalBaseDto): Promise<ModalBase | FormModalController | void> {
    // SEGUN EL CASO DEL TIPO SE  INSTANCIA UNA CLASE DE MODAL
    switch (type) {
      case 'success':
        const modalBaseSuccesUI = new ModalBaseUI(optionsModal);
        return new ModalMessage(optionsModal, modalBaseSuccesUI).init();
      case 'error':
        const modalBaseErrorUI = new ModalBaseUI(optionsModal);
        return new ModalMessage(optionsModal, modalBaseErrorUI).init();
      case 'role':
        const modalBaseRoleUI = new ModalBaseUI(optionsModal);
        return new ModalRoleSelector(optionsModal, modalBaseRoleUI).init();
      case 'codeVerify':
        const modalBaseEmailVerifyUI = new ModalBaseUI(optionsModal);
        return new VerifyEmailModal(optionsModal, modalBaseEmailVerifyUI).init();
      case 'loader':
        const modalBaseLoaderUI = new ModalBaseUI(optionsModal);
        return Loader.getInstance(optionsModal, modalBaseLoaderUI);
      case 'warn':
        const modalBaseWarnUI = new ModalBaseUI(optionsModal);

        return new ModalMessage(optionsModal, modalBaseWarnUI).init();
      case 'info':
        const modalBaseInfoUI = new ModalBaseUI(optionsModal);

        return new ModalMessage(optionsModal, modalBaseInfoUI).init();
      default:
        throw new Error(`Modal type "${type}" no soportado`);
    }
  }
}
