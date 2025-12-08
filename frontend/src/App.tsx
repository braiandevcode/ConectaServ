import { Route, Routes } from 'react-router';
import MainLayout from './routes/MainLayout';
import PrivacyPolicy from './components/public/PrivacyPolicy';
import TermsAndConditions from './components/public/TermsAndConditions';
import RegisterClientLayout from './routes/RegisterClientLayout';
import { useEffect, useState } from 'react';
import Loader from './components/Loader';
import TaskerLayout from './routes/TaskerLayout';
import Home from './components/public/Home';
import RegisterClient from './components/public/Forms/Register/UserClient/RegisterClient';
import RegisterTasker from './components/public/Forms/Register/UserTasker/RegisterTasker';
import RegisterTaskerLayout from './routes/RegisterTaskerLayout';
import Services from './pages/Services';
import ProtectedRoute from './components/private/ProtectedRoute';
import Profile from './routes/ProfileTasker';
import AllSevices from './components/private/DashBoard/AllServices';
import NotFound from './components/NotFound';
import Chat from './components/private/Chat/Chat';
import ProfileTaskerInfo from './components/private/DashBoard/ClientRole/ProfileTaskerInfo';
import ProfileTasker from './components/private/DashBoard/TaskerRole/ProfileTasker';
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
          <Route path='tasker' element={<TaskerLayout />}>
            {/* /tasker */}
            {/* PARTE PRIVADA A PROTEGER HAMBITO DE TASKERS*/}
            <Route
              path='profile'
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }>
              <Route index element={<ProfileTasker />} />
              {/* /tasker/profile */}
              <Route path='*' element={<NotFound />} /> {/* ==> /tasker/profile/404*/}
            </Route>
            <Route
              path='to/chats'
              element={
                <ProtectedRoute>
    
                  <Chat />
                </ProtectedRoute>
              }>

              {/* /tasker/to/chats */}
              <Route path='*' element={<NotFound />} /> {/* ==> /tasker/to/chats/404*/}
            </Route>
            {/* ANIDAMIENTO DE RUTAS DESDE TASKER PARTE PUBLICA */}
            <Route path='register' element={<RegisterTaskerLayout />}>

              {/*/tasker/register*/}
              <Route index element={<RegisterTasker />} /> {/* ==> /tasker/register */}
              <Route path='privacity' element={<PrivacyPolicy />} /> {/* /tasker/register/privacity */}
              <Route path='terms' element={<TermsAndConditions />} /> {/* /tasker/register/terms */}
              <Route path='*' element={<NotFound />} /> {/* ==> /tasker/register/404 */}
            </Route>
            <Route path='*' element={<NotFound />} /> {/* ==> /tasker/404 */}
          </Route>
          {/* ANIDAMIENTO DE RUTAS DESDE CLIENTE PUBLICO*/}
          <Route path='client' element={<RegisterClientLayout />}>
            {/* ANIDAMIENTO DE RUTAS DESDE CLIENT PARTE PUBLICA */}
            <Route path='register' element={<RegisterClient />} /> {/* ==> /client/register */}
            <Route path='/client/register/privacity' element={<PrivacyPolicy />} /> {/* /client/register/privacity */}
            <Route path='/client/register/terms' element={<TermsAndConditions />} /> {/* /client/register/terms */}
            <Route path='*' element={<NotFound />} /> {/* ==> /client/register/404 */}
            
            {/* PARTE PRIVADA A PROTEGER HAMBITO DE CLIENTES*/}
            <Route
              path='services'
              element={
                <ProtectedRoute>
                  <Services />
                </ProtectedRoute>
              }>

              {/* /client/services */}
              <Route index element={<AllSevices />} /> {/* ==> /client/services/ */}
              <Route path='tasker/:idTasker' element={<ProfileTaskerInfo />} /> {/* ==> /client/services/tasker/:idTasker*/}
              <Route path='*' element={<NotFound />} /> {/* ==> /client/services/404 */}
            </Route>
            <Route
              path='to/chats'
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }>

              {/* /client/to/chats */}
              <Route path='*' element={<NotFound />} /> {/* ==> /client/to/chats/404 */}
            </Route>
            <Route path='*' element={<NotFound />} /> {/* ==> /client/404 */}
          </Route>
          {/* CULAQUIER PATH QUE NO COINCIDA DESDE EL HOME 404 */}
          <Route path='*' element={<NotFound />} /> {/* ==> /404 */}
        </Route>
      </Routes>
    </>
  );
}
