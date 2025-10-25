import { useEffect, useState, type ReactNode } from 'react';
import ModalContext from './GlobalModalContext';
import type { iMessageState } from '../../interfaces/iMessageState';
import type { TGlobalModal } from '../../types/typeGlobalModal';
import { EModalGlobalType } from '../../types/enumGlobalModalType';

// PROVIDER DE MODAL GLOBAL
const GlobalModalProvider = ({ children }: { children: ReactNode }) => {
  // ESTADO PARA MODAL
  const [isGlobalModalOpen, setIsGlobalModalOpen] = useState<boolean>(false);
  const [currentGlobalModal, setCurrentGlobalModal] = useState<EModalGlobalType | null>(null);
  const [messageState, setMessageState] = useState<iMessageState>({ type: null, text: null, title: null });

  // ----------------------EVENTOS--------------------------------------------------//
  // EVENTO PARA CERRAR MODAL
  const closeGlobalModal = (): void => {
    setIsGlobalModalOpen(false);
    setCurrentGlobalModal(null); // ==> NO HAY MODAL
  };

  // FUNCION PARA USAR EN CUALQUIER CONTEXTO DE APP
  const showSuccess = (title: string, text: string) => {
    setMessageState({ type: 'success', text, title });
  };

  // FUNCION PARA MENSAJE DE ERROR EN CUALQUIER CONTEXTO DE APP
  const showError = (title: string, text: string) => {
    setMessageState({ type: 'error', text, title });
  };

  // MOSTRAR MODAL GLOBAL
  const openGlobalModal = <T extends EModalGlobalType>(modalType: T): void => {
    setIsGlobalModalOpen(true);
    setCurrentGlobalModal(modalType); // ==> SETEAR EL NUEVO MODAL QUE SE MOSTRARA
  };

  // EFECTO PARA  MOSTRAR MODAL DE MESNAJE EN HOME QUE SON DE CONTEXTOS EXTERNOS
  useEffect(() => {
    // SI HAY UN MENSAJE DE SUCCESS NUEVO, ABRIR EL MODAL GLOBAL AUTOMÁTICAMENTE
    if (messageState.type === 'success' && !isGlobalModalOpen) {
      setIsGlobalModalOpen(true);
      setCurrentGlobalModal(EModalGlobalType.MODAL_SUCCESS);
    }
    // SI HAY UN MENSAJE DE ERROR NUEVO, ABRIR EL MODAL GLOBAL AUTOMÁTICAMENTE
    if (messageState.type === 'error' && !isGlobalModalOpen) {
      setIsGlobalModalOpen(true);
      setCurrentGlobalModal(EModalGlobalType.MODAL_ERROR);
    }
  }, [messageState]); // DEPENDENCIA LOCAL ==> SE INTENTO EVITAR PERO POR EL MOMENTO SE HIZO ASI

  const valueGlobalModalContext: TGlobalModal = {
    closeGlobalModal,
    openGlobalModal,
    setCurrentGlobalModal,
    setIsGlobalModalOpen,
    setMessageState,
    showError,
    showSuccess,
    currentGlobalModal,
    isGlobalModalOpen,
    messageState,
  };

  return <ModalContext.Provider value={valueGlobalModalContext}>{children}</ModalContext.Provider>;
};

export default GlobalModalProvider;
