import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router';
import MainContext from './MainContext';
import { ENamesOfKeyLocalStorage, EPathPage } from '../../types/enums';
import { clearPersistence } from '../../utils/storageUtils';
import type { TMain } from '../../types/typeMain';
import type { TFormRole } from '../../types/typeFormRole';
import useGlobalModal from '../../hooks/useGlobalModal';
import { EModalGlobalType } from '../../types/enumGlobalModalType';
import { endPointUser } from '../../config/configEndpointUser';
import type { TDataPayloadUser } from '../../types/typeDataPayloadUser';
import type { TActiveTaskerUser } from '../../types/typeActiveTaskUser';
import type { TDataPayloadTaskerSingle } from '../../types/typeDataPayloadTaskerSingle';

// PROVEEMOS LOGICA Y ESTADOS AL CONTEXTO PRINCIPAL
const MainProvider = ({ children }: { children: ReactNode }) => {
  // CUSTOM HOOKS
  const { closeGlobalModal, showError, openGlobalModal, setErrorText, setPasswordLogin } = useGlobalModal(); //HOOK QUE USA EL CONTEXTO DE MODAL GLOBAL

  const { REFRESH } = endPointUser;

  const stored = localStorage.getItem(ENamesOfKeyLocalStorage.ROLE) as TFormRole | null;

  // ESTADO PARA SABER SI EL USUARIO ES CLIENTE (TRUE), PRO (FALSE), O NULO SI NO HAY ROL
  const [client, setClient] = useState<boolean | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isSessionChecked, setIsSessionChecked] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [selectedTaskerProfile, setSelectedTaskerProfile] = useState<TDataPayloadTaskerSingle | undefined>(undefined);

  // const fetchedRef = useRef(false); //REF PARA EVITAR LLAMADAD DUPLICADAS
  const intervalRef = useRef<number | null>(null); // REF PARA GUARDAR EL INTERVAL Y PODER LIMPIARLO

  // ------------------HOOKS DE REACT-------------------------//
  const { pathname, state } = useLocation(); //==> LOCATION DE RACT
  const navigate = useNavigate(); //==> NAVIGATE DE REACT
  const [loading, setLoading] = useState(false); // ==> BANDERA DEL PROCESO DE LOADER
  const [userData, setUserData] = useState<TDataPayloadUser | null>(null); //DATOS DE USUARIO LOGEADO
  const [taskerData, setTaskerData] = useState<TActiveTaskerUser[]>([]); // DATOS DE TASKERS EXCLUIDO USUARIO LOGEADO
  const [isSession, setIsSession] = useState<boolean>(() => {
    const storedSession = localStorage.getItem('hasSession');
    return storedSession === 'true';
  });

  // ----------------------useEffects----------------------------------//
  // INTERVAL PARA REFRESCAR ACCESS TOKEN CADA 14 MINUTOS
  useEffect(() => {
   if (!isSession) return;
    // SI ESTAMOS HACIENDO LOGOUT, LIMPIAR EL INTERVAL Y NO HACER REFRESH TOKEN
    // LIMPIAR INTERVAL SI EXISTE
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    // FUNCION PARA INICIAR EL INTERVAL
    const startInterval = () => {
      // 14 MINUTOS EN MS ANTES DE EXPIRO DEL ACCESS TOKEN
      const REFRESH_INTERVAL: number = 14 * 60 * 1000;
      
      // SI YA EXISTE UN INTERVAL
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      // CREAR NUEVO INTERVAL Y ALMACENAR EN REF
      intervalRef.current = setInterval(() => {
        refreshToken(); // LLAMAR AL REFRESH TOKEN AUTOMATICO
      }, REFRESH_INTERVAL);
    };
    
    // PRIMER REFRESH AL MONTAR ==> SOLO SI NO ESTAMOS EN LOGOUT
    refreshToken().finally(() => {
      // INICIAR INTERVAL DESPUES DEL PRIMER REFRESH
      startInterval();
    });
    
    localStorage.setItem('hasSession', String(isSession));
    // CLEANUP CUANDO SE DESMONTA EL PROVIDER
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isSession]);

  useEffect(() => {
    handleRoleAndFormNavigation();
  }, [pathname, navigate]);

  // EFECTO PARA MOSTRAR LOGIN LUEGO DE RENDERIZAR AL HOME AL REGISTRARSE
  useEffect(() => {
    // OBJETO DE ESTADO DE NAVIGATE CON PROPIEDAD "showwLogin" BOOLEANO PARA INDICAR MUESTRE EL MODAL LUEGO DE NAVEGAR
    // SI ESTA EN TRUE
    if (state?.showLogin) {
      openGlobalModal(EModalGlobalType.MODAL_LOGIN, clearTextsLogin); // ==> MOSTRAR MODAL
      // LIMPIO ESTADO INMEDIATAMENTE
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [state, openGlobalModal]);

  // LIMPIAR TEXTO EN LOGIN
  const clearTextsLogin = () => {
    setErrorText('');
    setPasswordLogin('');
  };

  // -------------------------------FUNCIONES-----------------------------------//
  // REFRESH TOKEN
  const refreshToken = async (): Promise<void | null> => {
    try {
      setLoading(true);
      const response = await fetch(REFRESH, {
        method: 'POST',
        credentials: 'include', // ENVIAR COOKIE
      });

      if (!response.ok) {
        // COOKIE INVALIDA O REFRESH EXPIRADO
        setAccessToken(null);
        setIsAuth(false);
        setIsSessionChecked(true);
        return null;
      }

      const data = await response.json();

      // TOKEN REFRESCADO CORRECTAMENTE
      setAccessToken(data.accessToken);
      setIsAuth(true);
      setIsSessionChecked(true);
    } catch (error) {
      // ERROR DE RED O BACKEND CAIDO
      setAccessToken(null);
      setIsAuth(false);
      setIsSessionChecked(true);
    } finally {
      // FIN DE PROCESO DE REFRESH
      setLoading(false);
    }
  };

  const onBackToList = () => {
    setSelectedTaskerProfile(undefined);
    navigate('/client/services', { replace: true });
  };

  // MANEJA TODA LA LOGICA DE FORM + ROLE + NAVEGACION
  const handleRoleAndFormNavigation = async () => {
    // LIMPIAR PERSISTENCIA SI ES NECESARIO
    const clear = async () => {
      try {
        await clearPersistence();
      } catch (error: unknown) {
        showError('No pudimos borrar algunos datos', 'No te preocupes, podés continuar sin problemas. Si vuelve a aparecer, recargá la página.');
      }
    };

    const isClientForm = pathname === EPathPage.PATH_FORM_CLIENT;
    const isTaskerForm = pathname === EPathPage.PATH_FORM_TASKER;

    // FORM CLIENTE + ROLE CLIENT
    if (isClientForm && stored === 'client') {
      setClient(true);
      closeGlobalModal();
      return;
    }

    // FORM TASKER + ROLE TASKER
    if (isTaskerForm && stored === 'tasker') {
      setClient(false);
      closeGlobalModal();
      return;
    }

    // FORM INCORRECTO PARA ROLE ==> BORRAR Y REDIRIGIR
    if (isClientForm || isTaskerForm) {
      await clear();
      navigate('/', { replace: true });
      return;
    }

    // FUERA DE TODOS LOS FORM ==> SIEMPRE BORRAR
    await clear();
    closeGlobalModal();
  };

  // FUNCION QUE SE EJECUTA CUANDO EL USUARIO ELIGE CLIENTE
  const handleClientClick = () => {
    localStorage.setItem(ENamesOfKeyLocalStorage.ROLE, 'client');
    setClient(true); //ROL CLIENTE EN TRUE
    closeGlobalModal();
  };

  // FUNCION QUE SE EJECUTA CUANDO EL USUARIO ELIGE PROFESIONAL
  const handleTaskerClick = () => {
    localStorage.setItem(ENamesOfKeyLocalStorage.ROLE, 'tasker');
    setClient(false); //ROL CLIENTE EN FALSE
    closeGlobalModal();
  };

  const contextMainValue: TMain = {
    setIsLogout,
    setLoading,
    handleClientClick, // FUNCION PARA ELEGIR CLIENTE
    handleTaskerClick, // FUNCION PARA ELEGIR PROFESIONAL
    setAccessToken,
    setIsAuth,
    setIsSessionChecked,
    setUserData,
    setTaskerData,
    setSelectedTaskerProfile,
    onBackToList,
    isSession,
    setIsSession,
    selectedTaskerProfile,
    taskerData,
    userData,
    isLogout,
    isSessionChecked,
    isAuth,
    accessToken,
    client, // TRUE = CLIENTE, FALSE = PRO, NULL = NO DEFINIDO
    loading,
  };

  return <MainContext.Provider value={contextMainValue}>{children}</MainContext.Provider>;
};
export default MainProvider;
