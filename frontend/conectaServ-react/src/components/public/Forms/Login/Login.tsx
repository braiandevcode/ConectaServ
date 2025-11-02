import { FaEnvelope, FaLock } from 'react-icons/fa';
import useLogin from '../../../../hooks/useLogin';
import BtnSubmit from '../../../BtnSubmit';
import { Link } from 'react-router';
import useHeader from '../../../../hooks/useHeader';

// CSS
import './Login.css';

const Login = () => {
  const { password, userName, error, submitLogin, handlePassword, handleUserName, isValid } = useLogin();
  const { openRole } = useHeader(); // ==> HOOK PARA EL HEADER

  return (
    <>
      <form id='loginForm' className='loginForm w-full c-flex c-flex-column c-flex-items-center gap-2' onSubmit={submitLogin}>
        <div className='w-3/4 c-flex c-flex-column gap-1/2 form-basic__field'>
          <label htmlFor='userName' className='c-flex c-flex-items-center gap-1/2 form-basic__label'>
            <span className='c-flex c-flex-items-center gap-1/2'>
              <FaEnvelope size={20} />
              <span>Usuario o Correo</span>
            </span>
          </label>
          <input type='text' id='userName' autoComplete='username' className={`form-basic__input`} aria-label='Usuario o Correo' placeholder='Nombre de Usuario o Correo' value={userName} onChange={handleUserName} required autoFocus />
        </div>

        <div className='w-3/4 c-flex c-flex-column gap-1/2 form-basic__field'>
          <label htmlFor='password' className='c-flex c-flex-items-center gap-1/2 form-basic__label'>
            <span className='c-flex c-flex-items-center gap-1/2'>
              <FaLock size={20} />
              <span>Contraseña</span>
            </span>
          </label>
          <input type='password' id='password' autoComplete='off' className={`form-basic__input`} aria-label='Contrasena' placeholder='***********' value={password} onChange={handlePassword} required />
        </div>

        <div>
          <p className='has-error'>{error && error}</p>
        </div>

        <div className='loginForm__textActionForgotPassword c-flex c-flex-items-center gap-2'>
          <Link className='loginForm__linkForgotPassword' to='/forgot-password'>
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <div className='mb-6'>
          <BtnSubmit disabled={!isValid} variant='btn btn__submit' text='Iniciar Sesión' />
        </div>

        <div className='w-full c-flex c-flex-justify-center c-flex-items-center gap-1'>
          <span className='loginForm__textActionRegister'>¿No tienes una cuenta?</span>
          <div role='button' className='loginForm__link cursor-pointer c-flex c-flex-items-center gap-1/2 auth-wrapper__register' onClick={openRole}>
            <span>Registrarse</span>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
