import { Navigate } from "react-router";
import { type ReactNode } from "react";
import useMain from "../../hooks/useMain";
import Loader from "../Loader";

// COMPONENTE PARA RUTAS PROTEGIDAS
const ProtectedRoute = ({ children}: { children: ReactNode}) => {  
  //ESTADO DE AUTENTICACION
  const { isAuth, isSessionChecked } = useMain(); //CUSTOM HOOK

  // BANDERA PARA SABER SI TERMINO DE CHECKEAR LA SESION
  if(!isSessionChecked){
    return <Loader />;
  }
  
  //  SI NO ESTA AUTENTICADO MANDAR
  if (!isAuth) {
    return (
      <Navigate
        to="/" 
        replace 
        state={{ showLogin: true }} 
      />
    );
  }

  // SI ESTA AUTENTICADO RENDERIZAR A LA RUTA SOLICITADA
  return children;
};

export default ProtectedRoute;