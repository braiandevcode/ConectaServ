import { useState, type ReactNode } from 'react';
import ModalContext from './ModalContext';
import type { TModal } from '../../types/typeModal';
import type { EModalType } from '../../types/enumModalTypes';
import type { iMessageState } from '../../interfaces/iMessageState';

const ModalProvider = ({ children }: { children: ReactNode }) => {
  // ESTADO PARA MODAL ==> UTILIZANDO HERRAMIENTA DE MODAL DE REACT
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentModal, setCurrentModal] = useState<EModalType | null>(null);
  const [messageState, setMessageState] = useState<iMessageState>({ type: null, text: null, title: null });

  // ----------------------EVENTOS--------------------------------------------------//
  // EVENTO PARA CERRAR MODAL
  const closeModal = (): void => {
    setIsModalOpen(false);
    setCurrentModal(null); // ==> SETEAR EL NUEVO MODAL QUE SE OCULTARA
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
  const openModal = <T extends EModalType>(modalType: T): void => {
    setIsModalOpen(true);
    setCurrentModal(modalType); // ==> SETEAR EL NUEVO MODAL QUE SE MOSTRARA
  };

  const valueModalContext: TModal = {
    closeModal,
    openModal,
    setCurrentModal,
    setIsModalOpen,
    setMessageState,
    showError,
    showSuccess,
    isModalOpen,
    messageState,
    currentModal,
  };

  return <ModalContext.Provider value={valueModalContext}>{children}</ModalContext.Provider>;
};

export default ModalProvider;
