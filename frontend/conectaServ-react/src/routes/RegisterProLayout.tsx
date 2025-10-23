import { Outlet } from 'react-router';
import ProfessionalProvider from '../context/register/registerPro/ProfessionalProvider';

// LAYOUT DE REGISTRO PROFESIONAL
// ESTE LAYOUT ESTA A UNA RUTA O GRUPOS DE RUTASY SE USA COMO CONTENEDOR PARA ESAS RUTAS.
const RegisterProfessionalLayout = () => {
  return (
    <ProfessionalProvider> {/* PROVIDER QUE MANEJA EL ESTADO Y DATOS DEL PROCESO DE REGISTRO */}
      <Outlet /> {/* OUTLET REPRESENTA EL COMPONENTE HIJO SEGUN LA RUTA ACTUAL DEL REGISTRO */}
    </ProfessionalProvider>
  );
};

export default RegisterProfessionalLayout;
