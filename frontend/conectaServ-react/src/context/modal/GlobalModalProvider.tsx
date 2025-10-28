import { useState, type ReactNode } from 'react';
import ModalContext from './GlobalModalContext';
import type { iMessageState } from '../../interfaces/iMessageState';
import type { TGlobalModal } from '../../types/typeGlobalModal';
import { EModalGlobalType } from '../../types/enumGlobalModalType';

// PROVIDER DE MODAL GLOBAL
const GlobalModalProvider = ({ children }: { children: ReactNode }) => {
  // ESTADO DE BANDERA PARA DETERMINAR SI UN MODAL ESTA ABIERTO
  const [isGlobalModalOpen, setIsGlobalModalOpen] = useState<boolean>(false);

  // ESTADO PARA AGREGAR O QUITAR U MODAL
  const [currentGlobalModal, setCurrentGlobalModal] = useState<EModalGlobalType | null>(null);
  //ESTADO PARA MENSAJES EN MODALES
  const [messageState, setMessageState] = useState<iMessageState>({ type: null, text: null, title: null });

  //ESTADO QUE DETERMINA LA EJECUCION DE UNA CALLBACK 
  const [onCloseCallback, setOnCloseCallback] = useState<(() => void) | null>(null); 
  
  
  // ----------------------EVENTOS--------------------------------------------------//
  //FUNCION PARA CERRAR UN MODAL ==> ACEPTA UNA CALLBACK OPCIONAL PARA EJECUTAR UNA ACCION DESPUES
  const closeGlobalModal = (): void => {
    setIsGlobalModalOpen(false); // ==> CIERRA EL MODAL PRIMERO
    setCurrentGlobalModal(null); // ==> DESTRUYE EL MODAL DESPUES

    //EJECUTA LA ACCION CALLBACK SI SE PASA UNA CALLBACK
    // SI HAY CALLBACK
    if (onCloseCallback) {
      onCloseCallback(); //EJECUTAR
      setOnCloseCallback(null); // ==> LIMPIAR
    }
  };

  // FUNCION PARA ABRIR UN MODAL Y SU ACCION DE CALLBACK OPCIONAL
  const openGlobalModal = <T extends EModalGlobalType>(modalType: T, callback?: () => void): void => {
    // AGREGAMOS EL ARGUMENTO  ==> 'callback'
    setCurrentGlobalModal(modalType); // ==> CREAR EL MODAL PRIMERO
    setIsGlobalModalOpen(true); // ==> ABRIR LUEGO

    // SI HAY CALLBACK SETEAR EL CALLBACK EN EL ESTADO
    if (callback) {
      // USAMOS SETTER DE FUNCION PARA EVITAR PROBLEMAS DE CIERRE 
      setOnCloseCallback(() => callback);
    } else {
      setOnCloseCallback(null); //SINO LIMPIAR
    }
  };

  // FUNCION PARA USAR EN CUALQUIER CONTEXTO DE APP
  const showSuccess = (title: string, text: string, callback?: () => void) => {
    setMessageState({ type: 'success', text, title });
    openGlobalModal(EModalGlobalType.MODAL_SUCCESS, callback)
  };

  // FUNCION PARA MENSAJE DE ERROR EN CUALQUIER CONTEXTO DE APP
  const showError = (title: string, text: string) => {
    setMessageState({ type: 'error', text, title });
  };

  const valueGlobalModalContext: TGlobalModal = {
    setOnCloseCallback,
    closeGlobalModal,
    openGlobalModal,
    setCurrentGlobalModal,
    setIsGlobalModalOpen,
    setMessageState,
    showError,
    showSuccess,
    onCloseCallback,
    currentGlobalModal,
    isGlobalModalOpen,
    messageState,
  };

  return <ModalContext.Provider value={valueGlobalModalContext}>{children}</ModalContext.Provider>;
};

export default GlobalModalProvider;
