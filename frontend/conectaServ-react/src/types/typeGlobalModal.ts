import type { Dispatch, SetStateAction } from 'react';
import type {} from './enumModalRegistersTypes';
import type { iMessageState } from '../interfaces/iMessageState';
import type { EModalGlobalType } from './enumGlobalModalType';

// TIPO PARA PLANTILLA DE MODAL GENERAL
export type TGlobalModal = {
  closeGlobalModal: (cb?:() => void) => void; //==> TODOS LOS MODALES CIERRAN PERO LA ACCION PUEDE SER DIFERENTE
  openGlobalModal: (modalType: EModalGlobalType, callback?: () => void) => void; //==> TODOS LOS MODALES ABREN
  setIsGlobalModalOpen: Dispatch<SetStateAction<boolean>>; // ==> TODOS LOS MODALES SETEARAN SU BANDERA
  setCurrentGlobalModal: Dispatch<SetStateAction<EModalGlobalType | null>>; // ==> TODOS LOS MODALES EXISTIRAN O NULL
  setMessageState: Dispatch<SetStateAction<iMessageState>>; // ==> TODOS LOS MODALES TENDRAN UN MENSAJE ESPECIFICO
  showError: (title: string, text: string, callback?: () => void) => void; 
  showSuccess: (title: string, text: string, cb?:() => void) => void; // TODOS MOSTRARAN EL EXITO Y UNA ACCION DIFERENTE O NO
  setOnCloseCallback: Dispatch<SetStateAction<(() => void) | null>>; //==>  SETTER DE ESTADO PARA EJECUTA CALLBACK LUEGO DE CERRAR MODAL
  onCloseCallback: (() => void) | null, //VARIABLE DE ESTADO DE LA CALLBACK O NULO
  messageState: iMessageState; //TODOS TENDRAN SU ESTADO DE MENAJE
  isGlobalModalOpen: boolean; //TODOS TENDRAN SU ESTADO DE SI ABRE O CIERRA
  currentGlobalModal: EModalGlobalType | null; // Y SOLO HABRA UN MODAL ACTIVO PERO EL RESTO NULL
};
