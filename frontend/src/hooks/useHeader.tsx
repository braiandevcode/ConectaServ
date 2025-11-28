import useGlobalModal from './useGlobalModal';
import { EModalGlobalType } from '../types/enumGlobalModalType';
import type { iHeader } from '../interfaces/iHeader';
import useLogin from './useLogin';
import { useState } from 'react';
import { useLocation } from 'react-router';
import type { iRulesHeader } from '../interfaces/iRulesHeder';
import NavLoginAndRegister from '../components/public/NavLoginAndRegister';
import { FaList } from 'react-icons/fa';
import NavCategory from '../components/public/NavCategory';
import NavDashboard from '../components/public/NavDashboard';
import NavLogout from '../components/private/Logout';
import useMain from './useMain';

// CUSTOM HOOK PARA LOGICA EN HEADER DE PAGINA
const useHeader = () => {
  //------------------------CUSTOM HOOOKS--------------------------------//
  const { openGlobalModal } = useGlobalModal(); //HOOK QUE USA CONTEXTO DE MODAL GLOBAL
  const { setError } = useLogin(); //HOOK QUE USA CONTEXTO DE LOGIN
  const { isAuth } = useMain(); //HOOK QUE USA CONTEXTO DE LOGIN
  // -----------------ESTADOS-------------------------------------------//
  const [menuOpen, setMenuOpen] = useState(false);

  //---------------------------HOOKS DE REACT---------------------
  const { pathname } = useLocation(); // PARA SABER EN QUE RUTA ESTAMOS
 
  // -------------------FUNCIONES---------------------------------------------//
  // QUIERO QUE CUANDO CIERRE EL MODAL LOS ESTADOS DE ERROR EN EL LOGIN SE LIMPIEN
  const cleanError = () => {
    setError('');
  };

  const openLogin = () => openGlobalModal(EModalGlobalType.MODAL_LOGIN, cleanError);

  // FUNCION QUE SOLO INDICA ABRIR MODAL DE ROL A ELEGUIR
  const openRole = (): void => openGlobalModal(EModalGlobalType.MODAL_ROLE); // ==> PASO EL TIPO DE MODAL A ABRIR

  /*
    COMO PODRIA HABER VARIOS ENLACES A MANEJAR DEPENDIENDO DE RUTAS O AUTENTICACION
    SE CREO UNA LOGICA PARA SIMPLEMENTE MAPEAR Y RETORNAR EL COMPONENTE EN CUESTION
  */ 
  
  // PRIMER PASO, COMO SE REPETIRAN EN LA MAYORIA DE CASOS EL METODO INCLUDES DE ARRRAY
  // CREO FUNCION QUE ESPERA UNA LISTA DE CADENA DE TEXTO REFERENTE A LAS RUTAS A EVALUAR
  // ESTE METODO RETORNARA UN BOOLEAN
  const isIncludesPath = (paths:string[]): boolean => {
    return paths.includes(pathname); //EVALUAR EL pathname DEL HOOK DE REACT
  }
  
  // SEGUNDO PASO SE DEFINE UN ARRAY DE REGLAS DONDE HAGO USO DEL METODO ANTERIOR
  // TENER CUIDADO DEBE RESPETARSE EL ORDEN DE REGLAS PARA QUE TENGAN MAYOR PRIORIDAD EN LA EVALUACION  
  const rules:iRulesHeader[] = [
    {
        condition: !isAuth && pathname === '/',
        component: () => <>
          <div className='c-flex c-flex-items-center gap-1 auth-wrapper'>
            <NavLoginAndRegister />
          </div>
        </> 
    },
    {
      condition: isAuth && isIncludesPath(['/services', '/dashboard']), 
      component: () => <>
        <div className='c-flex c-flex-items-center gap-1'>
          <div>
            <button className='menu-toggle' onClick={() => setMenuOpen(!menuOpen)}>
              <FaList />
            </button>
          </div>
     
          <div className='w-full c-flex c-flex-justify-end c-flex-items-center gap-1'>
            <NavCategory menuChildOpen={menuOpen} />
            <NavLogout />
          </div>
        </div>
      </>
    },
    {
      condition: isAuth && !isIncludesPath(['/dashboard']), //ATENCION => LO ESTOY NEGANDO (CUALQUIER RUTA MENOS dashboard)
      component: NavDashboard, // RENDERIZAR LINK DE DASHBOARD
    },
  ];
  
  // CONTSANTE QUE GUARDAEGLA EN MEMORIA EL FILTRADO DE LAS RS 
  const matched: iRulesHeader | undefined = rules.find((rule) => rule.condition);
    
  // SI DEVUELVE UN COMPONENTE O NULO
  const ComponentToRender = matched ? matched.component : null;

  return { openRole, openLogin, ComponentToRender} as iHeader;
};

export default useHeader;
