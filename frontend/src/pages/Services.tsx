import "./../styles/services.css";

import { Outlet } from "react-router";
const Services = () => {
  //  1- CAMBIE DE TIQUETA main a div ==> main 
  //  2- PARA PODER ANIDAR EL RUTEO EL SERVICIO QUEDARIA SOLO CO UN OUTLET Y DESPUES PASAR COMPONENTES A RUTAS EN routes
  return (
    <>
      <Outlet />
    </>
  );
};

export default Services;

