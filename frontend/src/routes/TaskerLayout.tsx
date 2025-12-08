import { Outlet } from 'react-router';
import { ErrorBoundary } from '../components/ErrorBoundary';
import RegisterModalProvider from '../context/modal/RegisterModalProvider';
import TaskerProvider from '../context/register/TaskerProvider';

// LAYOUT DE REGISTRO PROFESIONAL
// ESTE LAYOUT ESTA A UNA RUTA O GRUPOS DE RUTASY SE USA COMO CONTENEDOR PARA ESAS RUTAS.
const TaskerLayout = () => {
  return (
    // ERROR BOUNDARY CAPTURA ERRORES EN CUALQUIER COMPONENTE HIJO Y EVITA QUE SE ROMPA LA APP
    <ErrorBoundary>
      <RegisterModalProvider>
        <TaskerProvider>
          <Outlet />
        </TaskerProvider>
      </RegisterModalProvider>
    </ErrorBoundary>
  );
};

export default TaskerLayout;
