import { Outlet } from 'react-router';
import { ErrorBoundary } from '../components/ErrorBoundary';
import RegisterProvider from '../context/register/RegisterProvider';
import RegisterModalProvider from '../context/modal/RegisterModalProvider';
import ModalRegisterRenderer from '../components/public/Modals/ModalRegisterRenderer';
import FormVerifyEmailProvider from '../context/form/FormVerifyEmailProvider';

// LAYOUT DE REGISTRO PROFESIONAL
// ESTE LAYOUT ESTA A UNA RUTA O GRUPOS DE RUTASY SE USA COMO CONTENEDOR PARA ESAS RUTAS.
const RegisterLayout = () => {
  return (
    // ERROR BOUNDARY CAPTURA ERRORES EN CUALQUIER COMPONENTE HIJO Y EVITA QUE SE ROMPA LA APP
    <ErrorBoundary>
      <RegisterModalProvider>
        <RegisterProvider>
          <FormVerifyEmailProvider>
            <ModalRegisterRenderer />
            <Outlet />
          </FormVerifyEmailProvider>
        </RegisterProvider>
      </RegisterModalProvider>
    </ErrorBoundary>
  );
};

export default RegisterLayout;
