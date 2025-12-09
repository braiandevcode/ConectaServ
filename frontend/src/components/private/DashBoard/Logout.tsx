// CSS
import type { MouseEvent } from 'react';
import useMain from '../../../hooks/useMain';
import useUserApi from '../../../hooks/useUserApi';
import { LuLogOut } from 'react-icons/lu';
import './Logout.css';
import { useNavigate } from 'react-router';
import { endPointUser } from '../../../config/configEndpointUser';
// LINK PAA CERRAR SESION
const LinkLogout = () => {
  const { REFRESH } = endPointUser;
  const { setIsAuth, setAccessToken, setIsLogout, setIsSession } = useMain();
  const { logout } = useUserApi();
  const navigate = useNavigate();

  const logoutSession = async (e: MouseEvent<HTMLDivElement>): Promise<void> => {
    e.preventDefault();
    
    try {
        await fetch(REFRESH, {
            method: 'POST',
            credentials: 'include',
        });
    } catch {}
    
    setIsSession(false);
    localStorage.removeItem('hasSession');
    navigate('/', { replace:true })
    
    setIsLogout(true);
    setTimeout(() => {
      window.location.reload();
    }, 50);

    
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
