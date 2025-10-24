import BtnClose from './Buttons/BtnClose';
import './ModalRole.css';
// ICONOS DE REACT
import RoleCardClient from './RoleCardClient';
import RoleCardProfessional from './RoleCardProfessional';

export default function ModalRole() {
  return (
    <>
      <div className='w-full c-flex c-flex-items-center'>
        <h3 className='modal-role__title'>Regístrate en ConectaServ Como:</h3>
         <BtnClose className='btn__closeMessage position-absolute to-right cursor-pointer' />
      </div>
      <div className='c-flex c-flex-column gap-1 modal-role__cards'>
        <RoleCardClient />
        <RoleCardProfessional />
      </div>
    </>
  );
}
