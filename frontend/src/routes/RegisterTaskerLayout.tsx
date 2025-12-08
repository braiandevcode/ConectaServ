import { Outlet } from 'react-router';
import FormVerifyEmailProvider from '../context/form/FormVerifyEmailProvider';
import ModalRegisterRenderer from '../components/public/Modals/ModalRegisterRenderer';
import TaskerRegisterProvider from '../context/register/registerTasker/TaskerRegisterProvider';

// LAYOUT DE REGISTRO DE TASKER
// ESTE LAYOUT ESTA A UNA RUTA O GRUPOS DE RUTAS Y SE USA COMO CONTENEDOR PARA ESAS RUTAS.
const RegisterTaskerLayout = () => {
  return (
    <TaskerRegisterProvider>
      <FormVerifyEmailProvider>
        <ModalRegisterRenderer />
        <Outlet /> 
      </FormVerifyEmailProvider>
    </TaskerRegisterProvider>
  );
};

export default RegisterTaskerLayout;
