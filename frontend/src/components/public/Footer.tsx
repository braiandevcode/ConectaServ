import { FaHandsHelping } from 'react-icons/fa';
import { Link } from 'react-router';
import NavLoginAndRegister from './NavLoginAndRegister';

export default function Footer() {
  return (
    <>
      <footer className='footer'>
        <div className='footer__container container'>
          <div className='footer__columns'>
            <div className='footer__logo'>
              <Link to='/' className='card-logo__logo'>
                <div className='card-logo__icon'>
                  <FaHandsHelping />
                </div>
                <span className='card-logo__text'>ConectaServ</span>
              </Link>
              <p>Conectando personas con trabajadores de confianza.</p>
            </div>

            <div className='footer__links'>
              <h4>Enlaces</h4>
              <ul>
                <li>
                  <a href='/'>Inicio</a>
                </li>
                <li>
                  <a href='#'>¿Cómo funciona?</a>
                </li>
              </ul>
            </div>

            <div>
              <div className='c-flex c-flex-column gap-1' style={{ background: '#FFFF', padding: '1rem' }}>
                <NavLoginAndRegister />
              </div>
              <div className='p-2 footer-contact'>
                <h4>Contacto</h4>
                <p>Email: conectaservconecta@gmail.com</p>
              </div>
            </div>
          </div>

          <div className='footer-bottom'>
            <p>&copy; 2025 ConectaServ. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
