import { Outlet } from 'react-router';
import ClientProvider from '../context/register/registerClient/ClientProvider';
import FieldsClientProvider from '../context/register/registerClient/FieldsClientProvider';

// LAYOUT DE REGISTRO PROFESIONAL
// ESTE LAYOUT ESTA A UNA RUTA O GRUPOS DE RUTASY SE USA COMO CONTENEDOR PARA ESAS RUTAS.
const  RegisterClientLayout = () => {
  return (
    <ClientProvider> {/* PROVIDER QUE MANEJA EL ESTADO Y DATOS DEL PROCESO DE REGISTRO */}
      <FieldsClientProvider>
        <Outlet /> {/*  OUTLET REPRESENTA EL COMPONENTE HIJO SEGUN LA RUTA ACTUAL DEL REGISTRO */}
      </FieldsClientProvider>
    </ClientProvider>
  );
}

export default RegisterClientLayout;