
// CSS
import type { MouseEvent } from 'react';
import useMain from '../../hooks/useMain';
import useUserApi from '../../hooks/useUserApi';
import './Logout.css';
// LINK PAA CERRAR SESION
const LinkLogout = () => {
    const { setIsAuth, setAccessToken, setIsLogout } = useMain();
    const { logout } = useUserApi();

    const logoutSession = async (e: MouseEvent<HTMLDivElement>): Promise<void>=> {
        e.preventDefault()
        setIsLogout(true);
        await logout({ setIsAuth, setAccessToken  })
    }

    return (
        <>
            {/* ACA FALTARIA EL  PARA CERRAR onClick={logout} */}
            <div className='w-full cursor-pointer' onClick={logoutSession}>Cerrar Sesión</div>
        </>
     )
}

export default LinkLogout;