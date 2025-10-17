import { Outlet } from 'react-router';
import MainProvider from '../context/main/MainProvider';
import Footer from '../components/public/Footer';
import useMain from '../hooks/useMain';
import Loader from '../components/Loader';
import Header from '../components/public/Header';

// LAYOUT PRINCIPAL DE LA APLICACION
// ESTE LAYOUT ESTA A UNA RUTA O GRUPOS DE RUTAS Y SE USA COMO CONTENEDOR PARA ESAS RUTAS.
const MainLayout = () => {
  const { loading } = useMain();
  return (
    // ENVOLVEMOS TODO CON EL PROVIDER PRINCIPAL PARA COMPARTIR DATOS GLOBALES ENTRE COMPONENTES
    <MainProvider>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header /> {/* HEADER FIJO QUE SE MUESTRA EN TODAS LAS PAGINAS */}
          {/* CONTENEDOR PRINCIPAL DONDE SE CARGA EL CONTENIDO SEGUN LA RUTA ACTUAL */}
          <main className='c-flex c-flex-column c-flex-items-center'>
            <Outlet /> {/* OUTLET ES EL ESPACIO DONDE REACT ROUTER RENDERIZA LA PAGINA ACTUAL */}
          </main>
          <Footer /> {/* FOOTER FIJO QUE SE MUESTRA EN TODAS LAS PAGINAS */}
        </>
      )}
    </MainProvider>
  );
};

// EXPORTAMOS EL LAYOUT PARA USARLO EN EL SISTEMA DE RUTAS
export default MainLayout;
