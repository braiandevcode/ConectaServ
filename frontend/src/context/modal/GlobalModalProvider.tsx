import { useRef, useState, type ReactNode } from 'react';
import ModalContext from './GlobalModalContext';
import type { iMessageState } from '../../interfaces/iMessageState';
import type { TGlobalModal } from '../../types/typeGlobalModal';
import { EModalGlobalType } from '../../types/enumGlobalModalType';

// PROVIDER DE MODAL GLOBAL
const GlobalModalProvider = ({ children }: { children: ReactNode }) => {
  // ---------------------ESTADOS--------------------------------------//
  // ESTADO DE BANDERA PARA DETERMINAR SI UN MODAL ESTA ABIERTO
  const [isGlobalModalOpen, setIsGlobalModalOpen] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('') //ESTADO DE MENSAJES DE ERROR TEXTUALES
  // ESTADO PARA AGREGAR O QUITAR U MODAL
  const [currentGlobalModal, setCurrentGlobalModal] = useState<EModalGlobalType | null>(null);
  //ESTADO PARA MENSAJES EN MODALES
  const [messageState, setMessageState] = useState<iMessageState>({ type: null, text: null, title: null });

  //REF QUE DETERMINA LA EJECUCION DE UNA CALLBACK
  const onCloseCallbackRef = useRef<(() => Promise<void> | void) | null>(null);

   const [passwordLogin, setPasswordLogin] = useState<string>(''); //ESTADO DEL CAMPO DE CONTRASEÑA
  
  
  // ----------------------FUNCIONES--------------------------------------------//
  //FUNCION PARA CERRAR UN MODAL ==> ACEPTA UNA CALLBACK OPCIONAL PARA EJECUTAR UNA ACCION DESPUES
  const closeGlobalModal = async (): Promise<void> => {
    setIsGlobalModalOpen(false); // ==> CIERRA EL MODAL PRIMERO
    setCurrentGlobalModal(null); // ==> DESTRUYE EL MODAL DESPUES

    //EJECUTA LA ACCION CALLBACK SI SE PASA UNA CALLBACK
    // SI HAY CALLBACK ES DECIR, SI SE SETEO COMO LO HACE ANTES EL OPENGLOBALMODAL
    if (onCloseCallbackRef.current) {
      const cb = onCloseCallbackRef.current; //GUARDO 
      onCloseCallbackRef.current = null;
      await cb(); // EJECUTO
    }
  };

  // FUNCION PARA ABRIR UN MODAL Y SU ACCION DE CALLBACK OPCIONAL
  const openGlobalModal = <T extends EModalGlobalType>(modalType: T, cb?: () => Promise<void> | void): void => {
    setCurrentGlobalModal(modalType); // ==> CREAR EL MODAL PRIMERO
    setIsGlobalModalOpen(true); // ==> ABRIR LUEGO
    onCloseCallbackRef.current = cb || null
  };

  // FUNCION PARA USAR EN CUALQUIER CONTEXTO DE APP
  const showSuccess = (title: string, text: string, cb?: () => Promise<void> | void) => {
    setMessageState({ type: 'success', title, text });
    openGlobalModal(EModalGlobalType.MODAL_SUCCESS, cb);
  };

  // FUNCION PARA MENSAJE DE ERROR EN CUALQUIER CONTEXTO DE APP
  const showError = (title: string, text: string) => {
    setMessageState({ type: 'error', title, text });
  };

  const valueGlobalModalContext: TGlobalModal = {
    setErrorText,
    closeGlobalModal,
    openGlobalModal,
    setCurrentGlobalModal,
    setIsGlobalModalOpen,
    setMessageState,
    showError,
    showSuccess,
    setPasswordLogin,
    passwordLogin,
    onCloseCallbackRef,
    errorText,
    currentGlobalModal,
    isGlobalModalOpen,
    messageState,
  };

  return <ModalContext.Provider value={valueGlobalModalContext}>{children}</ModalContext.Provider>;
};

export default GlobalModalProvider;
