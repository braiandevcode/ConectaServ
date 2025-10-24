import { Route, Routes } from 'react-router';
// import LoginModal from './components/public/Modals/ModalLogin';
import MainLayout from './routes/MainLayout';
import PrivacyPolicy from './components/public/PrivacyPolicy';
import TermsAndConditions from './components/public/TermsAndConditions';
import RegisterClientLayout from './routes/RegisterClientLayout';
import { useEffect, useState } from 'react';
import Loader from './components/Loader';
import RegisterLayout from './routes/RegisterLayout';
import Home from './components/public/Home';
import RegisterClient from './components/public/Forms/Register/UserClient/RegisterClient';
import RegisterTasker from './components/public/Forms/Register/UserTasker/RegisterTasker';
import RegisterTaskerLayout from './routes/RegisterTaskerLayout';
// COMPONENTE APP PRINCIPAL
export default function App() {
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 1000); // SIMULA CARGA
    return () => clearTimeout(timer);
  }, []);


  // SI ES CARGA INICIAL
  if (initialLoading) return <Loader />; // ==> MOSTRAR LOADER

  // --------RENDER APP + RUTAS---------------------//
  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          {/* <Route path='login' element={<LoginModal />} /> */}
          <Route path='register' element={<RegisterLayout />}>
            <Route path='privacity' element={<PrivacyPolicy />} />
            <Route path='terms' element={<TermsAndConditions />} />
            <Route element={<RegisterTaskerLayout />}>
              <Route path='tasker' element={<RegisterTasker />} />
            </Route>
            <Route element={<RegisterClientLayout />}>
              <Route path='client' element={<RegisterClient />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}
