
// CSS
import type { MouseEvent } from 'react';
import useMain from '../../../hooks/useMain';
import useUserApi from '../../../hooks/useUserApi';
import { LuLogOut } from "react-icons/lu";
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
            <div className='cursor-pointer c-flex c-flex-items-center gap-1/2' onClick={logoutSession}><LuLogOut size={20} />Salir</div>
        </>
    )
}

export default LinkLogout;