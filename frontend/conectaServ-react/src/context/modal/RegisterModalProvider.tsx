import { useState, type ReactNode } from "react";
import type { EModalRegistersType } from "../../types/enumModalRegistersTypes";
import type { TRegisterModal } from "../../types/typeRegisterModal";
import RegisterModalContext from "./RegisterModalContext";

const RegisterModalProvider = ({ children }: { children: ReactNode }) => {
  // ESTADO PARA MODAL 
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);
  const [currentRegisterModal, setCurrentRegisterModal] = useState<EModalRegistersType | null>(null);

  // ----------------------EVENTOS--------------------------------------------------//
  // EVENTO PARA CERRAR MODAL
  const closeRegisterModal = (): void => {
    setIsRegisterModalOpen(false);
    setCurrentRegisterModal(null); // ==> NO HAY MODAL
  };

  // MOSTRAR MODAL GLOBAL
  const openRegisterModal = <T extends EModalRegistersType>(modalType: T): void => {
    setIsRegisterModalOpen(true);
    setCurrentRegisterModal(modalType); // ==> SETEAR EL NUEVO MODAL QUE SE MOSTRARA
  };

  const valueRegisterModalContext: TRegisterModal = {
    currentRegisterModal,
    isRegisterModalOpen,
   closeRegisterModal,
   openRegisterModal,
   setIsRegisterModalOpen,
   setCurrentRegisterModal
  };

  return <RegisterModalContext.Provider value={valueRegisterModalContext}>{children}</RegisterModalContext.Provider>;
};

export default RegisterModalProvider;