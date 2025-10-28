import useGlobalModal from '../../../hooks/useGlobalModal';
import Login from '../Forms/Login/Login';
import BtnClose from './Buttons/BtnClose';

// CSS
import './ModalLogin.css';

// MODAL DE LOGIN DE ACCESO
const ModalLogin = () => {
  const { closeGlobalModal } = useGlobalModal();
  return (
    <>
      <div className='modalLogin w-full position-relative'>
        <BtnClose onCloseModal={closeGlobalModal} variant='btn btn__ghost' className='modalLoginHeader__btnClose cursor-pointer position-absolute' />
        <div className='modalLoginHeader w-full'>
          <h3 className='modalLoginHeader__title text-center'>Iniciar sesión</h3>
        </div>
        {<Login />}
      </div>
    </>
  );
};

export default ModalLogin;
