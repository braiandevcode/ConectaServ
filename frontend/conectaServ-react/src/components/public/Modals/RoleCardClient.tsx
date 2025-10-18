import { Link } from 'react-router';
import { EPathPage } from '../../../types/enums';
import useMain from '../../../hooks/useMain';
import { FaUser } from 'react-icons/fa';

// TARJETA ROL CLIENTE
const RoleCardClient = () => {
  const { handleClientClick } = useMain(); // HOOK NIVEL MAIN
  return (
    <>
      <Link to={EPathPage.PATH_FORM_PROFESSIONAL} onClick={handleClientClick} data-role='client' className='cursor-pointer modal-role__card modal-rol__card--cliente'>
        <div className='c-flex c-flex-items-center gap-1 modal-role__card-inner'>
          <div className='modal-role__icon-container'>
            <FaUser color='#28a745' size={20} />
          </div>
          <div className='modal-role__text'>
            <h4 className='modal-role__card-title'>Cliente</h4>
            <p className='modal-role__card-description'>Busca y contrata profesionales para tus necesidades</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default RoleCardClient;
