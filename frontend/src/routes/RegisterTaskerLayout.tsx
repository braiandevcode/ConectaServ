import { Outlet } from 'react-router';
import TaskerProvider from '../context/register/registerTasker/TaskerProvider';
import FormVerifyEmailProvider from '../context/form/FormVerifyEmailProvider';
import ModalRegisterRenderer from '../components/public/Modals/ModalRegisterRenderer';

// LAYOUT DE REGISTRO DE TASKER
// ESTE LAYOUT ESTA A UNA RUTA O GRUPOS DE RUTAS Y SE USA COMO CONTENEDOR PARA ESAS RUTAS.
const RegisterTaskerLayout = () => {
  return (
    <TaskerProvider>
      <FormVerifyEmailProvider>
        <ModalRegisterRenderer />
        <Outlet /> 
      </FormVerifyEmailProvider>
    </TaskerProvider>
  );
};

export default RegisterTaskerLayout;
