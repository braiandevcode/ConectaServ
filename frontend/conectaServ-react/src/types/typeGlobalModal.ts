import type { Dispatch, SetStateAction } from 'react';
import type {} from './enumModalRegistersTypes';
import type { iMessageState } from '../interfaces/iMessageState';
import type { EModalGlobalType } from './enumGlobalModalType';

// TIPO PARA PLANTILLA DE MODAL GENERAL
export type TGlobalModal = {
  closeGlobalModal: () => void; //==> TODOS LOS MODALES CIERRAN
  openGlobalModal: (modalType: EModalGlobalType) => void; //==> TODOS LOS MODALES ABREN
  setIsGlobalModalOpen: Dispatch<SetStateAction<boolean>>; // ==> TODOS LOS MODALES SETEARAN SU BANDERA
  setCurrentGlobalModal: Dispatch<SetStateAction<EModalGlobalType | null>>; // ==> TODOS LOS MODALES EXISTIRAN O NULL
  setMessageState: React.Dispatch<React.SetStateAction<iMessageState>>; // ==> TODOS LOS MODALES TENDRAN UN MENSAJE ESPECIFICO
  showError: (title: string, text: string) => void; // TODOS MOSTRARAN EL ERROR
  showSuccess: (title: string, text: string) => void; // TODOS MOSTRARAN EL EXITO
  messageState: iMessageState; //TODOS TENDRAN SU ESTADO DE MENAJE
  isGlobalModalOpen: boolean; //TODOS TENDRAN SU ESTADO DE SI ABRE O CIERRA
  currentGlobalModal: EModalGlobalType | null; // Y SOLO HABRA UN MODAL ACTIVO PERO EL RESTO NULL
};
