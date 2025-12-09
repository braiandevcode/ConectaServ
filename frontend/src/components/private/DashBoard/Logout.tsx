// CSS
import type { MouseEvent } from 'react';
import useMain from '../../../hooks/useMain';
import useUserApi from '../../../hooks/useUserApi';
import { LuLogOut } from 'react-icons/lu';
import './Logout.css';
import { endPointUser } from '../../../config/configEndpointUser';
import { useNavigate } from 'react-router';
// LINK PAA CERRAR SESION
const LinkLogout = () => {
  const navigate = useNavigate();
  const { REFRESH } = endPointUser;
  const { setIsAuth, setAccessToken, setIsLogout, setIsSession } = useMain();
  const { logout } = useUserApi();

  const logoutSession = async (e: MouseEvent<HTMLDivElement>): Promise<void> => {
    e.preventDefault();
    setIsLogout(true);
    setIsSession(false);
    localStorage.removeItem('hasSession');
    try {
      await fetch(REFRESH, { method: 'POST', credentials: 'include' });
    } catch {}

    setTimeout(() =>{
        window.location.reload();
    }, 50);

    navigate('/', { replace: true});
    
    await logout({ setIsAuth, setAccessToken });
  };

  return (
    <>
      <div className='cursor-pointer c-flex c-flex-items-center gap-1/2' onClick={logoutSession}>
        <LuLogOut color={'#1e5da3'} size={20} />
        Salir
      </div>
    </>
  );
};

export default LinkLogout;
