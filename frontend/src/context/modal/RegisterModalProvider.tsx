import { useRef, useState, type ReactNode } from 'react';
import type { EModalRegistersType } from '../../types/enumModalRegistersTypes';
import type { TRegisterModal } from '../../types/typeRegisterModal';
import RegisterModalContext from './RegisterModalContext';

const RegisterModalProvider = ({ children }: { children: ReactNode }) => {
  // ESTADO PARA MODAL
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);
  const [currentRegisterModal, setCurrentRegisterModal] = useState<EModalRegistersType | null>(null);

  //REF QUE DETERMINA LA EJECUCION DE UNA CALLBACK
  const onCloseCallbackRef = useRef<(() => Promise<void> | void) | null>(null);
  // ----------------------EVENTOS--------------------------------------------------//
  // EVENTO PARA CERRAR MODAL
  const closeRegisterModal = async (): Promise<void> => {
    setIsRegisterModalOpen(false); //CERRAR MODAL
    setCurrentRegisterModal(null); // ==> NO HAY MODAL

    // SI SE LE PASO CALLBACK
    if(onCloseCallbackRef.current){
      const cb = onCloseCallbackRef.current;
      onCloseCallbackRef.current = null; //DESTRUYO INMEDIATAMENTE
      await cb() // EJECUTAR DESPUES DEL CIERRE
    }
  };

  // MOSTRAR MODAL GLOBAL
  const openRegisterModal = <T extends EModalRegistersType>(modalType: T, cb?: () => Promise<void> | void):void => {
    setCurrentRegisterModal(modalType); // ==> SETEAR EL NUEVO MODAL QUE SE MOSTRARA
    setIsRegisterModalOpen(true); 
    onCloseCallbackRef.current = cb ?? null; // GUARDAR LA CB O NULL
  };

  const valueRegisterModalContext: TRegisterModal = {
    currentRegisterModal,
    isRegisterModalOpen,
    closeRegisterModal,
    openRegisterModal,
    setIsRegisterModalOpen,
    setCurrentRegisterModal,
  };

  return <RegisterModalContext.Provider value={valueRegisterModalContext}>{children}</RegisterModalContext.Provider>;
};

export default RegisterModalProvider;
