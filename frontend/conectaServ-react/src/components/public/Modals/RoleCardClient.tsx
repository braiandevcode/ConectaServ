// import useMain from '../../../hooks/useMain';
import { FaUser } from 'react-icons/fa';
import Button from '../../Button';
import useIdentifyEmail from '../../../hooks/useIdentifyEmail';

// TARJETA ROL CLIENTE
const RoleCardClient = () => {
  const { handleClickClientIdentifyEmail } = useIdentifyEmail(); // HOOK NQUE CONSUME CONTEXTO FORMULARIO DE IDENTIFICACION DE EMAIL
  return (
    <>
      <Button type='button' title='Elegir rol' onClick={handleClickClientIdentifyEmail} className='cursor-pointer modal-role__card modal-rol__card--cliente'>
        <div className='w-full c-flex c-flex-items-center gap-1 modal-role__card-inner'>
          <div className='c-flex c-flex-items-center modal-role__icon-container'>
            <FaUser color='#28a745' size={50} />
          </div>
          <div className='c-flex c-flex-column'>
            <h4 className='modal-role__card-title c-flex-self-start'>Cliente</h4>
            <p className='modal-role__card-description text-start'>Busca y contrata profesionales para tus necesidades</p>
          </div>
        </div>
      </Button>
    </>
  );
};

export default RoleCardClient;
