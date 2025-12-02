import useGlobalModal from './useGlobalModal';
import { EModalGlobalType } from '../types/enumGlobalModalType';
import type { iHeader } from '../interfaces/iHeader';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import type { iRulesHeader } from '../interfaces/iRulesHeder';
import NavLoginAndRegister from '../components/public/NavLoginAndRegister';
import { FaList, FaUser } from 'react-icons/fa';
import NavCategory from '../components/public/NavCategory';
import NavLogout from '../components/private/DashBoard/Logout';
import useMain from './useMain';
import useLogin from './useLogin';
import NavProfile from '../components/private/DashBoard/NavProfile';
import NavService from '../components/private/DashBoard/NavService';
import NavLinkChats from '../components/private/Chat/NavLinkChat';
import { FiArrowLeft } from 'react-icons/fi';

// CUSTOM HOOK PARA LOGICA EN HEADER DE PAGINA
const useHeader = () => {
  //------------------------CUSTOM HOOOKS--------------------------------//
  const { openGlobalModal, isGlobalModalOpen, setErrorText, setPasswordLogin } = useGlobalModal(); //HOOK QUE USA CONTEXTO DE MODAL GLOBAL
  const { isAuth, userData } = useMain(); //HOOK QUE USA CONTEXTO DEL MAIN

  const { setUserName } = useLogin(); //HOOO QUE USA CONTEXTO LOGIN

  // -----------------ESTADOS-------------------------------------------//
  const [menuOpen, setMenuOpen] = useState(false);

  //---------------------------HOOKS DE REACT---------------------//
  const { pathname } = useLocation(); // PARA SABER EN QUE RUTA ESTAMOS

  // -------------------FUNCIONES---------------------------------------------//
  // QUIERO QUE CUANDO CIERRE EL MODAL LOS ESTADOS DE ERROR EN EL LOGIN SE LIMPIEN
  const cleanError = () => {
    setErrorText('');
    setPasswordLogin('');
    setUserName('');
  };

  // ABRIR MODAL LOGIN
  const openLogin = () => openGlobalModal(EModalGlobalType.MODAL_LOGIN, cleanError);

  // FUNCION QUE SOLO INDICA ABRIR MODAL DE ROL A ELEGUIR
  const openRole = (): void => openGlobalModal(EModalGlobalType.MODAL_ROLE, cleanError); // ==> PASO EL TIPO DE MODAL A ABRIR

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // FUNCION PARA ALTERNAR EL ESTADO MEDIANTE CLICK EN FLECHA
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); //GUARDA EL ESTADO CONTRARIO
  };

  // EFECTO PARA CONTROLAR CUANDO SE ABRE UN MODAL GLOBAL
  useEffect(() => {
    if(!isGlobalModalOpen) return; //SI EL GLOBAL ESTA CERRADO ESTE NO EJECUTA
    // SINO VUELVE A ALTERNAR AL ESTADO  DEL isMobileMenuOpen
    setIsMobileMenuOpen(!isGlobalModalOpen)
  }, [isGlobalModalOpen]);

  /*
    COMO PODRIA HABER VARIOS ENLACES A MANEJAR DEPENDIENDO DE RUTAS O AUTENTICACION
    SE CREO UNA LOGICA PARA SIMPLEMENTE MAPEAR Y RETORNAR EL COMPONENTE EN CUESTION
  */

  // SEGUNDO PASO SE DEFINE UN ARRAY DE REGLAS DONDE HAGO USO DEL METODO ANTERIOR
  // TENER CUIDADO DEBE RESPETARSE EL ORDEN DE REGLAS PARA QUE TENGAN MAYOR PRIORIDAD EN LA EVALUACION
  const rules: iRulesHeader[] = [
    // PUBLICO
    {
      condition: !isAuth && pathname === '/',
      component: () => (
        <>
          <div className='header__content'>
            <div className='containerNavAndLogin'>
              <NavLoginAndRegister />
            </div>

            <div className='mobileNavIcon' onClick={toggleMobileMenu}>
              <FiArrowLeft />
            </div>

            <div className={`mobileNavAndLogin ${isMobileMenuOpen ? 'open' : ''}`}>
              <div className='mobileMenuCloseIcon' onClick={toggleMobileMenu}>
                <FiArrowLeft />
              </div>

              <NavLoginAndRegister />
            </div>
          </div>
        </>
      ),
    },
    // SECCION TASKER
    {
      condition: isAuth && Boolean(userData?.isTasker),
      component: () => (
        <div className='w-full c-flex c-flex-items-center c-flex-justify-between'>
          <button className='menu-toggle' onClick={() => setMenuOpen(true)}>
            <FaList />
          </button>

          <div className='c-flex c-flex-items-center gap-2'>
            {pathname !== '/profile/info' && <NavProfile />}
            <NavLinkChats />
            <NavCategory menuChildOpen={menuOpen} />
            {pathname !== '/profile/info' && pathname !== '/' && (
              <>
                <h3 className='c-flex c-flex-items-center gap-1/2'>
                  <FaUser /> {userData?.userName}
                </h3>
              </>
            )}
            <NavLogout />
          </div>
        </div>
      ),
    },

    // ROL CLIENTES
    {
      condition: isAuth && Boolean(!userData?.isTasker),
      component: () => (
        <div className='w-full c-flex c-flex-items-center c-flex-justify-between'>
          <button className='menu-toggle' onClick={() => setMenuOpen(true)}>
            <FaList />
          </button>

          <div className='c-flex c-flex-items-center gap-2'>
            <h3 className='c-flex c-flex-items-center gap-1/2'>
              <FaUser /> {userData?.userName}
            </h3>
            <NavLinkChats />
            <NavCategory menuChildOpen={menuOpen} />
            {pathname !== '/services/all' && <NavService />}
            <NavLogout />
          </div>
        </div>
      ),
    },
  ];

  // CONTSANTE QUE GUARDAEGLA EN MEMORIA EL FILTRADO DE LAS RS
  const matched: iRulesHeader | undefined = rules.find((rule) => rule.condition);

  // SI DEVUELVE UN COMPONENTE O NULO
  const ComponentToRender = matched ? matched.component : null;

  return { openRole, openLogin, ComponentToRender } as iHeader;
};

export default useHeader;
