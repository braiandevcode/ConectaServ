import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router';
import MainContext from './MainContext';
import { ENamesOfKeyLocalStorage, EPathPage } from '../../types/enums';
import { clearPersistence } from '../../utils/storageUtils';
import type { TMain } from '../../types/typeMain';
import type { TFormRole } from '../../types/typeFormRole';
import useGlobalModal from '../../hooks/useGlobalModal';
import { EModalGlobalType } from '../../types/enumGlobalModalType';
import type { iStatusError } from '../../interfaces/iSatatus';
import apiRequest from '../../utils/apiRequestUtils';
import { endPointUser } from '../../config/configEndpointUser';
import useUserApi from '../../hooks/useUserApi';
import type { TDataPayloadUser } from '../../types/typeDataPayloadUser';

// PROVEEMOS LOGICA Y ESTADOS AL CONTEXTO PRINCIPAL
const MainProvider = ({ children }: { children: ReactNode }) => {
  // CUSTOM HOOKS
  const { closeGlobalModal, showError, openGlobalModal, setErrorText, setPasswordLogin } = useGlobalModal(); //HOOK QUE USA EL CONTEXTO DE MODAL GLOBAL
  const { getDataUser} = useUserApi();

  const { REFRESH } = endPointUser;

  const stored = localStorage.getItem(ENamesOfKeyLocalStorage.ROLE) as TFormRole | null;

  // ESTADO PARA SABER SI EL USUARIO ES CLIENTE (TRUE), PRO (FALSE), O NULO SI NO HAY ROL
  const [client, setClient] = useState<boolean | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isSessionChecked, setIsSessionChecked] = useState(false);
  const [isLogout, setIsLogout] = useState(false);

  const fetchedRef = useRef(false); //REF PARA EVITAR LLAMADAD DUPLICADAS
  const intervalRef = useRef<number | null>(null); // REF PARA GUARDAR EL INTERVAL Y PODER LIMPIARLO

  // ------------------HOOKS DE REACT-------------------------//
  const { pathname, state } = useLocation(); //==> LOCATION DE RACT
  const navigate = useNavigate(); //==> NAVIGATE DE RACT
  const [loading, setLoading] = useState(false); // ==> BANDERA DEL PROCESO DE LOADER
  const [userData, setUserData] = useState<TDataPayloadUser| null>(null); //DATOS DE USUARIO LOGEADO
  const [taskerData, setTaskerData] = useState<TDataPayloadUser[]>([]); // DATOS DE TASKERS EXCLUIDO USUARIO LOGEADO
  
  // ----------------------useEffects----------------------------------//
  // INTERVAL PARA REFRESCAR ACCESS TOKEN CADA 14 MINUTOS
  useEffect(() => {
    // SI ESTAMOS HACIENDO LOGOUT, LIMPIAR EL INTERVAL Y NO HACER REFRESH TOKEN
    if (isLogout) {
      // LIMPIAR INTERVAL SI EXISTE
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return; //NO SEGUIR
    }

    // FUNCION PARA INICIAR EL INTERVAL
    const startInterval = () => {
      // 14 MINUTOS EN MS ANTES DE EXPIRO DEL ACCESS TOKEN
      const REFRESH_INTERVAL: number = 1 * 60 * 1000;

      // SI YA EXISTE UN INTERVAL, LO LIMPIAMOS
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // CREAR NUEVO INTERVAL
      intervalRef.current = setInterval(() => {
        refreshToken(); // LLAMAR AL REFRESH TOKEN AUTOMATICO
      }, REFRESH_INTERVAL);
    };

    // PRIMER REFRESH AL MONTAR ==> SOLO SI NO ESTAMOS EN LOGOUT
    refreshToken().finally(() => {
      // INICIAR INTERVAL DESPUES DEL PRIMER REFRESH
      startInterval();
    });

    // CLEANUP CUANDO SE DESMONTA EL PROVIDER
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isLogout]);

  // TRAER DATOS NI BIEN SE LOGEA USUARIO
  useEffect(() => {
    if (!accessToken || fetchedRef.current) return; // SI NO HAY TOKEN Y SI EL REF YA ES TRUE

    fetchedRef.current = true; //PASAR A TRUE EN ESTE INSTANTE

    const fetchData = async () => {
      const data = await getDataUser({ accessToken });
      setUserData(data);
    };

    fetchData();
  }, [accessToken]);

  useEffect(() => {
    handleRoleAndFormNavigation();
  }, [pathname, navigate]);

  // EFECTO PARA MOSTRAR LOGIN LUEGO DE RENDERIZAR AL HOME AL REGISTRARSE
  useEffect(() => {
    // OBJETO DE ESTADO DE NAVIGATE CON PROPIEDAD "showwLogin" BOOLEANO PARA INDICAR MUESTRE EL MODAL LUEGO DE NAVEGAR
    // SI ESTA EN TRUE
    if (state?.showLogin) {
      openGlobalModal(EModalGlobalType.MODAL_LOGIN, clearTextsLogin); // ==> MOSTRAR MODAL

      // LIMPIAR ESTADO INMEDIATAMENTE
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [state, openGlobalModal]);

  const clearTextsLogin = () => {
    setErrorText('');
    setPasswordLogin('');
  };

  // -------------------------------FUNCIONES-----------------------------------//
  // REFRESH TOKEN
  const refreshToken = async (): Promise<void | null> => {
    try {
      setLoading(true);
      const resultRefresh = await apiRequest<{ accessToken: string }>(`${REFRESH}`, {
        method: 'POST',
        credentials: 'include', //PERMITIR LEER Y OBTENER COOKIE
      });
      if (!resultRefresh) return null;

      setAccessToken(resultRefresh.accessToken);
      setIsAuth(true);
      setIsSessionChecked(true); // ==> ESTADO PARA COMPONENTE QUE PROTEJE RUTAS
    } catch (error) {
      setAccessToken(null);
      setIsAuth(false);
      setIsSessionChecked(true); // ==> ESTADO PARA COMPONENTE QUE PROTEJE RUTAS
      const err = error as iStatusError;
      if (err.status === 500 && !isLogout) {
        openGlobalModal(EModalGlobalType.MODAL_ERROR); //ACTUALIZAR PARA EL NUEVO MODAL DE ERROR
        showError('Ups', 'Ocurrió un error inesperado, intente nuevamente más tarde');
      }
      throw err;
    } finally {
      setLoading(false);
    }
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
