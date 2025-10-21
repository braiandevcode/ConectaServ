import { type JSX } from 'react';
// CSS
import './ModalVerifyEmail.css';

import { FaCheckCircle } from 'react-icons/fa';
import FormVerifyCode from '../Forms/Register/FormVerifyCode';
import useModal from '../../../hooks/useModal';
// MODAL PARA VERIFICAR EMAIL ANTES DE REGISTRARSE
const ModalVerifyEmail = (): JSX.Element => {
  const { messageState } = useModal();
  //RENDERIZA MODAL DE VERIFICACION
  return (
    <>
      <div className='w-full c-flex c-flex-column c-flex-items-center gap-1'>
        <h3 className='c-flex c-flex-items-center gap-1/2'>
          <span>{messageState.title}</span>
        </h3>
        <FaCheckCircle className='mb-2' color='green' size={100} />
      </div>
      <FormVerifyCode />
    </>
  );
};

export default ModalVerifyEmail;
