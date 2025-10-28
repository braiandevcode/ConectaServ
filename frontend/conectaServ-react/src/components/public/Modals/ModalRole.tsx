import useGlobalModal from '../../../hooks/useGlobalModal';
import BtnClose from './Buttons/BtnClose';
import './ModalRole.css';
// ICONOS DE REACT
import RoleCardClient from './RoleCardClient';
import RoleCardTasker from './RoleCardTasker';

// MODAL DE ROLES
const ModalRole = () => {
  const { closeGlobalModal } = useGlobalModal(); //HOOK QUE USA CONTEXTO DE MODAL GLOBAL
  return (
    <>
      <div className='w-full c-flex c-flex-items-center'>
        <h3 className='modal-role__title'>Elige tu rol para</h3>
        <BtnClose onCloseModal={closeGlobalModal} className='btn__closeMessage position-absolute to-right cursor-pointer' />
      </div>
      <div className='c-flex c-flex-column gap-1 modal-role__cards'>
        <RoleCardClient />
        <RoleCardTasker />
      </div>
    </>
  );
};

export default ModalRole;
