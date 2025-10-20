import { Outlet } from 'react-router';
import { ErrorBoundary } from '../components/ErrorBoundary';
import RegisterProvider from '../context/register/RegisterProvider';
import ModalVerifyEmailProvider from '../context/register/modal/ModalVerifyProvider';

// LAYOUT DE REGISTRO PROFESIONAL
// ESTE LAYOUT ESTA A UNA RUTA O GRUPOS DE RUTASY SE USA COMO CONTENEDOR PARA ESAS RUTAS.
const RegisterLayout = () => {
  return (
    // ERROR BOUNDARY CAPTURA ERRORES EN CUALQUIER COMPONENTE HIJO Y EVITA QUE SE ROMPA LA APP
    <ErrorBoundary>
      <RegisterProvider>
        <ModalVerifyEmailProvider>
          <Outlet />
        </ModalVerifyEmailProvider>
      </RegisterProvider>
    </ErrorBoundary>
  );
};

export default RegisterLayout;
