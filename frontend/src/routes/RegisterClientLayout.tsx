import { Outlet } from 'react-router';
import ClientProvider from '../context/register/registerClient/ClientProvider';
import FieldsClientProvider from '../context/register/registerClient/FieldsClientProvider';
import FormVerifyEmailProvider from '../context/form/FormVerifyEmailProvider';
import ModalRegisterRenderer from '../components/public/Modals/ModalRegisterRenderer';

// LAYOUT DE REGISTRO PROFESIONAL
// ESTE LAYOUT ESTA A UNA RUTA O GRUPOS DE RUTAS Y SE USA COMO CONTENEDOR PARA ESAS RUTAS.
const RegisterClientLayout = () => {
  return (
    <ClientProvider>
        <FieldsClientProvider>
          <FormVerifyEmailProvider>
            <ModalRegisterRenderer />
            <Outlet /> {/*  OUTLET REPRESENTA EL COMPONENTE HIJO SEGUN LA RUTA ACTUAL DEL REGISTRO */}
          </FormVerifyEmailProvider>
        </FieldsClientProvider>
    </ClientProvider>
  );
};

export default RegisterClientLayout;
