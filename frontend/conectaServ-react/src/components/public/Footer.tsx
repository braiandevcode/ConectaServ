export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer__container container">
          <div className="footer__columns">
            <div className="footer__logo">
              <div className="card-logo">
                <a href="#" className="card-logo__logo card-logo__logo--footer">
                  <div className="card-logo__icon--footer">
                    <i className="fas fa-hands-helping"></i>
                  </div>
                  <span className="card-logo__text--footer">ConectaServ</span>
                </a>
              </div>
              <p>Conectando personas con trabajadores de confianza.</p>
            </div>

            <div className="footer__links">
              <h4>Enlaces</h4>
              <ul>
                <li>
                  <a href="#">Inicio</a>
                </li>
                <li>
                  <a href="#">¿Cómo funciona?</a>
                </li>
                <li>
                  <a href="#">Iniciar Sesión</a>
                </li>
                <li>
                  <a href="#">Registrarse</a>
                </li>
              </ul>
            </div>

            <div className="footer-contact">
              <h4>Contacto</h4>
              <p>Email: ejemploemail@.com</p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2025 ConectaServ. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
