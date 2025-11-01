import { FaHelmetSafety } from 'react-icons/fa6';
import Button from '../../Button';
import useIdentifyEmail from '../../../hooks/useIdentifyEmail';

// TARJETA ROL PROFESIONAL
const RoleCardTasker = () => {
  const { handleClickTaskerIdentifyEmail } = useIdentifyEmail(); // HOOK NQUE CONSUME CONTEXTO FORMULARIO DE IDENTIFICACION DE EMAIL
  return (
    <>
      <Button type='button' title='Elegir rol' onClick={handleClickTaskerIdentifyEmail} className='cursor-pointer modal-role__card modal-rol__card--cliente'>
        <div className='w-full c-flex c-flex-items-center gap-1 modal-role__card-inner'>
          <div className='c-flex c-flex-items-center modal-role__icon-container'>
            <FaHelmetSafety color=' #17a2b8' size={50} />
          </div>
          <div className='c-flex c-flex-column'>
            <h4 className='modal-role__card-title c-flex-self-start'>Tasker</h4>
            <p className='modal-role__card-description text-start'>Ofrece tus servicios y encuentra nuevos clientes</p>
          </div>
        </div>
      </Button>
    </>
  );
};

export default RoleCardTasker;
