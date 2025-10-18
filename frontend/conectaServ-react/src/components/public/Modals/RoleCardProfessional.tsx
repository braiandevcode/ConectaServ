import { FaHelmetSafety } from 'react-icons/fa6';
import { Link } from 'react-router';
import useMain from '../../../hooks/useMain';
import { EPathPage } from '../../../types/enums';

// TARJETA ROL PROFESIONAL
const RoleCardProfessional = () => {
  const { handleProClick } = useMain(); //HOOK NIVEL MAIN
  return (
    <>
      <Link to={EPathPage.PATH_FORM_PROFESSIONAL} onClick={handleProClick} data-role='professional' className='cursor-pointer modal-role__card modal-role__card--profesional'>
        <div className='c-flex c-flex-items-center gap-1 modal-role__card-inner'>
          <div className='modal-role__icon-container'>
            <FaHelmetSafety color=' #17a2b8' size={20} />
          </div>
          <div className='modal-role__text'>
            <h4 className='modal-role__card-title'>Profesional</h4>
            <p className='modal-role__card-description'>Ofrece tus servicios y encuentra nuevos clientes</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default RoleCardProfessional;
