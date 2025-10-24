import BtnClose from './Buttons/BtnClose';
import './ModalRole.css';
// ICONOS DE REACT
import RoleCardClient from './RoleCardClient';
import RoleCardTasker from './RoleCardTasker';

export default function ModalRole() {
  return (
    <>
      <div className='w-full c-flex c-flex-items-center'>
        <h3 className='modal-role__title'>Elige tu rol para</h3>
         <BtnClose className='btn__closeMessage position-absolute to-right cursor-pointer' />
      </div>
      <div className='c-flex c-flex-column gap-1 modal-role__cards'>
        <RoleCardClient />
        <RoleCardTasker />
      </div>
    </>
  );
}

// flow de registro:
// Nunca me registre => ok
// abro modal de registro ==> elijo role cliente ==> se guarda el role en estado y persiste en storage
// se muestra formulario de cliente ==> lleno datos personales, me verifico y debo enviar datos

// en esos datos se debe incorporar array de roles ==> en este flujo de ejemplo se añade ==> ['client']

// el endpoint del backend seria /register/:role 

