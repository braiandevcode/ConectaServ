import FieldsClientProvider from '../../../../../context/register/registerClient/FieldsClientProvider';
import useRegisterClient from '../../../../../hooks/useRegisterClient';
import BtnSubmit from '../../../../BtnSubmit';
import FooterConditionsTerm from '../FooterConditionsTerm';
import FieldsClient from './FieldsClient';
import useSendData from '../../../../../hooks/useSendDataRegister';
import LoaderBtn from '../../../../LoaderBtn';
import useRegister from '../../../../../hooks/useRegister';

// CSS
import '../../FormBase.css';
import { FaInfoCircle, FaUserCircle } from 'react-icons/fa';
import { MdSend } from 'react-icons/md';

// FORMULARIO DE CLIENTE
const Form = () => {
  const { isSending } = useRegister(); //HOOK QUE USA EL CONTEXTO DE REGISTRO GENERAL
  const { isValid } = useRegisterClient(); //HOOK QUE USA EL CONTEXTO DE REGISTRO CLIENTE
  // const { submitDataRegister, isReady } = useSendData(); //HOOK QUE SE ENCARGA DE ENVIAR LOS DATOS

  const { submitDataRegister} = useSendData(); //HOOK QUE SE ENCARGA DE ENVIAR LOS DATOS


  
  return (
    <>
      <form className='form' onSubmit={submitDataRegister}>
        <div className='c-flex c-flex-column c-flex-justify-center form__header'>
          <h2 className='c-flex c-flex-wrap c-flex-items-center gap-1/2 form__subtitle'>
            <div className='c-flex w-full c-flex-items-center gap-1/2'>
              <FaUserCircle size={20} />
              <span>Crear Cuenta</span>
            </div>
          </h2>
          <div className='mb-1 c-flex c-flex-items-center gap-1/2 container-textInfo'>
            <FaInfoCircle size={20} />
            <small>
              Campos con (<span className='span-required'>*</span>) son obligatorios
            </small>
          </div>
        </div>

        <div className='c-flex c-flex-column gap-3/2'>
          <div className='c-flex c-flex-column gap-2 c-flex-justify-center'>
            <FieldsClientProvider>
              <FieldsClient />
            </FieldsClientProvider>
            <FooterConditionsTerm />
          </div>
          {/* {isSending ? <LoaderBtn /> : <BtnSubmit variant='btn btn__submit' disabled={!isValid} text={isReady ? 'Enviar' : 'Cargando datos...'} />} */}

          {isSending ? <LoaderBtn /> : <BtnSubmit variant='btn btn__submit' disabled={!isValid} text='Enviar'/>}

        </div>
      </form>
    </>
  );
};

export default Form;
