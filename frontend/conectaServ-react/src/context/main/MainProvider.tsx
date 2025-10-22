import { useEffect, useState, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router';
import MainContext from './MainContext';
import { ENamesOfKeyLocalStorage, EPathPage } from '../../types/enums';
import { clearPersistence } from '../../utils/storageUtils';
import type { TMain } from '../../types/typeMain';
import type { TFormRole } from '../../types/typeFormRole';
import useGlobalModal from '../../hooks/useGlobalModal';

// PROVEEMOS LOGICA Y ESTADOS AL CONTEXTO PRINCIPAL
const MainProvider = ({ children }: { children: ReactNode }) => {
  const { closeGlobalModal, setIsGlobalModalOpen } = useGlobalModal();
  const stored = localStorage.getItem(ENamesOfKeyLocalStorage.ROLE) as TFormRole | null;

  // -------------------HOOKS DE REACT-------------------------//
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // ESTADO PARA SABER SI EL USUARIO ES CLIENTE (TRUE), PRO (FALSE), O NULO SI NO HAY ROL
  const [client, setClient] = useState<boolean | null>(null);

  // ----------------------useEffects----------------------------------//
  useEffect(() => {
    // FUNCION INTERNA ASiNCRONA PARA LIMPIAR DATOS
    const clear = async () => {
      try {
        await clearPersistence(); // LIMPIA INDEXEDDB + STORAGE
        
      } catch (error) {
        console.error('ERROR AL ELIMINAR DATOS DEL STORAGE E INDEXEDDB:', error);
      }
    };
    
    // SI EL ROL GUARDADO ES CLIENTE Y ESTAMOS EN LA RUTA CORRECTA
    if (pathname === EPathPage.PATH_FORM_CLIENT && stored === 'client') {
      setClient(true);
    } else if (pathname === EPathPage.PATH_FORM_PROFESSIONAL && stored === 'professional') {
      // SI EL ROL GUARDADO ES PRO Y ESTAMOS EN LA RUTA CORRECTA
      setClient(false);
    } else {
      // SI NO HAY ROL VALIDO O NO ESTAMOS EN UNA RUTA DE REGISTRO

      // LIMPIAR DATOS ASÍNCRONAMENTE
      clear();
      // REDIRECCIONAR AL HOME
      navigate('/', { replace: true });
    }

    //ASEGURAR QUE EL MODAL SE CIERRE AL CAMBIAR DE RUTA
    // closeModal();
    setIsGlobalModalOpen(false);
  }, [pathname, navigate]); // DEPENDE SOLO DE PATH Y NAVIGATE

  // FUNCION QUE SE EJECUTA CUANDO EL USUARIO ELIGE CLIENTE
  const handleClientClick = () => {
    localStorage.setItem(ENamesOfKeyLocalStorage.ROLE, 'client');
    setClient(true); //ROL CLIENTE EN TRUE
    closeGlobalModal();
  };

  // FUNCION QUE SE EJECUTA CUANDO EL USUARIO ELIGE PROFESIONAL
  const handleProClick = () => {
    localStorage.setItem(ENamesOfKeyLocalStorage.ROLE, 'professional');
    setClient(false); //ROL CLIENTE EN FALSE
    closeGlobalModal();
  };

  const contextMainValue: TMain = {
    setLoading,
    handleClientClick, // FUNCION PARA ELEGIR CLIENTE
    handleProClick, // FUNCION PARA ELEGIR PROFESIONAL
    client, // TRUE = CLIENTE, FALSE = PRO, NULL = NO DEFINIDO
    loading,
  };

  return <MainContext.Provider value={contextMainValue}>{children}</MainContext.Provider>;
};
export default MainProvider;
