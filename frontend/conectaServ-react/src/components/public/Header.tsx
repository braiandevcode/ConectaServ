import { Link, useLocation } from 'react-router';
import Button from '../Button';
import { FiUserPlus } from 'react-icons/fi';
import useHeader from '../../hooks/useHeader';

// <!-- CABECERA -->
export default function Header() {
  const { pathname } = useLocation();
  const { openRole, openLogin } = useHeader(); // ==> HOOK PARA EL HEADER
  return (
    <>
      <header className='header mb-3'>
        <div className='header__container'>
          <div className='card-logo'>
            <Link to={'/'} className='card-logo__logo'>
              <div className='card-logo__icon'>
                <i className='fas fa-hands-helping'></i>
              </div>
              <span className='card-logo__text'>ConectaServ</span>
            </Link>
          </div>
          <button type='button' className='menu-toggle'>
            <i className='fas fa-list'></i>
          </button>
          <nav className='nav-links'>
            <div className='dropdown'>
              <Link to={'/category'} className='nav-item dropdown-toggle nav__link'>
                Categorías
                <i className='fa-solid fa-angle-down'></i>
              </Link>
              <div className='dropdown__menu'>
                <div className='dropdown__group'>
                  <p className='dropdown__title'>Reparaciones</p>
                  <a href='./src/pages/services.html' className='dropdown__item'>
                    Plomería
                  </a>
                  <a href='./src/pages/services.html' className='dropdown__item'>
                    Electricidad
                  </a>
                  <a href='./src/pages/services.html' className='dropdown__item'>
                    Pintura
                  </a>
                  <a href='./src/pages/services.html' className='dropdown__item'>
                    Carpintería
                  </a>
                  <a href='./src/pages/services.html' className='dropdown__item'>
                    Electrodomésticos
                  </a>
                  <a href='./src/pages/services.html' className='dropdown__item'>
                    Aire acondicionado
                  </a>
                  <a href='./src/pages/services.html' className='dropdown__item'>
                    Herrería
                  </a>
                  <a href='./src/pages/services.html' className='dropdown__item'>
                    Construcción en seco
                  </a>
                </div>

                <div className='dropdown__group'>
                  <p className='dropdown__title'>Jardinería</p>
                  <a href='./src/pages/services.html' className='dropdown__item'>
                    Corte de pasto
                  </a>
                  <a href='./src/pages/services.html' className='dropdown__item'>
                    Poda de árboles
                  </a>
                  <a href='./src/pages/services.html' className='dropdown__item'>
                    Poda de arbustos
                  </a>
                  <a href='./src/pages/services.html' className='dropdown__item'>
                    Desmalezado
                  </a>
                  <a href='./src/pages/services.html' className='dropdown__item'>
                    Limpieza de jardín
                  </a>
                  <a href='./src/pages/services.html' className='dropdown__item'>
                    Fertilización/mantenimiento césped
                  </a>
                  <a href='./src/pages/services.html' className='dropdown__item'>
                    Plantación
                  </a>
                </div>

                <div className='dropdown__group'>
                  <p className='dropdown__title'>Mudanzas y transporte</p>
                  <a href='./src/pages/services.html' className='dropdown__item'>
                    Mudanzas particulares
                  </a>
                  <a href='./src/pages/services.html' className='dropdown__item'>
                    Mudanzas comerciales
                  </a>
                  <a href='./src/pages/services.html' className='dropdown__item'>
                    Mudanzas locales
                  </a>
                  <a href='./src/pages/services.html' className='dropdown__item'>
                    Muzandas larga distancia
                  </a>
                  <a href='./src/pages/services.html' className='dropdown__item'>
                    Fletes por hora/viaje
                  </a>
                  <a href='./src/pages/services.html' className='dropdown__item'>
                    Transporte de muebles
                  </a>
                  <a href='./src/pages/services.html' className='dropdown__item'>
                    Transporte de electrodomésticos
                  </a>
                  <a href='./src/pages/services.html' className='dropdown__item'>
                    Traslado de objetos frágiles
                  </a>
                </div>
              </div>
            </div>
          </nav>
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
    </>
  );
}
