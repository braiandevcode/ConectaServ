import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import MainContext from './MainContext';
import { ENamesOfKeyLocalStorage, EPathPage } from '../../types/enums';
import { clearPersistence } from '../../utils/storageUtils';
import type { TMain } from '../../types/typeMain';

// PROVEEMOS LOGICA Y ESTADOS AL CONTEXTO PRINCIPAL
const MainProvider = ({ children }: { children: React.ReactNode }) => {
  const stored = localStorage.getItem('role');
  // -------------------HOOKS DE REACT-------------------------//
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // ESTADO PARA SABER SI EL USUARIO ES CLIENTE (TRUE), PRO (FALSE), O NULO SI NO HAY ROL
  const [client, setClient] = useState<boolean | null>(null);

  // ESTADO PARA CONTROLAR SI EL MODAL ESTA CERRADO O ABIERTO
  const [isModalClosed, setIsModalClosed] = useState(true);

  // ESTADO PARA MODAL ==> UTILIZANDO HERRAMIENTA DE MODALES DE REACT
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ESTADO PARA CONTROLAR LA CLASE QUE MUESTRA U OCULTA EL MODAL
  const [isShow, setIsShow] = useState('modal-role modal-role--hide');

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
    if (location.pathname === EPathPage.PATH_FORM_CLIENT && stored === 'client') {
      setClient(true);
    } else if (location.pathname === EPathPage.PATH_FORM_PROFESSIONAL && stored === 'pro') {
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
    setIsModalClosed(true);
  }, [location.pathname, navigate]); // DEPENDE SOLO DE PATH Y NAVIGATE

  // ACTUALIZA LA CLASE DEL MODAL CUANDO CAMBIA SU ESTADO (ABIERTO / CERRADO)
  useEffect(() => {
    // GUARDO EN MEMORIA LA CLASE SENGUN BANDERA
    const replaceClass: string = isModalClosed ? 'modal-role modal-role--hide' : 'modal-role';
    setIsShow(replaceClass); //SETEAR LA CLASE
  }, [isModalClosed]); // DEPENDE DEL ESTAD DE BANDERA PARA DE CI ESTA CERRADO O NO

  // ------------------EVENTOS--------------------------------------------------//

  // EVENTO PARA CERRAR MODAL
  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  // FUNCION PARA ABRIR O CERRAR EL MODAL
  const handleToggleModal = () => {
    setIsModalClosed((prev) => !prev); //LO CONTRARIO A LO QUE VENGA
  };

  // FUNCION QUE SE EJECUTA CUANDO EL USUARIO ELIGE CLIENTE
  const handleClientClick = () => {
    setClient(true); //ROL CLIENTE EN TRUE
    setIsModalClosed(true); // MODAL CERRADO
    localStorage.setItem('role', 'client');
  };

  // FUNCION QUE SE EJECUTA CUANDO EL USUARIO ELIGE PROFESIONAL
  const handleProClick = () => {
    setClient(false); //ROL CLIENTE EN FALSE
    setIsModalClosed(true); //MODAL CERRADO
    localStorage.setItem('role', 'pro');
  };

  const contextMainValue: TMain = {
    closeModal,
    setIsModalOpen,
    setIsModalClosed,
    setLoading,
    handleToggleModal, // FUNCION PARA ABRIR / CERRAR MODAL
    handleClientClick, // FUNCION PARA ELEGIR CLIENTE
    handleProClick, // FUNCION PARA ELEGIR PROFESIONAL
    isModalOpen,
    client, // TRUE = CLIENTE, FALSE = PRO, NULL = NO DEFINIDO
    isModalClosed, // ESTADO DE SI EL MODAL ESTA CERRADO
    loading,
    isShow, // CLASES CSS PARA MOSTRAR / OCULTAR MODAL
  };

  return <MainContext.Provider value={contextMainValue}>{children}</MainContext.Provider>;
};
export default MainProvider;
