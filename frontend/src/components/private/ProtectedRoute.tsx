import { Navigate, useLocation } from 'react-router';
import { type ReactNode } from 'react';
import useMain from '../../hooks/useMain';
import Loader from '../Loader';
import isIncludesValues from '../../utils/isIncludesValuesUtils';

// COMPONENTE PARA RUTAS PROTEGIDAS
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  //ESTADO DE AUTENTICACION
  const { isAuth, isSessionChecked, userData } = useMain(); //CUSTOM HOOK
  const { pathname } = useLocation();

  // BANDERA PARA SABER SI TERMINO DE CHECKEAR LA SESION
  if (!isSessionChecked) {
    return <Loader />;
  }

  // SI NO ESTA AUTENTICADO MANDAR
  if (!isAuth) {
    return <Navigate to='/' replace state={{ showLogin: true }} />;
  }

  if (userData) {
    // CLIENTE
    if (!userData.isTasker) {
      const allowed: boolean = isIncludesValues(['/client/services', '/client/to/chats', '/client/category'], pathname);
      if (!allowed) return <Navigate to='/client/services' replace />;
    }

    // TASKER
    if (userData.isTasker) {
      const allowed: boolean = isIncludesValues(['/tasker/profile', '/tasker/to/chats'], pathname);
      if (!allowed) return <Navigate to='/tasker/profile' replace />;
    }
  }

  // SI ESTA AUTENTICADO RENDERIZAR A LA RUTA SOLICITADA
  return children;
};

export default ProtectedRoute;
