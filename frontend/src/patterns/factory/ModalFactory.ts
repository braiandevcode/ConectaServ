import { iOptionsBtnsModals } from "../../interfaces/interfaces.js";
import { Loader } from "../singleton/Loader.js";
import VerifyEmailModal from "../../modules/form/verifyCode/VerifyEmailModal.js";
import { TModalType } from "../../types/types.js";
import { FormModalController } from "../../modules/controllers/FormModalController.js";
import ModalMessage from "../../modules/components/ModalMessage.js";
import ModalBase from "../../modules/entities/ModalBase.js";
import { ModalBaseUI } from "../../modules/modal/ui/ModalBaseUI.js";
import ModalBaseOptions from "../../modules/dto/ModalBaseOptions.js";

// FABRICA DE MODALES
export class ModalFactory {
  // CREAR MODAL
  static async createModal(type: TModalType,  optionsModal: ModalBaseOptions, modalUI:ModalBaseUI): Promise<ModalBase | FormModalController | void> {
    // SEGUN EL CASO DEL TIPO SE  INSTANCIA UNA CLASE DE MODAL
    switch (type) {
      case "success":
        return new ModalMessage(optionsModal, modalUI).init();
      case "error": 
        return new ModalMessage(optionsModal, modalUI).init();
      case "codeVerify":
        return new VerifyEmailModal(optionsModal, modalUI).init();
      case "loader":
        return Loader.getInstance(optionsModal, modalUI);
      case "warn":
        return new ModalMessage(optionsModal, modalUI).init();
      case "info":
        return new ModalMessage(optionsModal, modalUI).init();
      default:
        throw new Error(`Modal type "${type}" no soportado`);
    }
  }

  //METODO AUXILIAR DE CONFIRMACION DEL USUARIO DEVUELVE PROMESA
  static async confirm( optionsModal: ModalBaseOptions, modalUI:ModalBaseUI  & { confirmButton?: Partial<iOptionsBtnsModals>; cancelButton?: Partial<iOptionsBtnsModals> }): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      const modal = await ModalFactory.createModal("info", optionsModal, modalUI) as ModalBase;
      await modal.addAndShow();
    });
  }

  // SOLO AUXILIARES PARA MENSAJES REPETIDOS DE ERROR
  static async error(optionsModal:ModalBaseOptions, modalUI:ModalBaseUI) {
    return await ModalFactory.createModal("error", optionsModal, modalUI);
  }

  // SOLO AUXILIARES PARA MENSAJES REPETIDOS DE SATISFACTORIO
  static async success(optionsModal:ModalBaseOptions, modalUI:ModalBaseUI) {
    return await ModalFactory.createModal("success", optionsModal, modalUI);
  }
}




// por las dudas de deja 
// CONFIRM
// {
//         ...options,
//         buttons: [
//           {
//             text: "Confirmar",
//             ...options.confirmButton,
//             onClick: async () => {
//               await modal.hideAndRemove();
//               resolve(true);
//             },
//           },
//           {
//             text: "Cancelar",
//             ...options.cancelButton,
//             onClick: async () => {
//               await modal.hideAndRemove();
//               resolve(false);
//             },
//           },
//         ],
//       }



// ERROR:
// {
//       iconClass: "fa-solid fa-triangle-exclamation",
//       classesContainerModal: "modal-wrapper--hide position-fixed c-flex c-flex-items-center c-flex-justify-center",
//       classesModal: "modal--hide c-flex c-flex-column c-flex-items-center c-flex-justify-center",
//       ...options,
//     }


// SEUCCESS
// {
//       iconClass: "fas fa-check-circle",
//       classesContainerModal: "modal-wrapper--hide position-fixed c-flex c-flex-items-center c-flex-justify-center",
//       classesModal: "modal--hide c-flex c-flex-column c-flex-items-center c-flex-justify-center",
//       ...options,
//     }