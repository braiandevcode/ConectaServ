import './ModalRole.css';
// ICONOS DE REACT
import RoleCardClient from './RoleCardClient';
import RoleCardTasker from './RoleCardTasker';

// MODAL DE ROLES
const ModalRole = () => {
  return (
    <>
      <div className='w-full c-flex c-flex-items-center'>
        <h3 className='modal-role__title'>Elige tu rol para</h3>
      </div>
      <div className='c-flex c-flex-column gap-1 modal-role__cards'>
        <RoleCardClient />
        <RoleCardTasker />
      </div>
    </>
  );
};

export default ModalRole;
