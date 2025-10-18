import { useEffect, useState, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router';
import MainContext from './MainContext';
import { ENamesOfKeyLocalStorage, EPathPage } from '../../types/enums';
import { clearPersistence } from '../../utils/storageUtils';
import type { TMain } from '../../types/typeMain';
import { EModalType } from '../../types/enumModalTypes';

// PROVEEMOS LOGICA Y ESTADOS AL CONTEXTO PRINCIPAL
const MainProvider = ({ children }: { children: ReactNode }) => {
  const stored = localStorage.getItem('role');
  // -------------------HOOKS DE REACT-------------------------//
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // ESTADO PARA SABER SI EL USUARIO ES CLIENTE (TRUE), PRO (FALSE), O NULO SI NO HAY ROL
  const [client, setClient] = useState<boolean | null>(null);

  // ESTADO PARA MODAL ==> UTILIZANDO HERRAMIENTA DE MODALES DE REACT
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentModal, setCurrentModal] = useState<EModalType | null>(null);

  // ----------------------useEffects----------------------------------//
  useEffect(() => {
    // FUNCION INTERNA ASiNCRONA PARA LIMPIAR DATOS
    const runClear = async () => {
      try {
        await clearPersistence(); // LIMPIA INDEXEDDB + STORAGE
      } catch (error) {
        console.error('ERROR AL ELIMINAR DATOS DEL STORAGE E INDEXEDDB:', error);
      }
    };

    // SI EL ROL GUARDADO ES CLIENTE Y ESTAMOS EN LA RUTA CORRECTA
    if (pathname === EPathPage.PATH_FORM_CLIENT && stored === 'client') {
      setClient(true);
    } else if (pathname === EPathPage.PATH_FORM_PROFESSIONAL && stored === 'pro') {
      // SI EL ROL GUARDADO ES PRO Y ESTAMOS EN LA RUTA CORRECTA
      setClient(false);
    } else {
      // SI NO HAY ROL VALIDO O NO ESTAMOS EN UNA RUTA DE REGISTRO
      localStorage.removeItem('role');
      localStorage.removeItem(ENamesOfKeyLocalStorage.CLIENT_DATA);
      // LIMPIAR DATOS ASÍNCRONAMENTE
      runClear();
      // REDIRECCIONAR AL HOME
      navigate('/', { replace: true });
    }

    //ASEGURAR QUE EL MODAL SE CIERRE AL CAMBIAR DE RUTA
    setIsModalOpen(false);
  }, [pathname, navigate]); // DEPENDE SOLO DE PATH Y NAVIGATE

  // ------------------EVENTOS--------------------------------------------------//

  // EVENTO PARA CERRAR MODAL
  const closeModal = (): void => {
    setIsModalOpen(false);
    setCurrentModal(null); // ==> SETEAR EL NUEVO MODAL QUE SE OCULTARA
  };

  // MOSTRAR MODAL
  const openModal = <T extends EModalType>(modalType: T): void => {
    setIsModalOpen(true);
    setCurrentModal(modalType); // ==> SETEAR EL NUEVO MODAL QUE SE MOSTRARA
  };

  // FUNCION QUE SE EJECUTA CUANDO EL USUARIO ELIGE CLIENTE
  const handleClientClick = () => {
    setClient(true); //ROL CLIENTE EN TRUE
    setIsModalOpen(false); // MODAL CERRADO
    localStorage.setItem('role', 'client');
  };

  // FUNCION QUE SE EJECUTA CUANDO EL USUARIO ELIGE PROFESIONAL
  const handleProClick = () => {
    setClient(false); //ROL CLIENTE EN FALSE
    setIsModalOpen(false); //MODAL CERRADO
    localStorage.setItem('role', 'pro');
  };

  const contextMainValue: TMain = {
    currentModal,
    setCurrentModal,
    closeModal,
    openModal,
    setIsModalOpen,
    setLoading,
    handleClientClick, // FUNCION PARA ELEGIR CLIENTE
    handleProClick, // FUNCION PARA ELEGIR PROFESIONAL
    isModalOpen,
    client, // TRUE = CLIENTE, FALSE = PRO, NULL = NO DEFINIDO
    loading,
  };

  return <MainContext.Provider value={contextMainValue}>{children}</MainContext.Provider>;
};
export default MainProvider;
