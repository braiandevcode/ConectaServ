import useHeader from "../../hooks/useHeader";

// CSS
import './LinkSigIn.css';

// LINK PARA INICIAR SESION
const LinkSigIn = () => {
    const { openLogin } = useHeader()
    return (
        <>
            <div className='w-full auth-wrapper__login cursor-pointer' onClick={openLogin}>
                Iniciar sesión
            </div>
        </>
    )
}

export default LinkSigIn;