import Login from '../Forms/Login/Login';
import './ModalLogin.css';

// MODAL DE LOGIN DE ACCESO
const ModalLogin = () => {
  return (
    <>
      <div className='modalLogin centered'>
        <div className='modalLoginHeader w-full'>
          <h3 className='modalLoginHeader__title text-center'>Iniciar sesión</h3>
        </div>
        {<Login />}
      </div>
    </>
  );
};

export default ModalLogin;
