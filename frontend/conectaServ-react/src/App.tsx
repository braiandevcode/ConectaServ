import { Route, Routes } from 'react-router';
import LoginModal from './components/LoginModal';
import Home from './pages/Home';
import RegisterClient from './components/RegisterClient';
import RegisterPro from './components/RegisterPro';
import MainLayout from './routes/MainLayout';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import RegisterProfessionalLayout from './routes/RegisterProLayout';
import RegisterClientLayout from './routes/RegisterClientLayout';
import { useEffect, useState } from 'react';
import Loader from './components/Loader';
import RegisterLayout from './routes/RegisterLayout';
// COMPONENTE APP PRINCIPAL
export default function App() {
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 1000); // SIMULA CARGA
    return () => clearTimeout(timer);
  }, []);

  if (initialLoading) return <Loader />;

  // --------RENDER APP + RUTAS---------------------//
  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='login' element={<LoginModal />} />
          <Route path='register' element={<RegisterLayout />}>
            <Route path='privacity' element={<PrivacyPolicy />} />
            <Route path='terms' element={<TermsAndConditions />} />
            <Route element={<RegisterProfessionalLayout />}>
              <Route path='pro' element={<RegisterPro />} />
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
