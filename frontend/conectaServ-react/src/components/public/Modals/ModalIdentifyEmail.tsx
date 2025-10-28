import type { JSX } from 'react';
import FormIdentyfyEmail from '../Forms/FormIdentifyEmail';
import { FaUserCircle } from 'react-icons/fa';
import BtnClose from './Buttons/BtnClose';
import useGlobalModal from '../../../hooks/useGlobalModal';

// MODAL SABER SI EL EMAIL YA EXISTE Y SABER SI LLEVARLO AL REGISTRO O AL LOGIN
const ModalIdentifyEmail = (): JSX.Element => {
  const { closeGlobalModal } = useGlobalModal();
  //RENDERIZA MODAL DE IDENTIFICACION DE EMAIL
  return (
    <>
      <BtnClose onCloseModal={closeGlobalModal} className='btn__closeMessage position-absolute to-right cursor-pointer' />
      <div className='c-flex c-flex-column c-flex-justify-center form__header'>
        <h2 className='c-flex c-flex-wrap c-flex-items-center gap-1/2 form__subtitle'>
          <div className='c-flex w-full c-flex-items-center gap-1/2'>
            <FaUserCircle size={30} />
            <span>Identificacion</span>
          </div>
        </h2>
        <div className='mb-1 c-flex c-flex-items-center gap-1/2 container-textInfo'>
          <small>Ingresa tu email para verificar el estado de tu cuenta y guiarte al paso siguiente.</small>
        </div>
      </div>
      <FormIdentyfyEmail />
    </>
  );
};

export default ModalIdentifyEmail;
