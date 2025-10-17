import { Link } from 'react-router';
import useMain from '../../../hooks/useMain';

export default function ModalRole() {
  const { handleToggleModal, isShow, handleProClick, handleClientClick } = useMain();
  return (
    <>
      <div id='roleModal' className={`c-flex c-flex-column c-flex-items-center c-flex-justify-center position-fixed w-full ${isShow}`}>
        <div className='modal-role__container'>
          <div className='modal-role__content'>
            <div className='w-full c-flex c-flex-items-center gap-1 modal-role__header position-relative'>
              <h3 className='modal-role__title'>Regístrate en ConectaServ Como:</h3>
              <button className='cursor-pointer position-absolute modal-role__close-btn' onClick={handleToggleModal}>
                <i className='fas fa-times modal-role__close-icon'></i>
              </button>
            </div>

            <div className='c-flex c-flex-column gap-1 modal-role__cards'>
              {/* <!-- TARJETA CLIENTE --> */}
              <Link to={'/register/client'} onClick={handleClientClick} data-role='client' className='cursor-pointer modal-role__card modal-rol__card--cliente'>
                <div className='c-flex c-flex-items-center gap-1 modal-role__card-inner'>
                  <div className='modal-role__icon-container'>
                    <i className='fas fa-user modal-role__icon'></i>
                  </div>
                  <div className='modal-role__text'>
                    <h4 className='modal-role__card-title'>Cliente</h4>
                    <p className='modal-role__card-description'>Busca y contrata profesionales para tus necesidades</p>
                  </div>
                </div>
              </Link>

              {/* <!-- TARJETA PROFESIONAL --> */}
              <Link to={'/register/pro'} onClick={handleProClick} data-role='professional' className='cursor-pointer modal-role__card modal-role__card--profesional'>
                <div className='c-flex c-flex-items-center gap-1 modal-role__card-inner'>
                  <div className='modal-role__icon-container'>
                    <i className='fas fa-briefcase modal-role__icon'></i>
                  </div>
                  <div className='modal-role__text'>
                    <h4 className='modal-role__card-title'>Profesional</h4>
                    <p className='modal-role__card-description'>Ofrece tus servicios y encuentra nuevos clientes</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
