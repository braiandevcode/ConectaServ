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
import Services from './pages/Services';
// import InfoTasker from './components/public/InfoTasker';
import ProtectedRoute from './components/private/ProtectedRoute';
import Profile from './routes/ProfileTasker';
import AllSevices from './components/private/DashBoard/AllServices';
import NotFound from './components/NotFound';
import Chat from './components/private/Chat/Chat';
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
          {/* PARTE PUBLICA */}
          <Route path='/' element={<Home />} />
          {/* PARTE PUBLICA RUTAS ANIDAS DESDE REGISTRO */}
          <Route path='register' element={<RegisterLayout />}>
            <Route path='privacity' element={<PrivacyPolicy />} />
            <Route path='terms' element={<TermsAndConditions />} />
            {/* ANIDAMIENTO DE RUTAS DESDE TASKER */}
            <Route element={<RegisterTaskerLayout />}>
              <Route path='tasker' element={<RegisterTasker />} />
              <Route path='*' element={<NotFound />}></Route>
            </Route>
            {/* ANIDAMIENTO DE RUTAS DESDE CLIENTE*/}
            <Route element={<RegisterClientLayout />}>
              <Route path='client' element={<RegisterClient />} />
              <Route path='*' element={<NotFound />}></Route>
            </Route>
            <Route path='*' element={<NotFound />}></Route>
          </Route>

          {/* PARTE PRIVADA A PROTEGER */}
          <Route
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }>
            <Route
              path='/to/chats'
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
            />

            <Route path='*' element={<NotFound />}></Route>
          </Route>

          {/* SOLO CON PROTEGER RUTA PADRE SUS HIJOS TAMBIEN ESTAN PROTEGIDOS */}
          <Route
            element={
              <ProtectedRoute>
                <Services />
              </ProtectedRoute>
            }>
            {/* RUTAS HIJAS */}
            <Route path='services/all' element={<AllSevices />} />
            <Route path='*' element={<NotFound />}></Route>
          </Route>
          <Route
            path='/to/chats'
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<NotFound />}></Route>
        </Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </>
  );
}
