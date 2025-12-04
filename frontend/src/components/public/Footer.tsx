import { FaHandsHelping } from 'react-icons/fa';
import { Link } from 'react-router';
import NavLoginAndRegister from './NavLoginAndRegister';
import useMain from '../../hooks/useMain';

export default function Footer() {
  const { isAuth } = useMain();
  return (
    <>
      <footer className='footer p-3'>
        <div className='footer__container container'>
          {/* ESTILOS POR DEFECTO EN MOVIL */}
          <div className='footer__columns c-flex c-flex-wrap c-flex-column c-flex-items-center gap-4'>
            {/* COLUMNA 1 LOGO LINKS */}
            <div className='footer__logoAndLinks w-full c-flex c-flex-column c-flex-justify-center c-flex-items-center gap-3 text-center'>
              <div className='footer__logo'>
                <Link to='/' className='card-logo__logo c-flex c-flex-items-center c-flex-justify-center gap-1/2'>
                  <div className='card-logo__icon'>
                    <FaHandsHelping />
                  </div>
                  <span className='card-logo__text'>ConectaServ</span>
                </Link>
                <p className='mt-1/2'>Conectando personas con trabajadores de confianza.</p>
              </div>

              {/* LINKS CENTRADOS EN COLUMN } */}
              <div className='c-flex c-flex-column footer__links c-flex-items-center gap-1'>
                <h4 className='mb-1/2'>Enlaces</h4>
                <ul className='c-flex c-flex-column gap-1/2 p-0 mb-0'>
                  <li className='footer__link'>
                    <Link to='/'>Inicio</Link>
                  </li>
                  <li className='footer__link'>
                    <Link to='/como-funciona'>¿Cómo funciona?</Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* COLUMNA 2 LOGIN/REGISTER Y CONTACTOS */}
            <div className='footer__custom c-flex c-flex-wrap w-full gap-3 c-flex-column c-flex-items-center text-center'>
              {!isAuth && (
                <div className='w-full footer__navLoginAndRegister c-flex c-flex-self-center c-flex-column gap-1 centered'>
                  <NavLoginAndRegister />
                </div>
              )}
              <div className='footer-contact'>
                <h4 className='mb-1/2'>Contacto</h4>
                <p>Email: conectaservconecta@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
        {/* COLUMNA 3 CENTRADO */}
        <div className='footer-bottom mt-3 text-center'>
          <p>&copy; 2025 ConectaServ. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  );
}
