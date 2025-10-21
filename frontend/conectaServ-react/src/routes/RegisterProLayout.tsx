import { Outlet } from 'react-router';
import ProfessionalProvider from '../context/register/registerPro/ProfessionalProvider';
import ModalRenderer from '../components/public/Modals/ModalRenderer';

// LAYOUT DE REGISTRO PROFESIONAL
// ESTE LAYOUT ESTA A UNA RUTA O GRUPOS DE RUTASY SE USA COMO CONTENEDOR PARA ESAS RUTAS.
const RegisterProfessionalLayout = () => {
  return (
    <ProfessionalProvider> {/* PROVIDER QUE MANEJA EL ESTADO Y DATOS DEL PROCESO DE REGISTRO */}
      <ModalRenderer /> {/* MODAL CONTEXTO REGISTRO PROFESIONAL */}
      <Outlet /> {/* OUTLET REPRESENTA EL COMPONENTE HIJO SEGUN LA RUTA ACTUAL DEL REGISTRO */}
    </ProfessionalProvider>
  );
};

export default RegisterProfessionalLayout;
