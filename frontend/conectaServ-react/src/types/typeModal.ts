import type { Dispatch, SetStateAction } from "react";
import type { EModalType } from "./enumModalTypes";
import type { iMessageState } from "../interfaces/iMessageState";

// TIPO PARA PLANTILLA DE MODAL GENERAL
export type TModal = {
  closeModal: () => void; //==> TODOS LOS MODALES CIERRAN
  openModal: (modalType: EModalType) => void; //==> TODOS LOS MODALES ABREN
  setIsModalOpen: Dispatch<SetStateAction<boolean>>; // ==> TODOS LOS MODALES SETEARAN SU BANDERA
  setCurrentModal: Dispatch<SetStateAction<EModalType | null>>; // ==> TODOS LOS MODALES EXISTIRAN O NULL
  setMessageState: React.Dispatch<React.SetStateAction<iMessageState>>; // ==> TODOS LOS MODALES TENDRAN UN MENSAJE ESPECIFICO
  showError: (title: string, text: string) => void; // TODOS MOSTRARAN EL ERROR
  showSuccess: (title: string, text: string) => void; // TODOS MOSTRARAN EL EXITO
  messageState: iMessageState; //TODOS TENDRAN SU ESTADO DE MENAJE
  isModalOpen: boolean; //TODOS TENDRAN SU ESTADO DE SI ABRE O CIERRA
  currentModal: EModalType | null; // Y SOLO HABRA UN MODAL ACTIVO PERO EL RESTO NULL
};
