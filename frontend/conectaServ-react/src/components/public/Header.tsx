import { useState } from 'react';
import { FaHandsHelping, FaList } from 'react-icons/fa';
import { FiUserPlus } from 'react-icons/fi';
import { Link, useLocation } from 'react-router';
import Button from '../Button';
import useHeader from '../../hooks/useHeader';
import NavCategory from './NavCategory';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { pathname } = useLocation(); // Para saber en qué ruta estamos
  const { openRole, openLogin } = useHeader(); // Hook para abrir los modales

  return (
    <header className='header mb-2'>
      <div className='header__container'>
        {/* Logo */}
        <div className='card-logo'>
          <Link to='/' className='card-logo__logo'>
            <div className='card-logo__icon'>
              <FaHandsHelping />
            </div>
            <span className='card-logo__text'>ConectaServ</span>
          </Link>
        </div>

        {/* Botón menú */}
        <button className='menu-toggle' onClick={() => setMenuOpen(!menuOpen)}>
          <FaList />
        </button>
        {['/services', '/dashboard'].includes(pathname) && (
          <>
            <div className='w-full c-flex c-flex-justify-end c-flex-items-center gap-1'>
              <NavCategory menuChildOpen={menuOpen} />
            </div>
          </>
        )}
        <div className='c-flex c-flex-items-center gap-1 auth-wrapper'>
          {pathname === '/' && (
            <>
              <div className='w-full auth-wrapper__login cursor-pointer' onClick={openLogin}>
                Iniciar sesión
              </div>
              <Button type='button' className='btn color btnRegister c-flex c-flex-items-center gap-1/2 auth-wrapper__register' onClick={openRole}>
                <span>Registrarse</span>
                <FiUserPlus />
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
