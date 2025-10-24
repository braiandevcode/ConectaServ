import { Outlet } from 'react-router';
import TaskerProvider from '../context/register/registerTasker/TaskerProvider';

// LAYOUT DE REGISTRO PROFESIONAL
// ESTE LAYOUT ESTA A UNA RUTA O GRUPOS DE RUTASY SE USA COMO CONTENEDOR PARA ESAS RUTAS.
const RegisterTaskerLayout = () => {
  return (
    <TaskerProvider> {/* PROVIDER QUE MANEJA EL ESTADO Y DATOS DEL PROCESO DE REGISTRO */}
      <Outlet /> {/* OUTLET REPRESENTA EL COMPONENTE HIJO SEGUN LA RUTA ACTUAL DEL REGISTRO */}
    </TaskerProvider>
  );
};

export default RegisterTaskerLayout;
